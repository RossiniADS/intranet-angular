import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CardapioResponse } from '../../response/cardapioResponse';

@Injectable({
  providedIn: 'root'
})
export class CardapioService {
  private apiUrl = 'https://localhost:7227/api/cardapios';

  constructor(private http: HttpClient) { }

  getAll(): Observable<CardapioResponse[]> {
    return this.http.get<CardapioResponse[]>(this.apiUrl);
  }

  getById(id: number): Observable<CardapioResponse> {
    return this.http.get<CardapioResponse>(`${this.apiUrl}/${id}`);
  }

  add(cardapio: any): Observable<CardapioResponse> {
    return this.http.post<CardapioResponse>(this.apiUrl, cardapio);
  }

  update(id: number, cardapio: any): Observable<CardapioResponse> {
    return this.http.put<CardapioResponse>(`${this.apiUrl}/${id}`, cardapio);
  }

  delete(id: number): Observable<CardapioResponse> {
    return this.http.delete<CardapioResponse>(`${this.apiUrl}/${id}`);
  }
}
