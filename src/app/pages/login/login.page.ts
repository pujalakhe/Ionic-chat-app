import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  form!: FormGroup;
  isTypePassword: boolean = true;
  isLoading: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private alertController: AlertController
  ) {
    this.initForm();
  }
  ngOnInit() {}
  initForm() {
    this.form = new FormGroup({
      email: new FormControl('', {
        validators: [Validators.required, Validators.email],
      }),
      password: new FormControl('', {
        validators: [Validators.required, Validators.minLength(8)],
      }),
    });
  }

  onChange() {
    this.isTypePassword = !this.isTypePassword;
  }

  onSubmit() {
    this.form.markAllAsTouched();
    if (!this.form.valid) return;
    console.log(this.form.value);
    this.login(this.form);
  }

  login(form) {
    // this.global.showLoader();
    this.isLoading = true;
    this.authService
      .login(form.value.email, form.value.password)
      .then((data: any) => {
        console.log(data);
        this.router.navigateByUrl('/home');
        // this.global.hideLoader();
        this.isLoading = false;
        form.reset();
      })
      .catch((e) => {
        console.log(e);
        // this.global.hideLoader();
        this.isLoading = false;
        let msg: string = 'Could not login,Please Try Again';
        if (e.code == 'auth/user-not-found') {
          msg = 'Email address could not be found.';
        } else if (e.code == 'auth/wrong-password') {
          msg = 'Please enter a correct password.';
        }
        this.presentAlert(msg);
        // this.global.showAlert();
      });
  }

  async presentAlert(msg) {
    const alert = await this.alertController.create({
      header: 'Alert',
      message: msg,
      buttons: ['OK'],
    });

    await alert.present();
  }
}
