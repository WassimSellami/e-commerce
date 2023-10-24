import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/products';
import { ProductDetailService } from 'src/app/services/product-detail.service';
import { AdminPageService } from 'src/app/services/admin-page.service';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css']
})
export class AdminPageComponent implements OnInit {
  products: Product[] = [];

  constructor(
    private productDetailService: ProductDetailService,
    private adminPageService: AdminPageService
  ) { }

  ngOnInit() {
    this.productDetailService.getProducts().subscribe((data) => {
      this.products = data;
    })
  }

  addProduct = () => {

  }

  deleteProduct = (id: number) => {
    this.adminPageService.deleteProduct(id).subscribe(
      (response) => {
        window.alert("Product deleted successfully!");
        const index = this.products.findIndex(product => product.id === id);
        if (index !== -1) {
          this.products.splice(index, 1);
        }
      },
      (error) => {
        window.alert("Please Try again: " + error);
      }
    );
  }

  editProduct = (id: number) => {
    window.alert("edit" + id);
  }
}