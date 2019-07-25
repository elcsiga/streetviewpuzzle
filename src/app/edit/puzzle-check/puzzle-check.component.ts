import { Component, OnInit, Input } from '@angular/core';
import { EditedPuzzleService } from '../edited-puzzle.service';
import { Puzzle } from 'functions/src/common/puzzle';

@Component({
  selector: 'app-puzzle-check',
  templateUrl: './puzzle-check.component.html',
  styleUrls: ['./puzzle-check.component.scss']
})
export class PuzzleCheckComponent implements OnInit {

  @Input() valid: boolean;
  @Input() changed: boolean;
  @Input() title: string;

  constructor(
  ) { }

  ngOnInit() {
  }

}
