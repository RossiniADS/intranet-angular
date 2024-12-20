import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PaginaResponse } from '../../response/paginaResponse';

@Injectable({
  providedIn: 'root'
})
export class PaginaService {
  private baseUrl = 'https://localhost:7227/api/paginas';

  constructor(private http: HttpClient) { }

  getPaginas(): Observable<PaginaResponse[]> {
    return this.http.get<PaginaResponse[]>(this.baseUrl);
  }

  createPagina(pagina: any): Observable<PaginaResponse> {
    return this.http.post<PaginaResponse>(this.baseUrl, pagina);
  }

  updatePagina(id: number, pagina: any): Observable<PaginaResponse> {
    return this.http.put<PaginaResponse>(`${this.baseUrl}/${id}`, pagina);
  }

  deletePagina(id: number): Observable<PaginaResponse> {
    return this.http.delete<PaginaResponse>(`${this.baseUrl}/${id}`);
  }
}
