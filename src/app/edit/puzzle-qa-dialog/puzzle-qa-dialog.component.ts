import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { SimplePuzzleDetails, Puzzle } from 'functions/src/common/puzzle';
import { Location } from '@angular/common';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-puzzle-qa-dialog',
  templateUrl: './puzzle-qa-dialog.component.html',
  styleUrls: ['./puzzle-qa-dialog.component.scss']
})
export class PuzzleQADialogComponent implements OnInit, OnDestroy {

  @Input() puzzleDetails: SimplePuzzleDetails;
  @Output() puzzleDetailsChange = new EventEmitter<SimplePuzzleDetails>();

  puzzleForm = new FormGroup({
    question: new FormControl(this.puzzleDetails.question),
    answers: new FormControl(this.puzzleDetails.answers.join('\n'))
  });

  private subscription: Subscription;

  constructor(
    private location: Location,
    //private editorService: EditorService
  ) { }

  ngOnInit() {
    this.subscription = this.puzzleForm.valueChanges.subscribe(() => {
      this.puzzleDetails.question = this.puzzleForm.value.question;
      this.puzzleDetails.answers = this.puzzleForm.value.answers.split('\n').filter(answer => !!answer);
      this.puzzleDetailsChange.emit(this.puzzleDetails);
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  close() {
    this.location.back();
  }
}
