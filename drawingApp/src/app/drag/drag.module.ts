import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { DragPage } from './drag.page';
// Import file that contain all the components that we can import in other pages
import { ComponentsModule } from '../components/components.module';

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
    ComponentsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [DragPage]
})
export class DragPageModule {}
