import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { NoticiaResponse } from '../../response/noticiaResponse';
import { BaseResponse } from '../../response/baseResponse';
import { environment } from '../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class NoticiaService {
  private apiUrl = `${environment.apiUrl}/noticias`;

  constructor(private http: HttpClient) { }

  getNoticias(): Observable<NoticiaResponse[]> {
    return this.http.get<NoticiaResponse[]>(this.apiUrl);
  }

  getNoticia(id: number): Observable<NoticiaResponse> {
    return this.http.get<NoticiaResponse>(`${this.apiUrl}/${id}`);
  }

  getNoticiasPaginadas(page: number, pageSize: number): Observable<BaseResponse<NoticiaResponse[]>> {
    return this.http.get<BaseResponse<NoticiaResponse[]>>(`${this.apiUrl}/noticias-pagination?page=${page}&pageSize=${pageSize}`);
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
