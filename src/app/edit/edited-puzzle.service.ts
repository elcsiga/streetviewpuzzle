import { Injectable } from '@angular/core';
import cloneDeep from 'lodash.clonedeep';
import { BehaviorSubject, Observable } from 'rxjs';
import { Puzzle } from 'functions/src/common/puzzle';
import { PanoView, panoPosEquals, panoPovEquals } from 'functions/src/common/pano';
import { filter, map, tap } from 'rxjs/operators';
import { MapService } from '../map/map.service';
import { AuthService } from '../auth/auth-service/auth.service';

export interface CheckedPuzzle {
  puzzle: Puzzle;
  checks: {
    position: boolean;
    title: boolean;
    question: boolean;
    answers: boolean;
    author: boolean;
  };
  changes: {
    position: boolean;
    title: boolean;
    question: boolean;
    answers: boolean;
    author: boolean;
  };
}

@Injectable({
  providedIn: 'root'
})
export class EditedPuzzleService {

  constructor(
    private mapService: MapService,
    private authService: AuthService
  ) { }

  private original: Puzzle = null;
  private puzzle = new BehaviorSubject<Puzzle>(null);
  puzzle$ = this.puzzle.pipe(
    filter( p => !!p)
  );

  checkedPuzzle$: Observable<CheckedPuzzle> = this.puzzle$.pipe(
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
      },
      changes: {
        position: !panoPosEquals(
          puzzle.details.startView.position,
          this.original.details.startView.position
        ) || !panoPovEquals(
          puzzle.details.startView.pov,
          this.original.details.startView.pov
        ),
        title: puzzle.details.title !== this.original.details.title,
        question: puzzle.details.question !== this.original.details.question,
        answers: puzzle.details.answers.join('@') !== this.original.details.answers.join('@'),
        author: this.authService.getUid() !== this.original.details.author.uid
      },
    })),
    tap(r => console.log('____', r))
  );

  setPuzzle( puzzle: Puzzle ) {
    this.original = cloneDeep(puzzle);
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
