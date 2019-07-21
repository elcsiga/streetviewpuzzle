import { Component } from '@angular/core';
import { routeAnimation } from 'src/app/animations';

@Component({
  selector: 'app-puzzle-editor',
  templateUrl: './puzzle-editor.component.html',
  styleUrls: ['./puzzle-editor.component.scss'],
  animations: [routeAnimation]
})
export class PuzzleEditorComponent {
}
