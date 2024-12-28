import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CategoriaResponse } from '../../response/categoriaResponse';
import { environment } from '../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {
  private apiUrl = `${environment.apiUrl}/categorias`;

  constructor(private http: HttpClient) { }

  getAll(): Observable<CategoriaResponse[]> {
    return this.http.get<CategoriaResponse[]>(this.apiUrl);
  }

  getQtdNoticiaPorCategoria(): Observable<CategoriaResponse[]> {
    return this.http.get<CategoriaResponse[]>(`${this.apiUrl}/qtd-noticia`);
  }

  add(categoria: any): Observable<CategoriaResponse> {
    return this.http.post<CategoriaResponse>(this.apiUrl, categoria);
  }

  update(id: number, categoria: any): Observable<CategoriaResponse> {
    return this.http.put<CategoriaResponse>(`${this.apiUrl}/${id}`, categoria);
  }

  delete(id: number): Observable<CategoriaResponse> {
    return this.http.delete<CategoriaResponse>(`${this.apiUrl}/${id}`);
  }
}
