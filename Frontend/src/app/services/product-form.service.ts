import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductFormService {
  baseURL = 'http://localhost:4200/api/products/';

  constructor(
    private http: HttpClient
  ) { }

  addProduct = (details: any) => {
    return this.http.post(this.baseURL, { "details": details });
  }

  editProduct = (id: number, details: any) => {
    const url = `${this.baseURL}${id}`
    return this.http.put(url, { "details": details });
  }
}
