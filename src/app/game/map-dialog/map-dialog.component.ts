import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { PanoView, PanoPos } from 'src/app/map/common';
import { MapService } from 'src/app/map/map.service';
@Component({
  selector: 'app-map-dialog',
  templateUrl: './map-dialog.component.html',
  styleUrls: ['./map-dialog.component.scss']
})
export class MapDialogComponent implements OnInit {
 
   constructor(
  ) { }

  ngOnInit() {
 
  }
}
