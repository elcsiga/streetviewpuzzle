import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignInDialogComponent } from './auth/signin-dialog/signin-dialog.component';
import { RegisterDialogComponent } from './auth/register-dialog/register-dialog.component';
import { HomeComponent } from './game/home/home.component';
import { SimplePuzzleDialogComponent } from './game/simple-puzzle-dialog/simple-puzzle-dialog.component';
import { MapDialogComponent } from './game/map-dialog/map-dialog.component';
import { PuzzleEditorComponent } from './game/puzzle-editor/puzzle-editor.component';
import { PuzzleSaveDialogComponent } from './game/puzzle-save-dialog/puzzle-save-dialog.component';

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
    path: 'editor',
    component: PuzzleEditorComponent,
    data: { animation: 'editor' },
    children: [
      {
        path: 'map',
        component: MapDialogComponent,
        data: { animation: 'map' }
      },
      {
        path: 'qa',
        component: SimplePuzzleDialogComponent,
        data: { animation: 'qa' }
      },
      {
        path: 'save',
        component: PuzzleSaveDialogComponent,
        data: { animation: 'save' }
      },
    ]
  },


  { path: '**', component: HomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
