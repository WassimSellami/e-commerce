import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/products';
import { ProductDetailService } from 'src/app/services/product-detail.service';
import { AdminPageService } from 'src/app/services/admin-page.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DeleteConfirmationDialogComponent } from 'src/app/utility-components/delete-confirmation-dialog/delete-confirmation-dialog.component';

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
    private router: Router,
    private dialog: MatDialog
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
    const details = "";
    const index = this.products.findIndex(product => product.id === id);
    if (index !== -1) {
      const details = {
        "name": this.products[index].name,
        "description": this.products[index].description
      }
      const dialogRef = this.dialog.open(DeleteConfirmationDialogComponent, {
        data: details
      }); dialogRef.afterClosed().subscribe((result) => {
        if (result) {
          this.confirmDeletion(id, index);
        }
      });
    }
  }

  confirmDeletion = (id: number, index: number) => {
    this.adminPageService.deleteProduct(id).subscribe(
      (response) => {
        this.products.splice(index, 1);
        window.alert("Product deleted successfully!");
      },
      (error) => {
        window.alert("Please Try again: " + error);
      }
    );
  }


}