import { Injectable } from '@angular/core';

import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import * as privateAppConfig from '../../../../app-config-private.json';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

export interface User {
  displayName: string;
  email: string;
  emailVerified: boolean;
  photoURL: string;
  isAnonymous: boolean;
  uid: string;
  providerData: any;
}
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private router: Router
  ) { }

  user$ = new BehaviorSubject<User>(undefined);

  init() {
    firebase.initializeApp(privateAppConfig.firebase);
    firebase.auth().onAuthStateChanged(user => {
      this.user$.next(user);
    });
  }

  register(email: string, password: string) {
    return firebase.auth().createUserWithEmailAndPassword(email, password);
  } 
  
  login(email: string, password: string) {
    return firebase.auth().signInWithEmailAndPassword(email, password);
  }

  signInWithGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider();
    provider.addScope('profile');
    provider.addScope('email');
    return firebase.auth().signInWithRedirect(provider);
  }
  
  signInWithFacebook() {

  }

  logout() {
    return firebase.auth().signOut();
  }
}
