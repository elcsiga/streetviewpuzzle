import { Component } from '@angular/core';

import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDzYb3ey234dwhBH7I9aM8itjLWoSbWZyA",
  authDomain: "streetviewpuzzle.firebaseapp.com",
  databaseURL: "https://streetviewpuzzle.firebaseio.com",
  projectId: "streetviewpuzzle",
  storageBucket: "",
  messagingSenderId: "1054405125888",
  appId: "1:1054405125888:web:410312271a12b570"
};

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'streetviewpuzzle';

  constructor() {
    firebase.initializeApp(firebaseConfig);

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
    firebase.auth().signInWithEmailAndPassword(email, password)
    .then( re => console.log('LOGIN', re))
    .catch( error => console.error('LOGIN', error));
  }
}
