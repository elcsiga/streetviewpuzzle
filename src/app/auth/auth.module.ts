import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignInDialogComponent } from './signin-dialog/signin-dialog.component';
import { RegisterDialogComponent } from './register-dialog/register-dialog.component';
import { SharedModule } from '../shared/shared.module';
import { MaterialModule } from '../material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { UserMenuComponent } from './user-menu/user-menu.component';
import { UserCardComponent } from './user-card/user-card.component';
import { AvatarComponent } from './avatar/avatar.component';

@NgModule({
  declarations: [
    SignInDialogComponent,
    RegisterDialogComponent,
    UserMenuComponent,
    UserCardComponent,
    AvatarComponent
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
    UserMenuComponent,
    UserCardComponent,
    AvatarComponent
  ]
})
export class AuthModule { }
