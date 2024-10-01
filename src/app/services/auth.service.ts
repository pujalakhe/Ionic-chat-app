import { Injectable } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
} from '@angular/fire/auth';
import { BehaviorSubject, Observable } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public _uid = new BehaviorSubject<any>(null);
  currentUser: any;

  constructor(private fireAuth: Auth, private apiService: ApiService) {}
  async login(email: string, password: string): Promise<any> {
    try {
      const response = await signInWithEmailAndPassword(
        this.fireAuth,
        email,
        password
      );
      {
        console.log(response);
        if (response.user) {
          this.setUserData(response.user.uid);
        }
      }
    } catch (error) {
      throw error;
    }
  }

  getID() {
    const auth = getAuth();
    this.currentUser = auth.currentUser;
    console.log(this.currentUser);
    return this.currentUser?.uid;
  }
  setUserData(uid: any) {
    this._uid.next(uid);
  }
  randomIntFromInterval(min: any, max: any) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
  async register(fromValue: any) {
    try {
      const registeredUser = await createUserWithEmailAndPassword(
        this.fireAuth,
        fromValue.email,
        fromValue.password
      );
      console.log('Registered USer:', registeredUser);
      const data = {
        email: fromValue.email,
        password: fromValue.password,
        uid: registeredUser.user.uid,
        photo: 'http://i.pravatar.cc/' + this.randomIntFromInterval(200, 400),
      };
      await this.apiService.setDocument(
        `user/${registeredUser.user.uid}`,
        data
      );
      const userData = { id: registeredUser.user.uid };
      return userData;
    } catch (e) {
      throw e;
    }
  }

  async resetPassword(email: string) {
    try {
      await sendPasswordResetEmail(this.fireAuth, email);
    } catch (e) {
      throw e;
    }
  }
  async logout() {
    try {
      await this.fireAuth.signOut();
      this._uid.next(null);
      return true;
    } catch (error) {
      throw error;
    }
  }
  checkAuth(): Promise<any> {
    return new Promise((resolve, reject) => {
      onAuthStateChanged(this.fireAuth, (user) => {
        console.log('Auth User:', user);
        resolve(user);
      });
    });
  }

  async getUserId(id: number) {
    // return (await(this.apiService.collection('users').doc(id).get().toPromise())).data();
    const docSnap: any = await this.apiService.getDocById(`user/${id}`);
    if (docSnap?.exists()) {
      return docSnap.data();
    } else {
      throw 'No such Document exists';
    }
  }
}
