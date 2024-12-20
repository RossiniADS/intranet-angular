import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FuncionarioService {
  private baseUrl = 'https://localhost:7227/api/funcionarios';

  constructor(private http: HttpClient) { }

  getFuncionarios(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}`);
  }

  createFuncionario(funcionario: any): Observable<any> {
    return this.http.post(`${this.baseUrl}`, funcionario);
  }

  updateFuncionario(id: number, funcionario: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, funcionario);
  }

  deleteFuncionario(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
