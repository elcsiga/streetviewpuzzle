import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogComponent } from './dialog/dialog.component';
import { MaterialModule } from '../material/material.module';
import { RouterModule } from '@angular/router';
import { CheckmarkComponent } from './checkmark/checkmark.component';

@NgModule({
  declarations: [DialogComponent, CheckmarkComponent],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule
  ],
  exports: [DialogComponent, CheckmarkComponent]
})
export class SharedModule { }
