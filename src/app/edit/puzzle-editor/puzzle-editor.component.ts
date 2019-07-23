import { Component, OnInit } from '@angular/core';
import { routeAnimation } from 'src/app/animations';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-puzzle-editor',
  templateUrl: './puzzle-editor.component.html',
  styleUrls: ['./puzzle-editor.component.scss'],
  animations: [routeAnimation]
})
export class PuzzleEditorComponent implements OnInit {

  constructor(
    private activatedRoute: ActivatedRoute
  ) {
    //this.activatedRoute.params.subscribe( p => console.log(p));
  }

  ngOnInit() {
    console.log( this.activatedRoute.snapshot.routeConfig.data );
  }
}
