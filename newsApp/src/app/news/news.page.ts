import { Component, OnInit} from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { NewsService } from '../news.service';
// import { NewsDetailsPage } from '../news-details/news-details.page';

@Component({
  selector: 'app-news',
  templateUrl: './news.page.html',
  styleUrls: ['./news.page.scss'],
})
export class NewsPage implements OnInit {

  data: Observable<any>;
  articles = [];

  isArticleHistory: Boolean;
  
  url: String = 'top-headlines?country=us';

  constructor(
    public router: Router,
    private newsService: NewsService,
    // private newsDetailsPage: NewsDetailsPage
  ) {}
  
  ngOnInit(): void {
    this.newsService.getData(this.url).subscribe(data => {
      console.log(data);
      this.articles = data['articles'];
    });

    this.newsService.loadHistory();
    this.isArticleHistory = this.newsService.isHistory;
  }
  
  showArticleDetails(article) {
    this.newsService.currentArticle = article;
    this.router.navigate(['/news-details']);
  }

  pageRefresh(event) {
    console.log("Refreshing");  

    setTimeout(() => {
      console.log('Refresh operation has ended');
      this.ngOnInit();
      event.target.complete();
    }, 2000);
  }

  openArticleHistory() {
    this.router.navigate(['/article-history']);
  }

}
