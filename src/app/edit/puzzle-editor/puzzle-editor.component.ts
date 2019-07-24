import { Component, OnInit, OnDestroy } from '@angular/core';
import { routeAnimation } from 'src/app/animations';
import { ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { Puzzle } from 'functions/src/common/puzzle';
import { EditedPuzzleService } from '../edited-puzzle.service';
import { MapService } from 'src/app/map/map.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-puzzle-editor',
  templateUrl: './puzzle-editor.component.html',
  styleUrls: ['./puzzle-editor.component.scss'],
  animations: [routeAnimation]
})
export class PuzzleEditorComponent implements OnInit, OnDestroy {

  private sub: Subscription;

  constructor(
    private activatedRoute: ActivatedRoute,
    private editedPuzzleService: EditedPuzzleService,
    private mapService: MapService
  ) {
  }

  ngOnInit() {
    const puzzleToEdit: Puzzle = (this.activatedRoute.snapshot.data as any).puzzle;

    if (puzzleToEdit) {
      this.editedPuzzleService.setPuzzle(puzzleToEdit);
      this.mapService.setView(puzzleToEdit.details.startView, 'editor');
      this.sub = this.mapService.getCurrentView$('editor').subscribe( view => this.editedPuzzleService.setView(view));
    }
  }

  ngOnDestroy() {
    this.editedPuzzleService.setPuzzle(null);
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }
}
