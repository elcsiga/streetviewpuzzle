import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import * as firebase from "firebase/app";
import { AuthService } from 'src/app/auth/auth-service/auth.service';
import { MapService } from 'src/app/map/map.service';
import { SimplePuzzle } from 'functions/src/common/puzzle';

@Component({
  selector: 'app-simple-puzzle-dialog',
  templateUrl: './simple-puzzle-dialog.component.html',
  styleUrls: ['./simple-puzzle-dialog.component.scss']
})
export class SimplePuzzleDialogComponent implements OnInit {
  inProgress = false;
  puzzleForm = new FormGroup({
    title: new FormControl(''),
    question: new FormControl(''),
    answer: new FormControl('')
  });

  constructor(
    private router: Router,
    private authService: AuthService,
    private mapService: MapService
  ) { }

  ngOnInit() {
  }

  onSubmit() {
    this.inProgress = true;
    this.puzzleForm.value;
    this.inProgress = false;

    const db = firebase.firestore();
    const puzzle: SimplePuzzle = {
      startView: this.mapService.getCurrentViewSnapshot(),
      title: this.puzzleForm.value.title,
      question: this.puzzleForm.value.question,
      answers: [this.puzzleForm.value.answer],
      author: this.authService.user$.value.email
    }

    db.collection("puzzles").add(puzzle)
      .then(function (docRef) {
        console.log("Document written with ID: ", docRef.id);
      })
      .catch(function (error) {
        console.error("Error adding document: ", error);
      });
  }
}
