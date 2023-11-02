import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-order-confirmation-dialog',
  templateUrl: './order-confirmation-dialog.component.html',
  styleUrls: ['./order-confirmation-dialog.component.css']
})
export class OrderConfirmationDialogComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public details: any
  ) { }
}
