import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { NoticiaResponse } from '../../response/noticiaResponse';

@Injectable({
  providedIn: 'root'
})
export class NoticiaService {
  private apiUrl = 'https://localhost:7227/api/noticias';

  constructor(private http: HttpClient) { }

  getNoticias(): Observable<NoticiaResponse[]> {
    return this.http.get<NoticiaResponse[]>(this.apiUrl);
  }

  getNoticia(id: number): Observable<NoticiaResponse> {
    return this.http.get<NoticiaResponse>(`${this.apiUrl}/${id}`);
  }

  createNoticia(formData: FormData): Observable<NoticiaResponse> {
    return this.http.post<NoticiaResponse>(this.apiUrl, formData);
  }

  updateNoticia(id: number, formData: FormData): Observable<NoticiaResponse> {
    return this.http.put<NoticiaResponse>(`${this.apiUrl}/${id}`, formData);
  }

  deleteNoticia(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
