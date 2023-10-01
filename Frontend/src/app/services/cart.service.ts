import { HttpClient } from '@angular/common/http';
import { Product } from '../products';
import { Injectable } from '@angular/core';
import { promise } from 'protractor';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  baseURL = 'http://localhost:4200/api/';
  cartProducts: Product[] = [];
  productQuantity: Map<number, number> = new Map();
  cartProductsPrice: number = 0;
  constructor(
    private http: HttpClient
  ) { }

  addToCart(product: Product, quantity: number) {
    this.updateCartProducts(product);
    this.productQuantity.set(product.id, (this.productQuantity.get(product.id) || 0) + quantity);
    this.updateCartProductsPrice(product.price, quantity, true);
  }

  updateCartProducts(product: Product) {
    if (!this.productQuantity.has(product.id)) {
      this.cartProducts.push(product);
    }
  }

  deleteCartProduct(product: Product) {
    this.productQuantity.delete(product.id);
    const index = this.cartProducts.indexOf(product);
    this.cartProducts.splice(index, 1);
  }

  clearCart() {
    this.productQuantity.clear();
    this.cartProducts = []
  }

  updateCartProductsPrice(price: number, quantity: number, add: boolean) {
    this.cartProductsPrice += price * quantity * (add ? 1 : -1);
    console.log(this.cartProductsPrice);
  }

  getShippingPrices() {
    return this.http.get<{ type: string, price: number }[]>('/assets/shipping.json');
  }

  getShippingPrice(): number {
    return 10;
  }

  createOrder = (orderDetails: any) => {
    const url = `${this.baseURL}orders/create`;
    return this.http.post(url, orderDetails);
  }

  // getters
  getProductQuantity() {
    return this.productQuantity;
  }

  getCartProducts() {
    return this.cartProducts;
  }

  getCartProdcutsPrice() {
    return this.cartProductsPrice;
  }
}
