import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import * as firebase from 'firebase/app';
import { MapService } from 'src/app/map/map.service';
import { Location } from '@angular/common';
import { panoPosEquals, printPanoPos } from 'functions/src/common/pano';
import { AuthService } from 'src/app/auth/auth-service/auth.service';
import { EditedPuzzleService } from '../edited-puzzle.service';
import { take, takeUntil, map } from 'rxjs/operators';
import { Subject, Observable } from 'rxjs';
import { Puzzle } from 'functions/src/common/puzzle';
import { ThrowStmt } from '@angular/compiler';

interface CheckedPuzzle {
  puzzle: Puzzle;
  checks: {
    position: boolean;
    title: boolean;
    question: boolean;
    answers: boolean;
    author: boolean;
  };
}

@Component({
  selector: 'app-puzzle-save-dialog',
  templateUrl: './puzzle-save-dialog.component.html',
  styleUrls: ['./puzzle-save-dialog.component.scss']
})
export class PuzzleSaveDialogComponent implements OnInit, OnDestroy {

  inProgress = false;
  puzzleForm: FormGroup;
  puzzle: Puzzle;

  private componentDestroyed$ = new Subject();

  currentUser$ = this.authService.user$;

  checkedPuzzle$: Observable<CheckedPuzzle> = this.editedPuzzleService.puzzle$.pipe(
    takeUntil(this.componentDestroyed$),
    map(puzzle => ({
      puzzle,
      checks: {
        position: !panoPosEquals(
          puzzle.details.startView.position,
          this.mapService.baseView.position
        ),
        title: !!puzzle.details.title,
        question: !!puzzle.details.question,
        answers: puzzle.details.answers.some(answer => !!answer),
        author: !!this.authService.getUid()
      }
    }))
  );

  isPuzzleValid( checkedPuzzle: CheckedPuzzle): boolean {
    const { position, title, question, answers, author } = checkedPuzzle.checks;
    return position && title && question && answers && author;
  }

  constructor(
    private location: Location,
    private router: Router,
    private mapService: MapService,
    private editedPuzzleService: EditedPuzzleService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.checkedPuzzle$.pipe(
      take(1),
    ).subscribe(checkedPuzzle => {
      this.puzzleForm = new FormGroup({
        title: new FormControl(checkedPuzzle.puzzle.details.title),
      });
    });

    this.puzzleForm.valueChanges.pipe(
      takeUntil(this.componentDestroyed$)
    ).subscribe(() => {
      this.editedPuzzleService.setTitle(this.puzzleForm.value.title);
    });
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

  onSubmit(checkedPuzzle: CheckedPuzzle) {
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
