import { Component, OnInit, OnDestroy, Input, OnChanges, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { MapService } from '../map.service';
import { PanoView, PanoPos, PanoPov } from 'src/app/map/common';

@Component({
  selector: 'app-street-view',
  templateUrl: './street-view.component.html',
  styleUrls: ['./street-view.component.scss']
})
export class StreetViewComponent implements OnInit, OnChanges, OnDestroy {

  @Input() view: PanoView;
  @Output() posChange = new EventEmitter<PanoPos>();
  @Output() povChange = new EventEmitter<PanoPov>();

  private panorama;

  currentPos$ = this.mapService.currentPos$;

  constructor(
    private mapService: MapService
  ) { }

  ngOnInit() {
    this.mapService.googleMaps$.subscribe(googleMaps => {
      if (googleMaps) {
        this.panorama = new googleMaps.StreetViewPanorama(
          document.querySelector('.panorama-container'), {
            ...this.view,
            disableDefaultUI: true,
            motionTracking: false,
          });

        this.panorama.addListener('position_changed', () => {
          this.posChange.emit(this.panorama.getPosition());
        });

        this.panorama.addListener('pov_changed', () => {
          this.povChange.emit(this.panorama.getPov());
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

  ngOnChanges() {
    if (this.panorama) {
      this.panorama.getPosition(this.view.position);
      this.panorama.setPov(this.view.pov);
    }

    // TODO zoom?

  }

  ngOnDestroy() {
    // TODO this.panorama.destroy?
  }
}
