import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';
import { Puzzle, SimplePuzzleDetails } from 'functions/src/common/puzzle';
import { PanoView } from 'functions/src/common/pano';

@Injectable({
  providedIn: 'root'
})
export class EditedPuzzleService {

  constructor() { }

  private puzzle = new BehaviorSubject<Puzzle>(null);
  puzzle$ = this.puzzle.asObservable();

  getPuzzleSnapshot(): Puzzle {
    return this.puzzle.value;
  }
  setPuzzle( puzzle: Puzzle ) {
    this.puzzle.next(puzzle);
  }

  setDetails( details: SimplePuzzleDetails ) {
    this.puzzle.value.details = details;
    this.puzzle.next(this.puzzle.value);
  }
  setView( view: PanoView ) {
    this.puzzle.value.details.startView = view;
    this.puzzle.next(this.puzzle.value);
  }
}
