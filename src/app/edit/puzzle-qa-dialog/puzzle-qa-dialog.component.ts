import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Location } from '@angular/common';
import { Subject } from 'rxjs';
import { EditedPuzzleService } from '../edited-puzzle.service';
import { take, takeUntil } from 'rxjs/operators';


@Component({
  selector: 'app-puzzle-qa-dialog',
  templateUrl: './puzzle-qa-dialog.component.html',
  styleUrls: ['./puzzle-qa-dialog.component.scss']
})
export class PuzzleQADialogComponent implements OnInit, OnDestroy {

  puzzleForm: FormGroup;
  private componentDestroyed$ = new Subject();

  constructor(
    private location: Location,
    private editedPuzzleService: EditedPuzzleService
  ) { }

  ngOnInit() {
    this.editedPuzzleService.puzzle$.pipe(
      take(1),
      takeUntil(this.componentDestroyed$)
    ).subscribe(puzzle => {
      this.puzzleForm = new FormGroup({
        question: new FormControl(puzzle.details.question),
        answers: new FormControl(puzzle.details.answers.join('\n'))
      });
    });

    this.puzzleForm.valueChanges.pipe(
      takeUntil(this.componentDestroyed$)
    ).subscribe(() => {
      this.editedPuzzleService.setQA(
        this.puzzleForm.value.question,
        this.puzzleForm.value.answers.split('\n').filter(answer => !!answer)
      );
    });
  }

  ngOnDestroy() {
    this.componentDestroyed$.next();
  }

  close() {
    this.location.back();
  }
}
