import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import * as firebase from 'firebase/app';
import { MapService } from 'src/app/map/map.service';
import { Location } from '@angular/common';
import { panoPosEquals, printPanoPos } from 'functions/src/common/pano';
import { AuthService } from 'src/app/auth/auth-service/auth.service';
import { EditedPuzzleService } from '../edited-puzzle.service';
import { take, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-puzzle-save-dialog',
  templateUrl: './puzzle-save-dialog.component.html',
  styleUrls: ['./puzzle-save-dialog.component.scss']
})
export class PuzzleSaveDialogComponent implements OnInit, OnDestroy {

  inProgress = false;
  puzzleForm: FormGroup;

  private componentDestroyed$ = new Subject();

  currentUser$ = this.authService.user$;

  constructor(
    private location: Location,
    private router: Router,
    private mapService: MapService,
    private editedPuzzleService: EditedPuzzleService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.editedPuzzleService.puzzle$.pipe(
      take(1),
      takeUntil(this.componentDestroyed$)
    ).subscribe(puzzle => {
      this.puzzleForm = new FormGroup({
        title: new FormControl(puzzle.details.title),
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

  checkPosition(): boolean {
    const puzzle = this.editedPuzzleService.getPuzzleSnapshot();
    return puzzle && !panoPosEquals(puzzle.details.startView.position, this.mapService.baseView.position);
  }
  checkTitle(): boolean {
    const puzzle = this.editedPuzzleService.getPuzzleSnapshot();
    return puzzle && !!puzzle.details.title;
  }
  checkQuestion(): boolean {
    const puzzle = this.editedPuzzleService.getPuzzleSnapshot();
    return puzzle && !!puzzle.details.question;
  }
  checkAnswers(): boolean {
    const puzzle = this.editedPuzzleService.getPuzzleSnapshot();
    return puzzle && puzzle.details.answers.some(answer => !!answer);
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
    const puzzle = this.editedPuzzleService.getPuzzleSnapshot();
    return puzzle && printPanoPos(puzzle.details.startView.position);
  }
  onSubmit() {
    const puzzle = this.editedPuzzleService.getPuzzleSnapshot();
    if (puzzle) {
      this.inProgress = true;
      const collection = firebase.firestore().collection('puzzles');
      if (puzzle.id) {
        collection.doc(puzzle.id).set(puzzle.details).then(() => {
          this.router.navigate(['/']);
        })
          .catch((error) => {
            console.error('Error adding document: ', error);
            // TODO
          })
          .finally(() => this.inProgress = false);
      } else {
        collection.add(puzzle.details).then(() => {
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
