import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GrupoDeSlidesService {
  private baseUrl = 'https://localhost:7227/api/grupoDeSlides';

  constructor(private http: HttpClient) { }

  getAll(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl);
  }

  createSlides(grupoDeSlides: any): Observable<any> {
    return this.http.post<any>(this.baseUrl, grupoDeSlides);
  }

  updateSlide(id: number, grupoDeSlides: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/${id}`, grupoDeSlides);
  }

  deleteSlide(id: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/${id}`);
  }
}
