import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  private apiUrl = 'https://api.example.com'; // Substitua pelo URL da sua API

  constructor(private http: HttpClient) { }

  getSlides(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/slides`);
  }

  getTrendingSlides(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/trending-slides`);
  }

  getTrendingCards(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/trending-cards`);
  }

  getTabs(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/tabs`);
  }

  getMainNews(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/main-news`);
  }

  getRightNews(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/right-news`);
  }

  getSocialMedia(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/social-media`);
  }

  getMostRecentNews(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/most-recent-news`);
  }

  getPopularNews(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/popular-news`);
  }

  getWeeklyNews(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/weekly-news`);
  }

  getVideos(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/videos`);
  }
}
