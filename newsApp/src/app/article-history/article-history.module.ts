import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ArticleHistoryPage } from './article-history.page';
import { FilterHistoryComponent } from '../components/filter-history/filter-history.component';

const routes: Routes = [
  {
    path: '',
    component: ArticleHistoryPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  entryComponents: [FilterHistoryComponent],
  declarations: [ArticleHistoryPage, FilterHistoryComponent]
})
export class ArticleHistoryPageModule {}
