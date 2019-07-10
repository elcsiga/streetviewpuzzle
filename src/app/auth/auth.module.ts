import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignInDialogComponent } from './signin-dialog/signin-dialog.component';
import { RegisterDialogComponent } from './register-dialog/register-dialog.component';
import { SharedModule } from '../shared/shared.module';
import { MaterialModule } from '../material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { UserMenuComponent } from './user-menu/user-menu.component';

@NgModule({
  declarations: [
    SignInDialogComponent,
    RegisterDialogComponent,
    UserMenuComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule,
    MaterialModule,
    RouterModule
  ],
  exports: [
    SignInDialogComponent,
    RegisterDialogComponent,
    UserMenuComponent
  ]
})
export class AuthModule { }
