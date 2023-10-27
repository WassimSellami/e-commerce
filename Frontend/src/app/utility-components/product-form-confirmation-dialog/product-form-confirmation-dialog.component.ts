import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
@Component({
  selector: 'app-product-form-confirmation-dialog',
  templateUrl: './product-form-confirmation-dialog.component.html',
  styleUrls: ['./product-form-confirmation-dialog.component.css']
})

export class ProductFormConfirmationDialogComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public details: any
  ) { }
}