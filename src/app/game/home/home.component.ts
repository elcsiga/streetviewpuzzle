import { Component, OnInit, OnDestroy } from '@angular/core';
import { SimplePuzzleDetails, Puzzle } from 'functions/src/common/puzzle';
import * as firebase from 'firebase/app';
import { MapService } from 'src/app/map/map.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  puzzles: Puzzle[];
  private startTime;

  constructor(
    private mapService: MapService
  ) { }

  ngOnInit() {
    firebase.firestore().collection('puzzles').onSnapshot(snapshot => {
      const puzzles = [];
      snapshot.forEach(p => puzzles.push({
        id: p.id,
        details: p.data() as SimplePuzzleDetails
      }));
      this.puzzles = puzzles;
    });

    // TODO window.requestAnimationFrame(this.rotate);
  }

  rotate = (timestamp) => {
    if (this.startTime === false) {
      return;
    }
    if (this.startTime === undefined) {
      this.startTime = timestamp;
      window.requestAnimationFrame(this.rotate);
    } else {
      const angle = (timestamp - this.startTime) * .002;
      this.mapService.setPov({
        heading: angle,
        pitch: 0
      }, 'home');
      window.requestAnimationFrame(this.rotate);
    }
  }

  ngOnDestroy() {
    this.startTime = false;
  }
}
