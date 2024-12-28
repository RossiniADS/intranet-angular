import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FuncionarioResponse } from '../../response/funcionaResponse';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FuncionarioService {
  private apiUrl = `${environment.apiUrl}/funcionarios`;

  constructor(private http: HttpClient) { }

  getFuncionarios(): Observable<FuncionarioResponse[]> {
    return this.http.get<FuncionarioResponse[]>(`${this.apiUrl}`);
  }

  getById(id: number): Observable<FuncionarioResponse> {
    return this.http.get<FuncionarioResponse>(`${this.apiUrl}/${id}`);
  }

  createFuncionario(funcionario: any): Observable<FuncionarioResponse> {
    return this.http.post<FuncionarioResponse>(`${this.apiUrl}`, funcionario);
  }

  updateFuncionario(id: number, funcionario: any): Observable<FuncionarioResponse> {
    return this.http.put<FuncionarioResponse>(`${this.apiUrl}/${id}`, funcionario);
  }

  deleteFuncionario(id: number): Observable<FuncionarioResponse> {
    return this.http.delete<FuncionarioResponse>(`${this.apiUrl}/${id}`);
  }
}
