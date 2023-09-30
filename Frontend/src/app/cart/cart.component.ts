import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {
  productsData = this.cartService.getProductsData();
  items = Array.from(this.productsData.entries()).map(([product, quantity]) => ({ product, quantity }));
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

  getOrderTotalPrice(): number {
    this.itemsPrice = this.cartService.getItemsPrice();
    this.shippingPrice = this.cartService.getShippingPrice();
    return this.orderTotalPrice = this.itemsPrice + this.shippingPrice;
  }

  onSubmit(): void {
    const productsData = Array.from(this.productsData, ([product, quantity]) => ({ id:product.id, quantity }));
    const orderDetails = {
      "orderDetails": {
        "price": this.orderTotalPrice,
        "name": this.checkoutForm.value.name,
        "address": this.checkoutForm.value.address,
        "productsData": productsData
      }
    }
    this.cartService.createOrder(orderDetails).subscribe(
      (response) => {
        console.log(response);
        window.alert('Successful Operation');
        this.cartService.clearCart();
        this.checkoutForm.reset();
        this.items = [];
      },
      (error) => {
        console.error('Internal Server Error: Order Not Created', error);
        window.alert('Something went wrong please try again');
      }
    );
  }
}
