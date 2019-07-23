import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, from, of, defer } from 'rxjs';
import { Puzzle, SimplePuzzleDetails } from 'functions/src/common/puzzle';
import * as firebase from 'firebase/app';
import { map, tap, switchMap, first, delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PuzzleResolver implements Resolve<Observable<Puzzle>> {

  resolve(route: ActivatedRouteSnapshot): Observable<Puzzle> {
    const puzzleId = route.paramMap.get('puzzleId');
    const doc = firebase.firestore().collection('puzzles').doc(puzzleId);

    return from( doc.get() ).pipe(
      map( snapshot => ({
        id: snapshot.id,
        details: snapshot.data() as SimplePuzzleDetails
      }))
    )
  }
}

