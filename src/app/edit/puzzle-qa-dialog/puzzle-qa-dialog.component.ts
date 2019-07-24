import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { SimplePuzzleDetails, Puzzle } from 'functions/src/common/puzzle';
import { Location } from '@angular/common';
import { Subscription } from 'rxjs';
import { EditedPuzzleService } from '../edited-puzzle.service';


@Component({
  selector: 'app-puzzle-qa-dialog',
  templateUrl: './puzzle-qa-dialog.component.html',
  styleUrls: ['./puzzle-qa-dialog.component.scss']
})
export class PuzzleQADialogComponent implements OnInit, OnDestroy {

  puzzleForm = new FormGroup({
    question: new FormControl(this.getPuzzleDetailsSnapshot().question),
    answers: new FormControl(this.getPuzzleDetailsSnapshot().answers.join('\n'))
  });

  private subscription: Subscription;

  constructor(
    private location: Location,
    private editedPuzzleService: EditedPuzzleService
  ) { }

  getPuzzleDetailsSnapshot(): SimplePuzzleDetails {
    return this.editedPuzzleService.getPuzzleSnapshot().details;
  }

  ngOnInit() {
    this.subscription = this.puzzleForm.valueChanges.subscribe(() => {
      this.editedPuzzleService.setDetails({
        ...this.getPuzzleDetailsSnapshot(),
        question: this.puzzleForm.value.question,
        answers: this.puzzleForm.value.answers.split('\n').filter(answer => !!answer)
      });
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  close() {
    this.location.back();
  }
}
