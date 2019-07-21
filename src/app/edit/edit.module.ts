import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SimplePuzzleDialogComponent } from './simple-puzzle-dialog/simple-puzzle-dialog.component';
import { MapDialogComponent } from './map-dialog/map-dialog.component';
import { PuzzleSaveDialogComponent } from './puzzle-save-dialog/puzzle-save-dialog.component';
import { PuzzleEditorComponent } from './puzzle-editor/puzzle-editor.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { MaterialModule } from '../material/material.module';
import { RouterModule } from '@angular/router';
import { MapModule } from '../map/map.module';
import { AuthModule } from '../auth/auth.module';

@NgModule({
  declarations: [
    SimplePuzzleDialogComponent,
    MapDialogComponent,
    PuzzleEditorComponent,
    PuzzleSaveDialogComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule,
    SharedModule,
    RouterModule,
    MapModule,
    AuthModule
  ],
  exports: [
    SimplePuzzleDialogComponent,
    MapDialogComponent,
    PuzzleEditorComponent,
    PuzzleSaveDialogComponent
  ]
})
export class EditModule { }
