import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { UsuarioResponse } from '../../response/usuarioResponse';
import { jwtDecode } from "jwt-decode";
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private apiUrl = `${environment.apiUrl}/usuario`;

  constructor(private http: HttpClient, private router: Router) { }

  getUsuarios(): Observable<UsuarioResponse[]> {
    return this.http.get<UsuarioResponse[]>(this.apiUrl);
  }

  getUsuarioById(id: number): Observable<UsuarioResponse> {
    return this.http.get<UsuarioResponse>(`${this.apiUrl}/${id}`);
  }

  createUsuario(usuario: any): Observable<UsuarioResponse> {
    return this.http.post<UsuarioResponse>(this.apiUrl, usuario);
  }

  updateUsuario(id: number, usuario: any): Observable<UsuarioResponse> {
    return this.http.put<UsuarioResponse>(`${this.apiUrl}/${id}`, usuario);
  }

  deleteUsuario(id: number): Observable<UsuarioResponse> {
    return this.http.delete<UsuarioResponse>(`${this.apiUrl}/${id}`);
  }

  login(login: string, senha: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, { login, senha });
  }

  saveToken(token: string): void {
    localStorage.setItem('token', token);
    // Decodificar o token para extrair o ID e o nome do usuário
    const decodedToken: any = jwtDecode(token);
    localStorage.setItem('userId', decodedToken.nameid); // ID do usuário
    localStorage.setItem('userName', decodedToken.Nome); // Nome do usuário
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getUserId(): string | null {
    return localStorage.getItem('userId');
  }

  getUserName(): string | null {
    return localStorage.getItem('userName');
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  logout(): void {
    localStorage.removeItem('token');
  }
}
