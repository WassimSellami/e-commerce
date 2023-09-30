import { HttpClient } from '@angular/common/http';
import { Product } from '../products';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  items: Product[] = [];
  baseURL = 'http://localhost:4200/api/';

  constructor(
    private http: HttpClient
  ) { }

  addToCart(product: Product) {
    this.items.push(product);
    // window.alert(`${product.name} added to cart`);
  }

  getItems() {
    return this.items;
  }

  clearCart() {
    this.items = [];
  }

  getShippingPrices() {
    return this.http.get<{ type: string, price: number }[]>('/assets/shipping.json');
  }

  createOrder = (orderDetails: any) => {
    const url = `${this.baseURL}orders/create`;
    return this.http.post(url, orderDetails);
  }
}
