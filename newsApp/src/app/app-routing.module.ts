import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'news', pathMatch: 'full' },
  { path: 'news', loadChildren: './news/news.module#NewsPageModule' },
  { path: 'news-details', loadChildren: './news-details/news-details.module#NewsDetailsPageModule' },
  { path: 'article-history', loadChildren: './article-history/article-history.module#ArticleHistoryPageModule' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
