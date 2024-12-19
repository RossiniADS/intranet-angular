import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Noticia {
  id: number;
  titulo: string;
  conteudo: string;
  midiaUrl: string;
  autorId?: number;
  categoriaIds: number[];
  dataPublicacao: Date;
}

@Injectable({
  providedIn: 'root'
})
export class NoticiaService {
  private apiUrl = 'https://localhost:7227/api/noticias';

  constructor(private http: HttpClient) { }

  getNoticias(): Observable<Noticia[]> {
    return this.http.get<Noticia[]>(this.apiUrl);
  }

  getNoticia(id: number): Observable<Noticia> {
    return this.http.get<Noticia>(`${this.apiUrl}/${id}`);
  }

  createNoticia(formData: FormData): Observable<Noticia> {
    return this.http.post<Noticia>(this.apiUrl, formData);
  }

  updateNoticia(id: number, formData: FormData): Observable<Noticia> {
    return this.http.put<Noticia>(`${this.apiUrl}/${id}`, formData);
  }

  deleteNoticia(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
