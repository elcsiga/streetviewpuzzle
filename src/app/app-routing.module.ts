import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignInDialogComponent } from './auth/signin-dialog/signin-dialog.component';
import { RegisterDialogComponent } from './auth/register-dialog/register-dialog.component';
import { HomeComponent } from './game/home/home.component';
import { PuzzleQADialogComponent } from './edit/puzzle-qa-dialog/puzzle-qa-dialog.component';
import { PuzzleTitleDialogComponent } from './edit/puzzle-title-dialog/puzzle-title-dialog.component';
import { MapDialogComponent } from './edit/map-dialog/map-dialog.component';
import { PuzzleEditorComponent } from './edit/puzzle-editor/puzzle-editor.component';
import { PuzzleSaveDialogComponent } from './edit/puzzle-save-dialog/puzzle-save-dialog.component';
import { PuzzleResolver } from './shared/puzzle-resolver/puzzle-resolver.service';
import { PuzzlePlayDialogComponent } from './game/puzzle-play-dialog/puzzle-play-dialog.component';

const routes: Routes = [

  {
    path: 'edit/:puzzleId',
    component: PuzzleEditorComponent,
    resolve: { puzzle: PuzzleResolver },
    data: { animation: 'editor' },
  },
  {
    path: 'create/:puzzleType',
    component: PuzzleEditorComponent,
    data: { animation: 'editor' },
  },

  // dialogs
  {
    path: 'signin',
    component: SignInDialogComponent,
    outlet: 'dialog',
    data: { animation: 'signin' }
  },
  {
    path: 'register',
    component: RegisterDialogComponent,
    outlet: 'dialog',
    data: { animation: 'register' }
  },
  {
    path: 'map',
    component: MapDialogComponent,
    outlet: 'dialog',
    data: { animation: 'map' }
  },
  {
    path: 'qa',
    component: PuzzleQADialogComponent,
    outlet: 'dialog',
    data: { animation: 'qa' }
  },
  {
    path: 'title',
    component: PuzzleTitleDialogComponent,
    outlet: 'dialog',
    data: { animation: 'title' }
  },
  {
    path: 'save',
    component: PuzzleSaveDialogComponent,
    outlet: 'dialog',
    data: { animation: 'save' }
  },

  {
    path: 'play/:puzzleId',
    component: PuzzlePlayDialogComponent,
    outlet: 'dialog',
    resolve: { puzzle: PuzzleResolver },
    data: { animation: 'play' }
  },

  { path: '**', component: HomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
