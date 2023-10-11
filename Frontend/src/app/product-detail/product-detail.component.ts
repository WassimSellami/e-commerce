import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartService } from '../services/cart.service';
import { ProductDetailService } from '../services/product-detail.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent {
  product: any;
  quantity: number = 1;

  constructor(
    private route: ActivatedRoute,
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
    this.cartService.addToCart(this.product, this.quantity);
  }
}
