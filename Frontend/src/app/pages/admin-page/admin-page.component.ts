import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/products';
import { ProductDetailService } from 'src/app/services/product-detail.service';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css']
})
export class AdminPageComponent implements OnInit {
  products: Product[] = [];

  constructor(
    private productDetailService: ProductDetailService
  ) { }

  ngOnInit() {
    this.productDetailService.getProducts().subscribe((data) => {
      this.products = data;
    })
  }

  addProduct = () => {

  }
}