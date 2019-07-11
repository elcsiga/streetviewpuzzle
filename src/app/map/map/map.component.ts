import { Component, OnInit, Input, EventEmitter, Output, OnDestroy } from '@angular/core';
import { MapService } from '../map.service';
import { PanoPos, panoPosEquals, panoPovEquals } from '../common';
import { combineLatest, Subject } from 'rxjs';
import { take, takeUntil, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit, OnDestroy {

  private map;

  heading = 0;

  onDestroy$ = new Subject();

  constructor(
    private mapService: MapService
  ) { }

  ngOnInit() {
    combineLatest(
      this.mapService.googleMaps$,
      this.mapService.currentView$
    ).pipe(
      take(1),
      takeUntil(this.onDestroy$)
    ).subscribe(([googleMaps, currentView]) => {
      this.map = new googleMaps.Map(
        document.querySelector('.map'), {
          disableDefaultUI: true,
          center: currentView.position,
          zoom: 16
        });

      this.heading = currentView.pov.heading;

      this.map.addListener('idle', () => {
        this.mapService.currentPos$.next(this.map.getCenter());
      });

      this.mapService.currentPos$.pipe(
        distinctUntilChanged(panoPosEquals),
        takeUntil(this.onDestroy$)
      ).subscribe(currentPos => this.map.setCenter(currentPos));

      this.mapService.currentPov$.pipe(
        distinctUntilChanged( panoPovEquals ),
        takeUntil( this.onDestroy$ )
      ).subscribe( currentPov => this.heading = currentPov.heading);
    });
  }

  ngOnDestroy() {
    this.onDestroy$.next();
  }
}
