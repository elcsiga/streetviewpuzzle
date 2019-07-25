import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';
import { Puzzle, SimplePuzzleDetails } from 'functions/src/common/puzzle';
import { PanoView } from 'functions/src/common/pano';
import { filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EditedPuzzleService {

  constructor() { }

  private puzzle = new BehaviorSubject<Puzzle>(null);
  puzzle$ = this.puzzle.pipe(
    filter( p => !!p)
  );

  getPuzzleSnapshot(): Puzzle {
    return this.puzzle.value;
  }
  setPuzzle( puzzle: Puzzle ) {
    this.puzzle.next(puzzle);
  }

  setQA( question: string, answers: string[] ) {
    this.puzzle.value.details.question = question;
    this.puzzle.value.details.answers = answers;
    this.puzzle.next(this.puzzle.value);
  }
  setTitle( title: string ) {
    this.puzzle.value.details.title = title;
    this.puzzle.next(this.puzzle.value);
  }
  setView( view: PanoView ) {
    this.puzzle.value.details.startView = view;
    this.puzzle.next(this.puzzle.value);
  }
}
