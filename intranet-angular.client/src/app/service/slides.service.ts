import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SlideService {
  private apiUrl = `${environment.apiUrl}/slides`;

  constructor(private http: HttpClient) { }

  getAll(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  createSlides(slide: FormData): Observable<any> {
    return this.http.post<any>(this.apiUrl, slide);
  }

  updateSlide(id: number, slide: FormData): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, slide);
  }

  deleteSlide(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}
