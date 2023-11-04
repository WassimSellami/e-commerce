import { Injectable } from '@angular/core';
import { Product } from '../models/products';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductDetailService {
  baseURL = 'http://localhost:4200/api/products/';

  constructor(
    private http: HttpClient
  ) { }

  getProductDetails = (productId: any) => {
    return this.http.get<Product>(`${this.baseURL}${productId}`);
  }

  getProducts = () => {
    return this.http.get<Product[]>(this.baseURL);
  }
}
