import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginDialogComponent } from './login-dialog/login-dialog.component';
import { RegisterDialogComponent } from './register-dialog/register-dialog.component';
import { SharedModule } from '../shared/shared.module';
import { MaterialModule } from '../material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [LoginDialogComponent, RegisterDialogComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule,
    MaterialModule,
    RouterModule
  ],
  exports: [LoginDialogComponent, RegisterDialogComponent]
})
export class AuthModule { }
