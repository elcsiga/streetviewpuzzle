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
import { PuzzleCheckComponent } from './puzzle-check/puzzle-check.component';
import { PuzzleTitleDialogComponent } from './puzzle-title-dialog/puzzle-title-dialog.component';

@NgModule({
  declarations: [
    PuzzleQADialogComponent,
    MapDialogComponent,
    PuzzleEditorComponent,
    PuzzleSaveDialogComponent,
    PuzzleCheckComponent,
    PuzzleTitleDialogComponent,
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
    PuzzleSaveDialogComponent,
    PuzzleTitleDialogComponent
  ]
})
export class EditModule { }
