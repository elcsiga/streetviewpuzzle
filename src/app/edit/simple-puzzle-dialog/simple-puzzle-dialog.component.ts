import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { SimplePuzzle } from 'functions/src/common/puzzle';
import { EditorService } from '../editor/editor.service';
import { Location } from '@angular/common';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-simple-puzzle-dialog',
  templateUrl: './simple-puzzle-dialog.component.html',
  styleUrls: ['./simple-puzzle-dialog.component.scss']
})
export class SimplePuzzleDialogComponent implements OnInit, OnDestroy {
  puzzle: SimplePuzzle = this.editorService.getEditedPuzzle();

  puzzleForm = new FormGroup({
    question: new FormControl(this.puzzle.question),
    answers: new FormControl(this.puzzle.answers.join('\n'))
  });

  private subscription: Subscription;

  constructor(
    private location: Location,
    private editorService: EditorService
  ) { }

  ngOnInit() {
    this.subscription = this.puzzleForm.valueChanges.subscribe(() => {
      this.puzzle.question = this.puzzleForm.value.question;
      this.puzzle.answers = this.puzzleForm.value.answers.split('\n').filter(answer => !!answer);
      this.editorService.setEditedPuzzle(this.puzzle);
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  close() {
    this.location.back();
  }
}
