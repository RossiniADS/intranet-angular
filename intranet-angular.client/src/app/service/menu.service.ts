import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.dev';
import { MenuItemResponse } from '../../response/menuItemResponse';

@Injectable({
  providedIn: 'root',
})
export class MenuService {
  private apiUrl = `${environment.apiUrl}/menuitems`;

  constructor(private http: HttpClient) { }

  getAll(): Observable<MenuItemResponse[]> {
    return this.http.get<MenuItemResponse[]>(this.apiUrl);
  }

  add(menuItem: any): Observable<MenuItemResponse> {
    return this.http.post<MenuItemResponse>(this.apiUrl, menuItem);
  }

  update(id: number, menuItem: any): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, menuItem);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
