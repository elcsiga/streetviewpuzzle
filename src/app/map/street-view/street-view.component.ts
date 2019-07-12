import { Component, OnInit, OnDestroy } from '@angular/core';
import { MapService } from '../map.service';
import { combineLatest, Subject } from 'rxjs';
import { take, takeUntil, distinctUntilChanged } from 'rxjs/operators';
import { panoPosEquals, panoPovEquals } from 'functions/src/common/pano';

@Component({
  selector: 'app-street-view',
  templateUrl: './street-view.component.html',
  styleUrls: ['./street-view.component.scss']
})
export class StreetViewComponent implements OnInit, OnDestroy {

  private panorama;

  currentPos$ = this.mapService.currentPos$;
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
      this.panorama = new googleMaps.StreetViewPanorama(
        document.querySelector('.panorama-container'), {
          ...currentView,
          showRoadLabels: false,
          disableDefaultUI: true,
          motionTracking: false,
        });

      this.panorama.addListener('position_changed', () => {
        this.mapService.setPos(this.panorama.getPosition());
      });

      this.panorama.addListener('pov_changed', () => {
        this.mapService.setPov(this.panorama.getPov());
      });

      this.mapService.currentPos$.pipe(
        distinctUntilChanged( panoPosEquals ),
        takeUntil( this.onDestroy$ )
      ).subscribe( currentPos => this.panorama.setPosition(currentPos));
      
      this.mapService.currentPov$.pipe(
        distinctUntilChanged( panoPovEquals ),
        takeUntil( this.onDestroy$ )
      ).subscribe( currentPov => this.panorama.setPov(currentPov));
      
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
