import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StreetViewComponent } from './street-view/street-view.component';
import { MapComponent } from './map/map.component';

@NgModule({
  declarations: [StreetViewComponent, MapComponent],
  imports: [
    CommonModule
  ],
  exports: [StreetViewComponent, MapComponent]
})
export class MapModule { }
