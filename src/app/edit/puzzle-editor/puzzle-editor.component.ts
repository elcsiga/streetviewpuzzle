import { Component, OnInit } from '@angular/core';
import { routeAnimation } from 'src/app/animations';
import { ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { EditorService } from '../editor/editor.service';

@Component({
  selector: 'app-puzzle-editor',
  templateUrl: './puzzle-editor.component.html',
  styleUrls: ['./puzzle-editor.component.scss'],
  animations: [routeAnimation]
})
export class PuzzleEditorComponent implements OnInit {

  constructor(
    private activatedRoute: ActivatedRoute,
    private editorService: EditorService
  ) {
  }

  ngOnInit() {
    const puzzle = (this.activatedRoute.snapshot.data as any).puzzle;

    if (puzzle) {
      this.editorService.loadPuzzleToEdit(puzzle);

    }

   

  }
}
