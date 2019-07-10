import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { MapService } from '../map/map.service';
import { PanoView } from 'src/app/common';

@Component({
  selector: 'app-street-view',
  templateUrl: './street-view.component.html',
  styleUrls: ['./street-view.component.scss']
})
export class StreetViewComponent implements OnInit, OnDestroy {

  @Input() view: PanoView = {
    position: { lat: 37.869260, lng: -122.254811 },
    pov: { heading: 165, pitch: 0 },
    zoom: 1
  };

  private panorama;

  constructor(
    private mapService: MapService
  ) { }

  ngOnInit() {
    this.mapService.googleMaps$.subscribe(googleMaps => {
      if (googleMaps) {
        this.panorama = new googleMaps.StreetViewPanorama(
          document.querySelector('.panorama-container'), {
            disableDefaultUI: true,
            motionTrackingControl: false,
            ...this.view
          });

        // const cafeMarker = new googleMaps.Marker({
        //   position: { lat: 37.869260, lng: -122.254811 },
        //   map: this.panorama,
        //   icon: 'http://chart.apis.google.com/chart?chst=d_map_pin_icon&chld=cafe|FFFF00',
        //   title: 'Cafe'
        // });
      }
    });
  }

  ngOnDestroy() {
    // TODO this.panorama.destroy?
  }
}
