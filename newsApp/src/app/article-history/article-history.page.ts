import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-article-history',
  templateUrl: './article-history.page.html',
  styleUrls: ['./article-history.page.scss'],
})
export class ArticleHistoryPage implements OnInit {

  articlesHistory: any = [];

  constructor() { }

  ngOnInit() {
    this.articlesHistory = JSON.parse(localStorage.getItem('history'));
  }

}
