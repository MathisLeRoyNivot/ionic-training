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
    private newsService: NewsService,
    // private newsPage: NewsPage
  ) {}

  ngOnInit() {
    this.articleDetails = this.newsService.currentArticle;
    console.log(this.newsService.currentArticle); 
    this.addHistory();   
  }
  
  // loadHistory() {
  //   if(localStorage.getItem('history') != '') {
  //     console.log("True");
  //     // localStorage.setItem('history', JSON.stringify(this.historyArticlesObj));
  //   } else {
  //     console.log("false");
  //   }
  // }
  
  addHistory() {
    this.historyArticlesObj.articles.push(this.articleDetails);
    localStorage.setItem('history', JSON.stringify(this.historyArticlesObj));
  }


}
