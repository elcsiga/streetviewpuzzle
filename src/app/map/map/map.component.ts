import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { MapService } from '../map.service';
import { PanoPos } from '../common';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {

  @Input() pos: PanoPos = {
    lat: 37.869260,
    lng: -122.254811
  };
  @Output() posChange = new EventEmitter<PanoPos>();

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
            center: this.pos,
            zoom: 16
          });

        this.map.addListener('center_changed', () => {
          const center = this.map.getCenter();
          this.posChange.emit({
            lat: center.lat,
            lng: center.lng
          });
        });
      }
    });
  }
}
