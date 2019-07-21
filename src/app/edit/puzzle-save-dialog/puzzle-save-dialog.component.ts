import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import * as firebase from 'firebase/app';
import { MapService } from 'src/app/map/map.service';
import { SimplePuzzle } from 'functions/src/common/puzzle';
import { EditorService } from '../editor/editor.service';
import { Subscription, Observable } from 'rxjs';
import { Location } from '@angular/common';
import { panoPosEquals, printPanoPos } from 'functions/src/common/pano';
import { AuthService } from 'src/app/auth/auth-service/auth.service';
import { PublicUser } from 'functions/src/common/auth';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-puzzle-save-dialog',
  templateUrl: './puzzle-save-dialog.component.html',
  styleUrls: ['./puzzle-save-dialog.component.scss']
})
export class PuzzleSaveDialogComponent implements OnInit, OnDestroy {

  puzzle: SimplePuzzle = this.editorService.getEditedPuzzle();

  inProgress = false;
  puzzleForm = new FormGroup({
    title: new FormControl(this.puzzle.title),
  });

  private subscription: Subscription;

  currentUser$ = this.authService.user$;

  constructor(
    private location: Location,
    private router: Router,
    private mapService: MapService,
    private editorService: EditorService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.subscription = this.puzzleForm.valueChanges.subscribe(() => {
      this.puzzle.title = this.puzzleForm.value.title;
      this.editorService.setEditedPuzzle(this.puzzle);
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  checkPosition(): boolean {
    return !panoPosEquals(this.puzzle.startView.position, this.mapService.baseView.position);
  }
  checkTitle(): boolean {
    return !!this.puzzle.title;
  }
  checkQuestion(): boolean {
    return !!this.puzzle.question;
  }
  checkAnswers(): boolean {
    return this.puzzle.answers.some(answer => !!answer);
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
    return printPanoPos(this.puzzle.startView.position);
  }
  onSubmit() {
    // updating with the latest user and position
    this.puzzle.startView = this.mapService.getCurrentViewSnapshot();
    this.puzzle.author.uid = this.authService.getUid();
    this.editorService.setEditedPuzzle(this.puzzle);

    // saving
    this.inProgress = true;
    firebase.firestore().collection('puzzles').add(this.puzzle)
      .then(() => {
        this.editorService.clearEditedPuzzle();
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
