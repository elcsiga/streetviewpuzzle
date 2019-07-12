import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StreetViewComponent } from './street-view/street-view.component';
import { MapComponent } from './map/map.component';
import { MaterialModule } from '../material/material.module';

@NgModule({
  declarations: [StreetViewComponent, MapComponent],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports: [StreetViewComponent, MapComponent]
})
export class MapModule { }
