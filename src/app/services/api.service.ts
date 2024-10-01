import { Injectable } from '@angular/core';
import { doc, Firestore, getDoc, setDoc } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private fireStore: Firestore) {}
  docRef(path: any) {
    return doc(this.fireStore, path);
  }
  setDocument(path: any, data: any) {
    const dataRef = this.docRef(path);
    return setDoc(dataRef, data);
  }
  getDocById(path: any) {
    const docRef = this.docRef(path);
    return getDoc(path);
  }
}
