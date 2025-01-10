import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GrupoDeSlideResponse } from '../../response/grupoDeSlideResponse'
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GrupoDeSlidesService {
  private apiUrl = `${environment.apiUrl}/grupoDeSlides`;

  constructor(private http: HttpClient) { }

  getAll(): Observable<GrupoDeSlideResponse[]> {
    return this.http.get<GrupoDeSlideResponse[]>(this.apiUrl);
  }

  getByPageId(pageId: number): Observable<GrupoDeSlideResponse[]> {
    return this.http.get<GrupoDeSlideResponse[]>(`${this.apiUrl}/page/${pageId}`);
  }

  createSlides(grupoDeSlides: FormData): Observable<GrupoDeSlideResponse> {
    return this.http.post<GrupoDeSlideResponse>(this.apiUrl, grupoDeSlides);
  }

  updateSlide(id: number, grupoDeSlides: FormData): Observable<GrupoDeSlideResponse> {
    return this.http.put<GrupoDeSlideResponse>(`${this.apiUrl}/${id}`, grupoDeSlides);
  }

  deleteGrupoDeSlide(id: number): Observable<GrupoDeSlideResponse> {
    return this.http.delete<GrupoDeSlideResponse>(`${this.apiUrl}/${id}`);
  }
}
