import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { SharedModule } from '../shared/shared.module';
import { MaterialModule } from '../material/material.module';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { MapModule } from '../map/map.module';
import { PuzzleCardComponent } from './puzzle-card/puzzle-card.component';
import { PlayComponent } from './play/play.component';
import { AuthModule } from '../auth/auth.module';
import { PuzzlePlayDialogComponent } from './puzzle-play-dialog/puzzle-play-dialog.component';

@NgModule({
  declarations: [
    HomeComponent,
    PuzzleCardComponent,
    PlayComponent,
    PuzzlePlayDialogComponent
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
    HomeComponent,
    PlayComponent,
    PuzzlePlayDialogComponent
  ]
})
export class GameModule { }
