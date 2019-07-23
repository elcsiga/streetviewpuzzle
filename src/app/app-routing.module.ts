import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignInDialogComponent } from './auth/signin-dialog/signin-dialog.component';
import { RegisterDialogComponent } from './auth/register-dialog/register-dialog.component';
import { HomeComponent } from './game/home/home.component';
import { PuzzleQADialogComponent } from './edit/puzzle-qa-dialog/puzzle-qa-dialog.component';
import { MapDialogComponent } from './edit/map-dialog/map-dialog.component';
import { PuzzleEditorComponent } from './edit/puzzle-editor/puzzle-editor.component';
import { PuzzleSaveDialogComponent } from './edit/puzzle-save-dialog/puzzle-save-dialog.component';
import { PuzzleResolver } from './shared/puzzle-resolver/puzzle-resolver.service';

const editorChildren = [
  {
    path: 'map',
    component: MapDialogComponent,
    data: { animation: 'map' }
  },
  {
    path: 'qa',
    component: PuzzleQADialogComponent,
    data: { animation: 'qa' }
  },
  {
    path: 'save',
    component: PuzzleSaveDialogComponent,
    data: { animation: 'save' }
  }
];

const routes: Routes = [
  {
    path: 'signin',
    component: SignInDialogComponent,
    data: { animation: 'signin' }
  },
  {
    path: 'register',
    component: RegisterDialogComponent,
    data: { animation: 'register' }
  },
  {
    path: 'edit/:puzzleId',
    component: PuzzleEditorComponent,
    resolve: { puzzle: PuzzleResolver },
    data: { animation: 'editor' },
    children: editorChildren
  },
  {
    path: 'create/:puzzleType',
    component: PuzzleEditorComponent,
    data: { animation: 'editor' },
    children: editorChildren
  },


  { path: '**', component: HomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
