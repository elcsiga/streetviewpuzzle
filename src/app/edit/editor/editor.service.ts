import { Injectable } from '@angular/core';
import { SimplePuzzle } from 'functions/src/common/puzzle';
import { MapService } from 'src/app/map/map.service';
import { AuthService } from 'src/app/auth/auth-service/auth.service';

@Injectable({
  providedIn: 'root'
})
export class EditorService {

  constructor(
    private mapService: MapService,
    private authService: AuthService
  ) { }

  getEditedPuzzleId(): string {
    return localStorage.getItem('puzzle-edited-id');
  }
  getEditedPuzzle(): SimplePuzzle {
    const item = localStorage.getItem('puzzle-edited');
    if (item) {
      return JSON.parse(item) as SimplePuzzle;
    } else {
      return {
        startView: this.mapService.getCurrentViewSnapshot(),
        title: '',
        question: '',
        answers: [],
        thumbnail: null,
        author: {
          uid: this.authService.getUid(),
          publicUser: null
        }
      };
    }
  }

  loadPuzzleToEdit(puzzle: SimplePuzzle, puzzleId: string) {
    const currentId = localStorage.getItem('puzzle-edited-id');
    if (puzzleId !== currentId) {
      this.setEditedPuzzle(puzzle);
      this.mapService.setView(puzzle.startView, 'edit');
      localStorage.setItem('puzzle-edited-id', puzzleId);
    }
  }

  setEditedPuzzle(puzzle: SimplePuzzle) {
    localStorage.setItem('puzzle-edited', JSON.stringify(puzzle));
  }

  clearEditedPuzzle() {
    localStorage.removeItem('puzzle-edited');
  }
}
