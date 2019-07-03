import { Component, OnInit } from '@angular/core';
import { NewsService } from '../news.service';
// import { NewsPage } from '../news/news.page';

@Component({
  selector: 'app-news-details',
  templateUrl: './news-details.page.html',
  styleUrls: ['./news-details.page.scss'],
})
export class NewsDetailsPage implements OnInit {

  articleDetails: any;

  historyArticlesObj = { articles: [] };

  constructor(
    private newsService: NewsService
  ) {}

  ngOnInit() {
    this.articleDetails = this.newsService.currentArticle;
    console.log(this.newsService.currentArticle); 
    this.addHistory();   
  }
  
  addHistory() {
    
    if(!localStorage.getItem("history")) {
      this.historyArticlesObj.articles.push(this.articleDetails);
      localStorage.setItem('history', JSON.stringify(this.historyArticlesObj));
    } else {
      var retrievedObject = localStorage.getItem("history");
      var stored = JSON.parse(retrievedObject);
      stored.articles.push(this.articleDetails);    
      localStorage.setItem("history", JSON.stringify(stored));
    }
  }

}
