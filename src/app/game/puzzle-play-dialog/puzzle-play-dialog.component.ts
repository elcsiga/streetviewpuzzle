import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Puzzle } from 'functions/src/common/puzzle';

@Component({
  selector: 'app-puzzle-play-dialog',
  templateUrl: './puzzle-play-dialog.component.html',
  styleUrls: ['./puzzle-play-dialog.component.scss']
})
export class PuzzlePlayDialogComponent implements OnInit {

  puzzle: Puzzle;
  constructor(
    private location: Location,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.puzzle = (this.activatedRoute.snapshot.data as any).puzzle;
  }

  close() {
    this.location.back();
  }
}
