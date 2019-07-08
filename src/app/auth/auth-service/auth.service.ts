import { Injectable } from '@angular/core';

import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import * as privateAppConfig from '../../../../app-config-private.json';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  init() {
    firebase.initializeApp(privateAppConfig.firebase);

    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        console.log('AUTH', user);
        // User is signed in.
        // var displayName = user.displayName;
        // var email = user.email;
        // var emailVerified = user.emailVerified;
        // var photoURL = user.photoURL;
        // var isAnonymous = user.isAnonymous;
        // var uid = user.uid;
        // var providerData = user.providerData;
        // ...
      } else {
        console.log('AUTHOUT');
        // ...
      }
    });
  }


  register(email: string, password: string) {
    firebase.auth().createUserWithEmailAndPassword(email, password)
    .then( re => console.log('REG', re))
    .catch( error => console.error('REG', error));
  } 
  
  login(email: string, password: string) {
    return firebase.auth().signInWithEmailAndPassword(email, password)
  }
}
