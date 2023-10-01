import { Component, HostListener, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {
  productQuantity = this.cartService.getProductQuantity();
  cartProducts = this.cartService.getCartProducts();
  cartProductsPrice = 0
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
    this.cartProductsPrice = this.cartService.getCartProdcutsPrice();
    this.shippingPrice = this.cartService.getShippingPrice();
    return this.orderTotalPrice = this.cartProductsPrice + this.shippingPrice;
  }

  onSubmit(): void {
    const productQuantityArray = Array.from(this.productQuantity, ([id, quantity]) => ({ id, quantity }));
    const orderDetails = {
      "orderDetails": {
        "price": this.orderTotalPrice,
        "name": this.checkoutForm.value.name,
        "address": this.checkoutForm.value.address,
        "productsData": productQuantityArray
      }
    }
    this.cartService.createOrder(orderDetails).subscribe(
      (response) => {
        console.log(response);
        window.alert('Successful Operation');
        this.cartService.clearCart();
        this.checkoutForm.reset();
        this.cartProducts = [];
      },
      (error) => {
        console.error('Internal Server Error: Order Not Created', error);
        window.alert('Something went wrong please try again');
      }
    );
  }
  
  onDelteCartProduct(productId: number): void{
    const product = this.cartProducts.find(product => product.id === productId);
    this.cartService.updateCartProductsPrice(product!.price, this.productQuantity.get(productId)!, false);
    this.cartService.deleteCartProduct(product!);
    this.cartProductsPrice = this.cartService.cartProductsPrice
  }
}
