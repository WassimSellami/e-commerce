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
  save(): void {
    // Save data to local storage
    localStorage.setItem('productQuantity', JSON.stringify(Array.from(this.productQuantity.entries())));
    localStorage.setItem('cartProducts', JSON.stringify(this.cartProducts));
    localStorage.setItem('cartProductsPrice', this.cartProductsPrice.toString());
    // localStorage.setItem('orderTotalPrice', this.orderTotalPrice.toString());
  }
    retrieve(): void {
    // Retrieve data from local storage on component initialization
    const storedProductQuantity = localStorage.getItem('productQuantity');
    const storedCartProducts = localStorage.getItem('cartProducts');
    const storedCartProductsPrice = localStorage.getItem('cartProductsPrice');

    if (storedProductQuantity) {
      this.productQuantity = new Map(JSON.parse(storedProductQuantity));
    }
    if (storedCartProducts) {
      this.cartProducts = JSON.parse(storedCartProducts);
    }
    if (storedCartProductsPrice) {
      this.cartProductsPrice = parseFloat(storedCartProductsPrice);
    }
  }

  addToCart(product: Product, quantity: number) {
    this.updateCartProducts(product);
    this.productQuantity.set(product.id, (this.productQuantity.get(product.id) || 0) + quantity);
    this.updateCartProductsPrice(product.price, quantity, true);
    this.save();
  }

  updateCartProducts(product: Product) {
    if (!this.productQuantity.has(product.id)) {
      this.cartProducts.push(product);
    }
    this.save();
  }

  deleteCartProduct(product: Product) {
    this.productQuantity.delete(product.id);
    const index = this.cartProducts.indexOf(product);
    this.cartProducts.splice(index, 1);
    this.save();
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
    this.retrieve();
    return this.productQuantity;
  }

  getCartProducts() {
    return this.cartProducts;
  }

  getCartProdcutsPrice() {
    return this.cartProductsPrice;
  }
}
