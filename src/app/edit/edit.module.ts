import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PuzzleQADialogComponent } from './puzzle-qa-dialog/puzzle-qa-dialog.component';
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
    PuzzleQADialogComponent,
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
    PuzzleQADialogComponent,
    MapDialogComponent,
    PuzzleEditorComponent,
    PuzzleSaveDialogComponent
  ]
})
export class EditModule { }
