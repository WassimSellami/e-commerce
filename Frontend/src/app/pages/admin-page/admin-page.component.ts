import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/products';
import { ProductDetailService } from 'src/app/services/product-detail.service';
import { AdminPageService } from 'src/app/services/admin-page.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css']
})
export class AdminPageComponent implements OnInit {
  products: Product[] = [];

  constructor(
    private productDetailService: ProductDetailService,
    private adminPageService: AdminPageService,
    private router: Router
  ) { }

  ngOnInit() {
    this.productDetailService.getProducts().subscribe((data) => {
      this.products = data;
    })
  }

  addProduct = () => {
    this.router.navigate(['/productForm']);
  }

  editProduct = (id: number) => {
    this.router.navigate(['/productForm', { "id": id }]);
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


}