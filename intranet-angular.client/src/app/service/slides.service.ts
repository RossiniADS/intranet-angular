import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SlideService {
  private baseUrl = 'https://localhost:7227/api/slides';

  constructor(private http: HttpClient) { }

  getAll(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl);
  }

  createSlides(slide: any): Observable<any> {
    return this.http.post<any>(this.baseUrl, slide);
  }

  updateSlide(id: number, slide: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/${id}`, slide);
  }

  deleteSlide(id: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/${id}`);
  }
}
