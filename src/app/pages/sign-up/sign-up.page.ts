import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
})
export class SignUpPage implements OnInit {
  signupForm!: FormGroup;
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
    this.signupForm = new FormGroup({
      username: new FormControl('', { validators: [Validators.required] }),
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
    // this.signupForm.markAllAsTouched();
    console.log(this.signupForm.valid);
    if (!this.signupForm.valid) return;
    console.log(this.signupForm.value);
    this.register(this.signupForm);
  }
  register(form) {
    // this.global.showLoader();
    this.isLoading = true;
    this.authService
      .register(form.value)
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
        let msg: string = 'Email Already In Use,Enter an unregistered email';
        if (e.code == 'auth/email-already-in-use') {
          msg = e.msg;
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
