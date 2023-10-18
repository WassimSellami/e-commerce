import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Product } from '../products';

@Component({
  selector: 'app-confirmation-dialog',
  template: `
    <h2 mat-dialog-title>Product addded successfully !</h2>
    <mat-dialog-content>
      <p>{{ data.product.name }}</p>
      <p>Quantity: {{ data.quantity }}</p>
      <p>{{ data.product.price * data.quantity | currency:'EUR'}}</p>
    </mat-dialog-content>
    <mat-dialog-actions>
      <button mat-button color="primary" [mat-dialog-close]="true">Go to Checkout</button>
      <button mat-button color="warn" [mat-dialog-close]="false">Continue Shopping</button>
    </mat-dialog-actions>
  `,
})
export class ConfirmationDialogComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { product: Product, quantity: number }
  ) {}
}