import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { SharedModule } from '../shared/shared.module';
import { EditMenuComponent } from './edit-menu/edit-menu.component';
import { MaterialModule } from '../material/material.module';
import { SimplePuzzleDialogComponent } from './simple-puzzle-dialog/simple-puzzle-dialog.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { MapDialogComponent } from './map-dialog/map-dialog.component';
import { MapModule } from '../map/map.module';


@NgModule({
  declarations: [HomeComponent, EditMenuComponent, SimplePuzzleDialogComponent, MapDialogComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule,
    SharedModule,
    RouterModule,
    MapModule
  ],
  exports: [
    HomeComponent, 
    EditMenuComponent, SimplePuzzleDialogComponent, MapDialogComponent
  ]
})
export class GameModule { }
