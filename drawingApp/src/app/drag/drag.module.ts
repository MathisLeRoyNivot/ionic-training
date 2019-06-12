import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { DragPage } from './drag.page';
import { CanvasComponent } from '../components/canvas/canvas.component';

const routes: Routes = [
  {
    path: '',
    component: DragPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [DragPage, CanvasComponent]
})
export class DragPageModule {}
