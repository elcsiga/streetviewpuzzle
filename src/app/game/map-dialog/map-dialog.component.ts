import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { PanoView } from 'src/app/common';
import { MapService } from 'src/app/map/map/map.service';
@Component({
  selector: 'app-map-dialog',
  templateUrl: './map-dialog.component.html',
  styleUrls: ['./map-dialog.component.scss']
})
export class MapDialogComponent implements OnInit {

  @Input() view: PanoView = {
    position: { lat: 37.869260, lng: -122.254811 },
    pov: { heading: 165, pitch: 0 },
    zoom: 1
  };
  @Output() viewChange = new EventEmitter<PanoView>();
  
  private map;

  constructor(
    private mapService: MapService
  ) { }

  ngOnInit() {
    this.mapService.googleMaps$.subscribe(googleMaps => {
      if (googleMaps) {
        this.map = new googleMaps.Map(
          document.querySelector('.map'), {
            disableDefaultUI: true,
            center: this.view.position,
            zoom: 16
          });

        this.map.addListener('center_changed', () => {
          const center = this.map.getCenter();
          this.viewChange.emit({
            ...this.view,
            position: {
              lat: center.lat,
              lng: center.lng
            }
          });
        });
      }
    });
  }
}
