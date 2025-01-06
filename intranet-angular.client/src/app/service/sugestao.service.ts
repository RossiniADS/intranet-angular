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

  getAll(): Observable<SugestaoResponse[]> {
    return this.http.get<SugestaoResponse[]>(this.apiUrl);
  }

  getById(id: number): Observable<SugestaoResponse> {
    return this.http.get<SugestaoResponse>(`${this.apiUrl}/${id}`);
  }

  add(cardapio: any): Observable<SugestaoResponse> {
    return this.http.post<SugestaoResponse>(this.apiUrl, cardapio);
  }

  update(id: number, cardapio: any): Observable<SugestaoResponse> {
    return this.http.put<SugestaoResponse>(`${this.apiUrl}/${id}`, cardapio);
  }

  delete(id: number): Observable<SugestaoResponse> {
    return this.http.delete<SugestaoResponse>(`${this.apiUrl}/${id}`);
  }
}
