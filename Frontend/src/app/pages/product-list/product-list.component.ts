import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/products';
import { ProductDetailService } from 'src/app/services/product-detail.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];

  constructor(
    private productDetailService: ProductDetailService,
    private router: Router
  ) { }

  ngOnInit() {
    this.productDetailService.getProducts().subscribe((data) => {
      this.products = data;
    })
  }
  viewProductDetails(id: number) {
    this.router.navigate(['/products', id]);
  }
}
