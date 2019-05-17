import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { DrawPage } from './draw.page';
import { SettingsComponent } from '../components/settings/settings.component';
// import { NO_ERRORS_SCHEMA } from '@angular/core';


const routes: Routes = [
  {
    path: '',
    component: DrawPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  entryComponents: [],
  declarations: [DrawPage]
})
export class DrawPageModule {}
