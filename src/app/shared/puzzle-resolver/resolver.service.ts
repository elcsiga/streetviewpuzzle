import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, from } from 'rxjs';
import { Puzzle, SimplePuzzleDetails } from 'functions/src/common/puzzle';
import * as firebase from 'firebase/app';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ResolverService implements Resolve<Observable<Puzzle>> {

  resolve(route: ActivatedRouteSnapshot): Observable<Puzzle> {
    const puzzleId = route.paramMap.get('puzzleId');

    console.log('resolving', puzzleId);
    return from(firebase.firestore().collection('puzzles').doc(puzzleId).get())
      .pipe( map(snapshot => ({
        id: snapshot.id,
        details: snapshot.data() as SimplePuzzleDetails
      })));
  }
}

