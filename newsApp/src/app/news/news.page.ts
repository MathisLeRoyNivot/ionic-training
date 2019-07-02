import { Component, OnInit} from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { NewsService } from '../news.service';

@Component({
  selector: 'app-news',
  templateUrl: './news.page.html',
  styleUrls: ['./news.page.scss'],
})
export class NewsPage implements OnInit {

  data: Observable<any>;
  articles = [];

  isClicked: Boolean = false;
  
  url: String = 'top-headlines?country=us';

  constructor(
    public router: Router,
    private newsService: NewsService
  ) {}
  
  ngOnInit(): void {
    this.newsService.getData(this.url).subscribe(data => {
      console.log(data);
      this.articles = data['articles'];
    });
  }
  
  showArticleDetails(article) {
    this.newsService.currentArticle = article;
    this.router.navigate(['/news-details']);
  }

}
