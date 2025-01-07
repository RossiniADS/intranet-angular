import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { SugestaoResponse } from '../../response/sugestaoResponse';

@Injectable({
  providedIn: 'root'
})
export class SugestaoService {
  private apiUrl = `${environment.apiUrl}/sugestoes`;

  constructor(private http: HttpClient) { }

  getById(id: number): Observable<SugestaoResponse> {
    return this.http.get<SugestaoResponse>(`${this.apiUrl}/${id}`);
  }

  add(sugestao: any): Observable<SugestaoResponse> {
    return this.http.post<SugestaoResponse>(this.apiUrl, sugestao);
  }

  update(id: number, sugestao: any): Observable<SugestaoResponse> {
    return this.http.put<SugestaoResponse>(`${this.apiUrl}/${id}`, sugestao);
  }

  setLida(id: number, lida: boolean): Observable<SugestaoResponse> {
    return this.http.put<SugestaoResponse>(`${this.apiUrl}/setLida/${id}/${lida}`, {});
  }

  delete(id: number): Observable<SugestaoResponse> {
    return this.http.delete<SugestaoResponse>(`${this.apiUrl}/${id}`);
  }

  getAll(filtro: string | null): Observable<SugestaoResponse[]> {
    const params = filtro ? `?filter=${encodeURIComponent(filtro)}` : '';
    return this.http.get<SugestaoResponse[]>(`${this.apiUrl}${params}`);
  }
}
