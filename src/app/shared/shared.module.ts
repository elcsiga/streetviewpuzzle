import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogComponent } from './dialog/dialog.component';
import { MaterialModule } from '../material/material.module';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [DialogComponent],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule
  ],
  exports: [DialogComponent]
})
export class SharedModule { }
