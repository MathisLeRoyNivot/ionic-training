import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
const API_URL = environment.apiUrl;
const API_KEY = environment.apiKey;

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  currentArticle: any;

  isHistory: Boolean = false;

  constructor(
    private http: HttpClient) { }

  getData(url) {
    return this.http.get(`${API_URL}/${url}&apiKey=${API_KEY}`);
  }

  loadHistory() {
    if(localStorage.getItem('history')) {
      this.isHistory = true
    } else {
      this.isHistory = false;
    }
  }
}
