import { Component, OnInit } from '@angular/core';
import { SimplePuzzle } from 'functions/src/common/puzzle';
import firebase from 'firebase';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  puzzles: SimplePuzzle[];

  constructor() { }

  ngOnInit() {
    firebase.firestore().collection('puzzles').onSnapshot(snapshot => {
      const puzzles = [];
      snapshot.forEach(p => puzzles.push(p.data()) )
      this.puzzles = puzzles; 

      console.log(this.puzzles);
    });
  }

}
