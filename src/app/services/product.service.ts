import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Response } from '../core/utils/response';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private baseUrl: string = 'http://localhost:8000/api';

  constructor(private http: HttpClient) { }

  getProducts(): Observable<Response> {
    return this.http.get<Response>(`${this.baseUrl}/products`, { headers: this.getHeaders() });
  }

  saveProduct(product: Product): Observable<Response> {
    return this.http.post<Response>(`${this.baseUrl}/products`, product, { headers: this.getHeaders() });
  }

  getProduct(id: number): Observable<Response> {
    return this.http.get<Response>(`${this.baseUrl}/products/${id}`, { headers: this.getHeaders() });
  }

  updateProduct(product: Product, id: number): Observable<Response> {
    return this.http.put<Response>(`${this.baseUrl}/products/${id}`, product, { headers: this.getHeaders() });
  }

  deleteProduct(id: number): Observable<Response> {
    return this.http.delete<Response>(`${this.baseUrl}/products/${id}`, { headers: this.getHeaders() });
  }

  searchProducts(critery: string, value: string): Observable<Response> {
    return this.http.get<Response>(`${this.baseUrl}/products/${critery}/${value}/search`, { headers: this.getHeaders() });
  }

  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    });
  }
}
