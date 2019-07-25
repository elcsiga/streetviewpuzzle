import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import * as firebase from 'firebase/app';
import { Location } from '@angular/common';
import { printPanoPos } from 'functions/src/common/pano';
import { AuthService } from 'src/app/auth/auth-service/auth.service';
import { EditedPuzzleService, CheckedPuzzle } from '../edited-puzzle.service';
import { Subject, Observable } from 'rxjs';
import { Puzzle } from 'functions/src/common/puzzle';

@Component({
  selector: 'app-puzzle-save-dialog',
  templateUrl: './puzzle-save-dialog.component.html',
  styleUrls: ['./puzzle-save-dialog.component.scss']
})
export class PuzzleSaveDialogComponent implements OnInit, OnDestroy {

  inProgress = false;
  puzzle: Puzzle;

  private componentDestroyed$ = new Subject();

  currentUser$ = this.authService.user$;
  checkedPuzzle$ = this.editedPuzzleService.checkedPuzzle$;

  isPuzzleValid( checkedPuzzle: CheckedPuzzle): boolean {
    const { position, title, question, answers, author } = checkedPuzzle.checks;
    return position && title && question && answers && author;
  }

  isPuzzleChanged( checkedPuzzle: CheckedPuzzle): boolean {
    const { position, title, question, answers, author } = checkedPuzzle.changes;
    return position || title || question || answers || author;
  }

  constructor(
    private location: Location,
    private router: Router,
    private editedPuzzleService: EditedPuzzleService,
    private authService: AuthService
  ) { }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.componentDestroyed$.next();
  }

  getOperationTitle(checkedPuzzle: CheckedPuzzle): string {
    return checkedPuzzle.puzzle.id ? 'Save Puzzle' : 'Create Puzzle';
  }

  printPos(checkedPuzzle: CheckedPuzzle ): string {
    return printPanoPos(checkedPuzzle.puzzle.details.startView.position);
  }

  submit(checkedPuzzle: CheckedPuzzle) {
    if (checkedPuzzle && this.isPuzzleValid(checkedPuzzle)) {
      this.inProgress = true;
      const id = checkedPuzzle.puzzle.id;
      const details = checkedPuzzle.puzzle.details;
      const collection = firebase.firestore().collection('puzzles');

      if (id) {
        collection.doc(id).set(details).then(() => {
          this.router.navigate(['/']);
        })
          .catch((error) => {
            console.error('Error adding document: ', error);
            // TODO
          })
          .finally(() => this.inProgress = false);
      } else {
        collection.add(details).then(() => {
          this.router.navigate(['/']);
        })
          .catch((error) => {
            console.error('Error adding document: ', error);
            // TODO
          })
          .finally(() => this.inProgress = false);
      }
    }
  }

  close() {
    this.location.back();
  }
}
