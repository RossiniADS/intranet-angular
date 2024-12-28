import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EventoResponse } from '../../response/eventoResponse';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EventoService {
  private apiUrl = `${environment.apiUrl}/eventos`;

  constructor(private http: HttpClient) { }

  getAll(): Observable<EventoResponse[]> {
    return this.http.get<EventoResponse[]>(this.apiUrl);
  }

  getById(id: number): Observable<EventoResponse> {
    return this.http.get<EventoResponse>(`${this.apiUrl}/${id}`);
  }

  add(evento: any): Observable<EventoResponse> {
    return this.http.post<EventoResponse>(this.apiUrl, evento);
  }

  update(id: number, evento: any): Observable<EventoResponse> {
    return this.http.put<EventoResponse>(`${this.apiUrl}/${id}`, evento);
  }

  delete(id: number): Observable<EventoResponse> {
    return this.http.delete<EventoResponse>(`${this.apiUrl}/${id}`);
  }
}
