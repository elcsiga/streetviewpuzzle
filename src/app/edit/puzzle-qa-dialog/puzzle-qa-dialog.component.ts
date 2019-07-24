import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { SimplePuzzleDetails, Puzzle } from 'functions/src/common/puzzle';
//import { EditorService } from '../editor/editor.service';
import { Location } from '@angular/common';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-puzzle-qa-dialog',
  templateUrl: './puzzle-qa-dialog.component.html',
  styleUrls: ['./puzzle-qa-dialog.component.scss']
})
export class PuzzleQADialogComponent implements OnInit, OnDestroy {

  @Input() puzzle: Puzzle;
  @Output() puzzleChange = new EventEmitter<Puzzle>();

  puzzleForm = new FormGroup({
    question: new FormControl(this.puzzle.details.question),
    answers: new FormControl(this.puzzle.details.answers.join('\n'))
  });

  private subscription: Subscription;

  constructor(
    private location: Location,
    //private editorService: EditorService
  ) { }

  ngOnInit() {
    this.subscription = this.puzzleForm.valueChanges.subscribe(() => {
      this.puzzle.question = this.puzzleForm.value.question;
      this.puzzle.answers = this.puzzleForm.value.answers.split('\n').filter(answer => !!answer);
      this.puzzleChange.emit(this.puzzle);
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  close() {
    this.location.back();
  }
}
