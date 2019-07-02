import { Component, OnInit} from '@angular/core';
import { NavController, NavParams } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-news',
  templateUrl: './news.page.html',
  styleUrls: ['./news.page.scss'],
})
export class NewsPage implements OnInit {

  data: Observable<any>;
  articles = [];
  currentArticle: any;

  isClicked: Boolean = false;
  
  url: String = 'https://newsapi.org/v2/top-headlines?country=us&apiKey=';
  apiKey: String = '2b09227b382c4ce5ac606b12f1b6543a';

  constructor(
    private http: HttpClient,
    public router: Router
  ) {}
  
  ngOnInit(): void {
    this.getArticles();
  }
  
  getArticles() {
    this.data = this.http.get(`${this.url}${this.apiKey}`);
    this.data.subscribe(data => {
      console.log(data);
      this.articles = data['articles'];
    });
  }

  showArticleDetails(article) {
    this.currentArticle = article;
    this.router.navigate(['news-details']);
  }

}
