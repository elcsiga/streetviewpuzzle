import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Location } from '@angular/common';
import { Subject } from 'rxjs';
import { EditedPuzzleService } from '../edited-puzzle.service';
import { take, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-puzzle-title-dialog',
  templateUrl: './puzzle-title-dialog.component.html',
  styleUrls: ['./puzzle-title-dialog.component.scss']
})
export class PuzzleTitleDialogComponent implements OnInit, OnDestroy {

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
        title: new FormControl(puzzle.details.title),
      });
    });

    this.puzzleForm.valueChanges.pipe(
      takeUntil(this.componentDestroyed$)
    ).subscribe(() => {
      this.editedPuzzleService.setTitle(
        this.puzzleForm.value.title
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
