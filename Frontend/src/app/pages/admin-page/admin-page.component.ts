import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/products';
import { ProductDetailService } from 'src/app/services/product-detail.service';
import { AdminPageService } from 'src/app/services/admin-page.service';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from 'src/app/utility-components/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css']
})
export class AdminPageComponent implements OnInit {
  products: Product[] = [];
  category = "Electronics";

  constructor(
    private productDetailService: ProductDetailService,
    private adminPageService: AdminPageService,
    private router: Router,
    private route: ActivatedRoute,
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
    const index = this.products.findIndex(product => product.id === id);
    if (index !== -1) {
      const data = {
        fields: {
          Name: this.products[index].name,
          Description: this.products[index].description,
        },
        title: "Are you sure you want to  delete this product ?",
        confirmText: "Delete",
        cancelText: "Cancel",
      }
      const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
        data: data
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