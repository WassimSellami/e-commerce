import { HttpClient } from '@angular/common/http';
import { Product, Item } from '../products';
import { Injectable } from '@angular/core';
import { promise } from 'protractor';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  baseURL = 'http://localhost:4200/api/';

  itemsPrice: number = 0;
  totalPrice: number = 0;
  items: Map<number, Item> = new Map();
  shippingPrice: number = 10;


  constructor(
    private http: HttpClient
  ) { }
  save(): void {
    // Save data to local storage
    localStorage.setItem('items', JSON.stringify(Array.from(this.items.entries())));
    localStorage.setItem('itemsPrice', this.itemsPrice.toString());
    localStorage.setItem('totalPrice', this.totalPrice.toString());
  }
  retrieve(): void {
    // Retrieve data from local storage on component initialization
    const storedItems = localStorage.getItem('items');
    const storedTotalPrice = localStorage.getItem('totalPrice');
    const storedItemsPrice = localStorage.getItem('itemsPrice');

    if (storedItems) {
      this.items = new Map(JSON.parse(storedItems));
    }
    if (storedTotalPrice) {
      this.totalPrice = parseFloat(storedTotalPrice);
    }
    if (storedItemsPrice) {
      this.itemsPrice = parseFloat(storedItemsPrice);
    }
  }

  updateItemsPrice() {
    this.itemsPrice = 0;
    for (let item of this.items.values()) {
      this.itemsPrice += item.product.price * item.quantity;
    }
  }

  updatePrice() {
    this.updateItemsPrice()
    this.totalPrice = this.itemsPrice + this.shippingPrice;
  }

  deleteItem(id: number) {
    this.items.delete(id);
    this.updatePrice();
    this.save();
  }

  updateItem(product: Product, qte: number) {
    if (this.items.has(product.id)) {
      this.items.get(product.id)!.quantity += qte;
    }
    else {
      let item: Item = { product: product, quantity: qte };
      this.items.set(product.id, item);
    }
    this.updatePrice();
    this.save();
  }

  clearCart() {
    this.items.clear();
    this.itemsPrice = 0;
    this.totalPrice = 0;
    this.save();
  }

  getShippingPrices() {
    return this.http.get<{ type: string, price: number }[]>('/assets/shipping.json');
  }

  createOrder = (orderDetails: any) => {
    const url = `${this.baseURL}orders/create`;
    return this.http.post(url, orderDetails);
  }

  updateQuantityInStock = (leftQuantitits: { id: number; newQuantity: number; }[]) => {
    const url = `${this.baseURL}products/updateQuantity`;
    return this.http.post(url, { "leftQuantitits": leftQuantitits });
  }
}
