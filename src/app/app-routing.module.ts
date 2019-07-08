import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginDialogComponent } from './auth/login-dialog/login-dialog.component';
import { RegisterDialogComponent } from './auth/register-dialog/register-dialog.component';
import { HomeComponent } from './game/home/home.component';

const routes: Routes =[
  { path: 'login', component: LoginDialogComponent },
  { path: 'register',      component: RegisterDialogComponent },
  { path: '**', component: HomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
