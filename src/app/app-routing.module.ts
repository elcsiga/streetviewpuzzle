import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignInDialogComponent } from './auth/signin-dialog/signin-dialog.component';
import { RegisterDialogComponent } from './auth/register-dialog/register-dialog.component';
import { HomeComponent } from './game/home/home.component';

const routes: Routes = [
  {
    path: 'signin',
    component: SignInDialogComponent,
    data: { animation: 'dialog1' }
  },
  {
    path: 'register',
    component: RegisterDialogComponent,
    data: { animation: 'dialog2' }
  },
  { path: '**', component: HomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
