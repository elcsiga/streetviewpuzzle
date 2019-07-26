import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogComponent } from './dialog/dialog.component';
import { MaterialModule } from '../material/material.module';
import { RouterModule } from '@angular/router';
import { DialogLinkPipe } from './dialog-link.pipe';

@NgModule({
  declarations: [DialogComponent, DialogLinkPipe],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule
  ],
  exports: [DialogComponent, DialogLinkPipe]
})
export class SharedModule { }
