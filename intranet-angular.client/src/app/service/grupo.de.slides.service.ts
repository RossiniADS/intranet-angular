import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GroupDeSlideResponse } from '../../response/groupDeSlideResponse'
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GrupoDeSlidesService {
  private apiUrl = `${environment.apiUrl}/grupoDeSlides`;

  constructor(private http: HttpClient) { }

  getAll(): Observable<GroupDeSlideResponse[]> {
    return this.http.get<GroupDeSlideResponse[]>(this.apiUrl);
  }

  getByPageId(pageId: number): Observable<GroupDeSlideResponse[]> {
    return this.http.get<GroupDeSlideResponse[]>(`${this.apiUrl}/page/${pageId}`);
  }

  createSlides(grupoDeSlides: FormData): Observable<GroupDeSlideResponse> {
    return this.http.post<GroupDeSlideResponse>(this.apiUrl, grupoDeSlides);
  }

  updateSlide(id: number, grupoDeSlides: FormData): Observable<GroupDeSlideResponse> {
    return this.http.put<GroupDeSlideResponse>(`${this.apiUrl}/${id}`, grupoDeSlides);
  }

  deleteGrupoDeSlide(id: number): Observable<GroupDeSlideResponse> {
    return this.http.delete<GroupDeSlideResponse>(`${this.apiUrl}/${id}`);
  }
}
