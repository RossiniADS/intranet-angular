import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GroupDeSlideResponse } from '../../response/groupDeSlideResponse'

@Injectable({
  providedIn: 'root'
})
export class GrupoDeSlidesService {
  private baseUrl = 'https://localhost:7227/api/grupoDeSlides';

  constructor(private http: HttpClient) { }

  getAll(): Observable<GroupDeSlideResponse[]> {
    return this.http.get<GroupDeSlideResponse[]>(this.baseUrl);
  }

  getByPageId(pageId: number): Observable<GroupDeSlideResponse[]> {
    return this.http.get<GroupDeSlideResponse[]>(`${this.baseUrl}/page/${pageId}`);
  }

  createSlides(grupoDeSlides: FormData): Observable<GroupDeSlideResponse> {
    return this.http.post<GroupDeSlideResponse>(this.baseUrl, grupoDeSlides);
  }

  updateSlide(id: number, grupoDeSlides: FormData): Observable<GroupDeSlideResponse> {
    return this.http.put<GroupDeSlideResponse>(`${this.baseUrl}/${id}`, grupoDeSlides);
  }

  deleteGrupoDeSlide(id: number): Observable<GroupDeSlideResponse> {
    return this.http.delete<GroupDeSlideResponse>(`${this.baseUrl}/${id}`);
  }
}
