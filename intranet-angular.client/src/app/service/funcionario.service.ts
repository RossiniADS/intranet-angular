import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FuncionarioResponse } from '../../response/funcionaResponse';

@Injectable({
  providedIn: 'root'
})
export class FuncionarioService {
  private baseUrl = 'https://localhost:7227/api/funcionarios';

  constructor(private http: HttpClient) { }

  getFuncionarios(): Observable<FuncionarioResponse[]> {
    return this.http.get<FuncionarioResponse[]>(`${this.baseUrl}`);
  }

  createFuncionario(funcionario: any): Observable<FuncionarioResponse> {
    return this.http.post<FuncionarioResponse>(`${this.baseUrl}`, funcionario);
  }

  updateFuncionario(id: number, funcionario: any): Observable<FuncionarioResponse> {
    return this.http.put<FuncionarioResponse>(`${this.baseUrl}/${id}`, funcionario);
  }

  deleteFuncionario(id: number): Observable<FuncionarioResponse> {
    return this.http.delete<FuncionarioResponse>(`${this.baseUrl}/${id}`);
  }
}
