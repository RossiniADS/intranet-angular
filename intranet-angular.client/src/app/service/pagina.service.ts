import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PaginaResponse } from '../../response/paginaResponse';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PaginaService {
  private apiUrl = `${environment.apiUrl}/paginas`;

  constructor(private http: HttpClient) { }

  getPaginas(): Observable<PaginaResponse[]> {
    return this.http.get<PaginaResponse[]>(this.apiUrl);
  }

  createPagina(pagina: any): Observable<PaginaResponse> {
    return this.http.post<PaginaResponse>(this.apiUrl, pagina);
  }

  updatePagina(id: number, pagina: any): Observable<PaginaResponse> {
    return this.http.put<PaginaResponse>(`${this.apiUrl}/${id}`, pagina);
  }

  deletePagina(id: number): Observable<PaginaResponse> {
    return this.http.delete<PaginaResponse>(`${this.apiUrl}/${id}`);
  }
}
