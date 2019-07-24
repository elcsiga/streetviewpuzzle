import { Component, OnInit, Input } from '@angular/core';
import { Puzzle } from 'functions/src/common/puzzle';
import { AuthService } from 'src/app/auth/auth-service/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-puzzle-card',
  templateUrl: './puzzle-card.component.html',
  styleUrls: ['./puzzle-card.component.scss']
})
export class PuzzleCardComponent implements OnInit {

  @Input() puzzle: Puzzle;

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  isMy(): boolean {
    const uid = this.authService.getUid();
    return uid && this.puzzle.details.author.uid === uid;
  }

  edit( $event: MouseEvent ) {
    $event.stopPropagation();
    this.router.navigate(['edit', this.puzzle.id]);
  }
}
