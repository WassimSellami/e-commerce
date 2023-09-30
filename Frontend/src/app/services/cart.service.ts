import { HttpClient } from '@angular/common/http';
import { Product } from '../products';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  baseURL = 'http://localhost:4200/api/';
  productQuantity: Map<Product, number> = new Map();

  constructor(
    private http: HttpClient
  ) { }

  addToCart(product: Product, quantity: number) {
    if (this.productQuantity.has(product)) {
      this.productQuantity.set(product, this.productQuantity.get(product)! + quantity);
    } else {
      this.productQuantity.set(product, quantity);
    }
  }

  getProductsData() {
    return this.productQuantity;
  }

  clearCart() {
    this.productQuantity.clear();
  }

  getShippingPrices() {
    return this.http.get<{ type: string, price: number }[]>('/assets/shipping.json');
  }

  getItemsPrice(): number {
    var price = 0;
    this.productQuantity.forEach((quantity, product) => {
      price += product.price * quantity;
    });
    return price;
  }

  getShippingPrice(): number {
    return 10;
  }

  createOrder = (orderDetails: any) => {
    const url = `${this.baseURL}orders/create`;
    return this.http.post(url, orderDetails);
  }
}
