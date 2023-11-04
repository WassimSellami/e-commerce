import { Component, HostListener, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { CartService } from '../../services/cart.service';
import { Item } from '../../models/products';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from 'src/app/utility-components/confirmation-dialog/confirmation-dialog.component';


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
    private dialog: MatDialog,
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

    const dialogDetails = this.prepareDialogData();
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: dialogDetails
    }); dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        const queryData = this.prepareQueryData();
        this.confirmOrder(queryData);
      }
    });
  }

  prepareDialogData = () => {
    return {
      title: "Are you sure you want to confirm this order ?",
      confirmText: "Confirm",
      cancelText: "Cancel",
      fields: {
        Price: this.totalPrice,
        Name: this.checkoutForm.value.name,
        Address: this.checkoutForm.value.address,
      }
    };
  }

  prepareQueryData = () => {
    const itemQuantityArray = Array.from(this.items, ([id, item]) => ({ id, quantity: item.quantity }));
    return {
      "orderDetails": {
        "price": this.totalPrice,
        "name": this.checkoutForm.value.name,
        "address": this.checkoutForm.value.address,
        "productsData": itemQuantityArray
      }
    }
  }

  confirmOrder = (orderDetails: any) => {
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
    const leftQuantities = Array.from(this.items, ([id, item]) => ({ id, newQuantity: this.items.get(id)?.product.quantityInStock! - item.quantity }));
    this.cartService.updateStockQuantities(leftQuantities).subscribe(
      (response) => {
      },
      (error) => {
        console.error('Internal Server Error: Quantity not updated', error);
      }
    );
  }

  onDelteCartProduct(productId: number): void {
    this.cartService.deleteItem(productId);
    this.updateVariables();
  }
}
