import { Component, OnInit, OnDestroy } from '@angular/core';
import { MapService } from '../map.service';
import { combineLatest, Subject } from 'rxjs';
import { take, takeUntil, distinctUntilChanged } from 'rxjs/operators';
import { panoPosEquals, panoPovEquals } from 'functions/src/common/pano';

const STREETVIEW_EVENT_SOURCE = 'streetview';

@Component({
  selector: 'app-street-view',
  templateUrl: './street-view.component.html',
  styleUrls: ['./street-view.component.scss']
})
export class StreetViewComponent implements OnInit, OnDestroy {

  private panorama;

  onDestroy$ = new Subject();

  constructor(
    private mapService: MapService
  ) { }

  ngOnInit() {
    combineLatest([
      this.mapService.googleMaps$,
      this.mapService.getCurrentView$('snapshot')
    ]).pipe(
      take(1),
      takeUntil(this.onDestroy$)
    ).subscribe(([googleMaps, currentView]) => {
      this.panorama = new googleMaps.StreetViewPanorama(
        document.querySelector('.panorama-container'), {
          ...currentView,
          showRoadLabels: false,
          disableDefaultUI: true,
          motionTracking: false,
        });

      this.panorama.addListener('position_changed', () => {
        this.mapService.setPos(this.panorama.getPosition(), STREETVIEW_EVENT_SOURCE);
      });

      this.panorama.addListener('pov_changed', () => {
        this.mapService.setPov(this.panorama.getPov(), STREETVIEW_EVENT_SOURCE);
      });

      this.mapService.getCurrentPos$(STREETVIEW_EVENT_SOURCE).pipe(
        takeUntil(this.onDestroy$)
      ).subscribe(currentPos => {
        console.log('SETPOS on STREETVIEW', currentPos);
        this.panorama.setPosition(currentPos);
      });

      this.mapService.getCurrentPov$(STREETVIEW_EVENT_SOURCE).pipe(
        takeUntil(this.onDestroy$)
      ).subscribe(currentPov => {
        console.log('SETPOV on STREETVIEW', currentPov);
        this.panorama.setPov(currentPov);
      });

    });

    // const cafeMarker = new googleMaps.Marker({
    //   position: { lat: 37.869260, lng: -122.254811 },
    //   map: this.panorama,
    //   icon: 'http://chart.apis.google.com/chart?chst=d_map_pin_icon&chld=cafe|FFFF00',
    //   title: 'Cafe'
    // });
  }

  ngOnDestroy() {
    this.onDestroy$.next();
  }
}
