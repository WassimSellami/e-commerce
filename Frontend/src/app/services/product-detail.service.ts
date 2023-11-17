import { Injectable } from '@angular/core';
import { Product } from '../models/products';
import { HttpClient } from '@angular/common/http';
import { CartComponent } from '../pages/cart/cart.component';

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

  getProducts = (category: String = "All") => {
    const url = `${this.baseURL}?category=${category}`;
    return this.http.get<Product[]>(url);
  }

  getCategories = () => {
    return this.http.get<String[]>(`${this.baseURL}categories`)
  }
}
