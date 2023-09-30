import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {
  items = this.cartService.getItems();
  itemsPrice = 0
  shippingPrice = 0
  orderTotalPrice = 0
  checkoutForm = this.formBuilder.group({
    name: '',
    address: ''
  });

  constructor(
    private cartService: CartService,
    private formBuilder: FormBuilder,
  ) { }

  getItemsPrice(): void {
    this.itemsPrice = 0;
    this.items.forEach((item) => {
      this.itemsPrice += item.price;
    });
  }

  getShippingPrice(): void {
    this.shippingPrice = 10
  }

  getOrderTotalPrice(): number {
    this.getItemsPrice();
    this.getShippingPrice();
    return this.orderTotalPrice = this.itemsPrice + this.shippingPrice;
  }

  onSubmit(): void {
    const productIds = this.cartService.getItems().map(product => product.id);
    const orderDetails =  {
      "orderDetails": {
        "price": this.orderTotalPrice,
        "name": this.checkoutForm.value.name,
        "address": this.checkoutForm.value.address,
        "productIds": productIds
      }
    }
    this.cartService.createOrder(orderDetails).subscribe(
      (response) => {
        console.log(response);
        window.alert('Successful Operation');
        this.cartService.clearCart();
        this.checkoutForm.reset();
        this.items = this.cartService.getItems();
      },
      (error) => {
        console.error('Internal Server Error: Order Not Created', error);
        window.alert('Something went wrong please try again');
      }
    );
  }
}
