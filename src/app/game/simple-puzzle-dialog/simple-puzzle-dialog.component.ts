import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-simple-puzzle-dialog',
  templateUrl: './simple-puzzle-dialog.component.html',
  styleUrls: ['./simple-puzzle-dialog.component.scss']
})
export class SimplePuzzleDialogComponent implements OnInit {
  inProgress = false;
  puzzleForm = new FormGroup({
    title: new FormControl(''),
    question: new FormControl(''),
    answer: new FormControl('')
  });

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
  }

  onSubmit() {
    this.inProgress = true;
    this.puzzleForm.value;
    this.inProgress = false;
  }
}
