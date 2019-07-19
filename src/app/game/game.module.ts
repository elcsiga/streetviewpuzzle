import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { SharedModule } from '../shared/shared.module';
import { MaterialModule } from '../material/material.module';
import { SimplePuzzleDialogComponent } from './simple-puzzle-dialog/simple-puzzle-dialog.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { MapDialogComponent } from './map-dialog/map-dialog.component';
import { MapModule } from '../map/map.module';
import { PuzzleCardComponent } from './puzzle-card/puzzle-card.component';
import { PuzzleEditorComponent } from './puzzle-editor/puzzle-editor.component';
import { PuzzleSaveDialogComponent } from './puzzle-save-dialog/puzzle-save-dialog.component';
import { PlayComponent } from './play/play.component';

@NgModule({
  declarations: [
    HomeComponent,
    SimplePuzzleDialogComponent,
    MapDialogComponent,
    PuzzleCardComponent,
    PuzzleEditorComponent,
    PuzzleSaveDialogComponent,
    PlayComponent
  ],
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
    SimplePuzzleDialogComponent,
    MapDialogComponent,
    PuzzleEditorComponent,
    PuzzleSaveDialogComponent,
    PlayComponent
  ]
})
export class GameModule { }
