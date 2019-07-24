import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import * as firebase from 'firebase/app';
import { MapService } from 'src/app/map/map.service';
import { SimplePuzzleDetails, Puzzle } from 'functions/src/common/puzzle';
import { Subscription } from 'rxjs';
import { Location } from '@angular/common';
import { panoPosEquals, printPanoPos } from 'functions/src/common/pano';
import { AuthService } from 'src/app/auth/auth-service/auth.service';
import { EditedPuzzleService } from '../edited-puzzle.service';

@Component({
  selector: 'app-puzzle-save-dialog',
  templateUrl: './puzzle-save-dialog.component.html',
  styleUrls: ['./puzzle-save-dialog.component.scss']
})
export class PuzzleSaveDialogComponent implements OnInit, OnDestroy {

  inProgress = false;
  puzzleForm = new FormGroup({
    title: new FormControl(this.getPuzzleSnapshot().details.title),
  });

  private subscription: Subscription;

  currentUser$ = this.authService.user$;

  constructor(
    private location: Location,
    private router: Router,
    private mapService: MapService,
    private editedPuzzleService: EditedPuzzleService,
    private authService: AuthService
  ) { }

  getPuzzleSnapshot(): Puzzle {
    return this.editedPuzzleService.getPuzzleSnapshot();
  }

  ngOnInit() {
    this.subscription = this.puzzleForm.valueChanges.subscribe(() => {
      this.editedPuzzleService.setDetails({
        ...this.getPuzzleSnapshot().details,
        title: this.puzzleForm.value.title
      });
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  checkPosition(): boolean {
    return !panoPosEquals(this.getPuzzleSnapshot().details.startView.position, this.mapService.baseView.position);
  }
  checkTitle(): boolean {
    return !!this.getPuzzleSnapshot().details.title;
  }
  checkQuestion(): boolean {
    return !!this.getPuzzleSnapshot().details.question;
  }
  checkAnswers(): boolean {
    return this.getPuzzleSnapshot().details.answers.some(answer => !!answer);
  }
  checkAuthor(): boolean {
    return !!this.authService.getUid();
  }
  checkAll(): boolean {
    return this.checkPosition()
      && this.checkTitle()
      && this.checkQuestion()
      && this.checkAnswers()
      && this.checkAuthor();
  }

  printPos() {
    return printPanoPos(this.getPuzzleSnapshot().details.startView.position);
  }
  onSubmit() {

    // saving
    this.inProgress = true;
    firebase.firestore().collection('puzzles').add(this.editedPuzzleService.getPuzzleSnapshot())
      .then(() => {
        this.router.navigate(['/']);
      })
      .catch((error) => {
        console.error('Error adding document: ', error);
        // TODO
      })
      .finally(() => this.inProgress = false);
  }

  close() {
    this.location.back();
  }
}
