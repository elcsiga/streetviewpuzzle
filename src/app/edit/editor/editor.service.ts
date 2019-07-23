import { Injectable } from '@angular/core';
import { SimplePuzzleDetails, Puzzle } from 'functions/src/common/puzzle';
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
  getEditedPuzzle(): SimplePuzzleDetails {
    const item = localStorage.getItem('puzzle-edited');
    if (item) {
      return JSON.parse(item) as SimplePuzzleDetails;
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

  loadPuzzleToEdit(puzzle: Puzzle) {
    const currentId = localStorage.getItem('puzzle-edited-id');
    // if (puzzle.id !== currentId) {
      this.setEditedPuzzle(puzzle.details);
      this.mapService.setView(puzzle.details.startView, 'edit');
      localStorage.setItem('puzzle-edited-id', puzzle.id);
    // }
  }

  setEditedPuzzle(puzzle: SimplePuzzleDetails) {
    localStorage.setItem('puzzle-edited-', JSON.stringify(puzzle));
  }

  clearEditedPuzzle() {
    localStorage.removeItem('puzzle-edited');
  }
}
