import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { ProductDetailService } from '../../services/product-detail.service';
import { ConfirmationDialogComponent } from '../../utility-components/confirmation-dialog/confirmation-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  product: any;
  quantity: number = 1;
  canAddToCart: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog,
    private cartService: CartService,
    private productDetailService: ProductDetailService

  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.productDetailService.getProductDetails(params['id']).subscribe((data) => {
        this.product = data;
      });
    })
  }

  addToCart() {
    this.canAddToCart = false;
    this.cartService.updateItem(this.product, this.quantity);
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: {
        fields: {
          Name: this.product.name,
          Quantity: this.quantity,
          Price: this.product.price * this.quantity
        },
        title: "Product addded successfully !",
        confirmText: "Go to checkout",
        cancelText: "Continue shopping",
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.canAddToCart = true;
      if (result) {
        this.router.navigate(['/cart']);
      }
    });
  }
}
