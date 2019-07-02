import { Component, OnInit } from '@angular/core';
import { NewsPage } from '../news/news.page';

@Component({
  selector: 'app-news-details',
  templateUrl: './news-details.page.html',
  styleUrls: ['./news-details.page.scss'],
})
export class NewsDetailsPage implements OnInit {

  articleDetails: any;

  constructor(
    public newsPage: NewsPage
  ) {}

  ngOnInit() {
    this.articleDetails = this.newsPage.currentArticle;
  }

}
