import { Component, OnInit, Input } from '@angular/core';
import { SimplePuzzle } from 'functions/src/common/puzzle';
import { AuthService } from 'src/app/auth/auth-service/auth.service';
import { Router } from '@angular/router';
import { EditorService } from 'src/app/edit/editor/editor.service';

@Component({
  selector: 'app-puzzle-card',
  templateUrl: './puzzle-card.component.html',
  styleUrls: ['./puzzle-card.component.scss']
})
export class PuzzleCardComponent implements OnInit {

  @Input() puzzle: SimplePuzzle;
  @Input() puzzleId: string;

  constructor(
    private authService: AuthService,
    private router: Router,
    private editorService: EditorService
  ) { }

  ngOnInit() {
  }

  isMy(): boolean {
    const uid = this.authService.getUid();
    return uid && this.puzzle.author.uid === uid;
  }

  edit() {
    this.editorService.loadPuzzleToEdit(this.puzzle, this.puzzleId);
    this.router.navigate(['/', 'editor']);
  }
}
