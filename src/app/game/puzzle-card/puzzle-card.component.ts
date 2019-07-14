import { Component, OnInit, Input } from '@angular/core';
import { SimplePuzzle } from 'functions/src/common/puzzle';

@Component({
  selector: 'app-puzzle-card',
  templateUrl: './puzzle-card.component.html',
  styleUrls: ['./puzzle-card.component.scss']
})
export class PuzzleCardComponent implements OnInit {

  @Input() puzzle: SimplePuzzle
  constructor() { }

  ngOnInit() {
  }

}
