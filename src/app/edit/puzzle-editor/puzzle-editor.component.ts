import { Component, OnInit, OnDestroy } from '@angular/core';
import { routeAnimation } from 'src/app/animations';
import { ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
// import { EditorService } from '../editor/editor.service';
// import { MapService } from 'src/app/map/map.service';
// import { Subscription } from 'rxjs';
import { Puzzle } from 'functions/src/common/puzzle';

@Component({
  selector: 'app-puzzle-editor',
  templateUrl: './puzzle-editor.component.html',
  styleUrls: ['./puzzle-editor.component.scss'],
  animations: [routeAnimation]
})
export class PuzzleEditorComponent implements OnInit, OnDestroy {

  //private subscription: Subscription;

  puzzle: Puzzle;

  constructor(
    private activatedRoute: ActivatedRoute,
    //private editorService: EditorService,
    //private mapService: MapService
  ) {
  }

  ngOnInit() {
    const puzzleToEdit = (this.activatedRoute.snapshot.data as any).puzzle;

    if (puzzleToEdit) {
     // this.editorService.loadPuzzleToEdit(puzzle);
      this.puzzle = puzzleToEdit;
    }

    // this.mapService.setView(puzzle.details.startView, 'edit');

    //this.subscription = this.mapService.getCurrentView$('editor').subscribe( view => {
    //  this.editorService.setEditedPuzzle
    ///});
  }

  ngOnDestroy() {
   //this.subscription.unsubscribe();


  }
}
