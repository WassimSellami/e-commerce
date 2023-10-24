import { Component } from '@angular/core';
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
export class ProductDetailComponent {
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
      this.productDetailService.getProductDetails(params['productId']).subscribe((data) => {
        this.product = data;
      });
    })
  }

  addToCart() {
    this.canAddToCart = false;
    this.cartService.updateItem(this.product, this.quantity);
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: { product: this.product, quantity: this.quantity },
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.canAddToCart = true;
      if (result) {
        this.router.navigate(['/cart']);
      }
    });
  }
}
