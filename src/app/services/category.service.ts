import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Response } from '../core/utils/response';
import { Category } from '../models/category.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private baseUrl: string = 'http://localhost:8000/api';

  constructor(private http: HttpClient) { }

  getCategories(): Observable<Response> {
    return this.http.get<Response>(`${this.baseUrl}/categories`, { headers: this.getHeaders() });
  }

  saveCategory(category: Category): Observable<Response> {
    return this.http.post<Response>(`${this.baseUrl}/categories`, category, { headers: this.getHeaders() });
  }

  getCategory(id: number): Observable<Response> {
    return this.http.get<Response>(`${this.baseUrl}/categories/${id}`, { headers: this.getHeaders() });
  }

  updateCategory(category: Category, id: number): Observable<Response> {
    return this.http.put<Response>(`${this.baseUrl}/categories/${id}`, category, { headers: this.getHeaders() });
  }

  deleteCategory(id: number): Observable<Response> {
    return this.http.delete<Response>(`${this.baseUrl}/categories/${id}`, { headers: this.getHeaders() });
  }

  searchCategories(critery: string, value: string): Observable<Response> {
    return this.http.get<Response>(`${this.baseUrl}/categories/${critery}/${value}/search`, { headers: this.getHeaders() });
  }

  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    });
  }
}
