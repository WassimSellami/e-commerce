import { Component, HostListener, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { CartService } from '../../services/cart.service';
import { Product, Item } from '../../models/products';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  shippingPrice = 0
  checkoutForm = this.formBuilder.group({
    name: '',
    address: ''
  });

  itemsPrice: number = 0;
  totalPrice: number = 0;
  items: Map<number, Item> = new Map();

  constructor(
    private cartService: CartService,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.cartService.retrieve();
    this.updateVariables();
  }

  updateVariables() {
    this.items = this.cartService.items
    this.itemsPrice = this.cartService.itemsPrice
    this.totalPrice = this.cartService.totalPrice
    this.shippingPrice = this.cartService.shippingPrice
  }

  onUpdateItemsQuantity() {
    this.updateServiceVariables();
    this.cartService.save();
    this.updateVariables();
  }
  updateServiceVariables(): void {
    this.cartService.items = this.items;
    this.cartService.updatePrice();
  }

  onSubmit(): void {
    const itemQuantityArray = Array.from(this.items, ([id, item]) => ({ id, quantity: item.quantity }));
    const orderDetails = {
      "orderDetails": {
        "price": this.totalPrice,
        "name": this.checkoutForm.value.name,
        "address": this.checkoutForm.value.address,
        "productsData": itemQuantityArray
      }
    }
    this.updateStockQuantities();

    this.cartService.createOrder(orderDetails).subscribe(
      (response) => {
        window.alert('Successful Operation');
        this.checkoutForm.reset();
        this.cartService.clearCart();
        this.updateVariables();
      },
      (error) => {
        console.error('Internal Server Error: Order Not Created', error);
        window.alert('Something went wrong please try again');
      }
    );
  }

  updateStockQuantities(): void {
    const leftQuantitits = Array.from(this.items, ([id, item]) => ({ id, newQuantity: this.items.get(id)?.product.quantityInStock! - item.quantity }));
    this.cartService.updateQuantityInStock(leftQuantitits).subscribe(
      (response) => {
      },
      (error) => {
        console.error('Internal Server Error: Order Not Created', error);
      }
    );
  }

  onDelteCartProduct(productId: number): void {
    this.cartService.deleteItem(productId);
    this.updateVariables();
  }
}
