import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductFormService {
  baseURL = 'http://localhost:4200/api/';

  constructor(
    private http: HttpClient
  ) { }

  addProduct = (details: any) => {
    const url = `${this.baseURL}products/create`;
    return this.http.post(url, { "details": details });
  }

  editProduct = (details: any) => {
    window.alert("editing");
    const url = `${this.baseURL}products/update`;
    return this.http.put(url, { "details": details });
  }
}
