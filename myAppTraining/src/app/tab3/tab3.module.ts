import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab3Page } from './tab3.page';
import { SettingsComponent } from '../components/settings/settings.component';


@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    RouterModule.forChild([
      { 
        path: '', 
        component: Tab3Page
      }
    ])
  ],
  entryComponents: [SettingsComponent],
  declarations: [Tab3Page, SettingsComponent]
})
export class Tab3PageModule {}
