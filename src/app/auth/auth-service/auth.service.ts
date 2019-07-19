import { Injectable } from '@angular/core';

import * as firebase from 'firebase/app';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { firebaseConfig } from 'functions/src/common/app-config-private';

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

  private user = new BehaviorSubject<User>(undefined);
  user$ = this.user.asObservable();

  init() {
    firebase.initializeApp(firebaseConfig);
    firebase.auth().onAuthStateChanged(user => {
      this.user.next(user);
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

  getUid(): string {
    return this.user.value && this.user.value.uid;
  }

  logout() {
    this.router.navigate(['/']);
    return firebase.auth().signOut();
  }
}
