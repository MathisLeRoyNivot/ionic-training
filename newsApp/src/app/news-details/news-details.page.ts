import { Component, OnInit } from '@angular/core';
import { NewsService } from '../news.service';

@Component({
  selector: 'app-news-details',
  templateUrl: './news-details.page.html',
  styleUrls: ['./news-details.page.scss'],
})
export class NewsDetailsPage implements OnInit {

  articleDetails: any;

  constructor(
    private newsService: NewsService
  ) {}

  ngOnInit() {
    this.articleDetails = this.newsService.currentArticle;
    console.log(this.newsService.currentArticle);
  }

}
