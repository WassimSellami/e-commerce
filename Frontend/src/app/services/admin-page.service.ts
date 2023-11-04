import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AdminPageService {
  baseURL = 'http://localhost:4200/api/';
  constructor(
    private http: HttpClient
  ) { }

  deleteProduct(id: number) {
    const url = `${this.baseURL}products/${id}`
    return this.http.delete(url);
  }
} 
