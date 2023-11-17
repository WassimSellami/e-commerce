import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ProductFormService } from 'src/app/services/product-form.service';
import { ProductDetailService } from 'src/app/services/product-detail.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from 'src/app/utility-components/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
  addMode: boolean = false;
  editMode: boolean = false;
  productForm!: FormGroup;
  id: number = 0;
  product: any;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog,
    private formBuilder: FormBuilder,
    private productFormService: ProductFormService,
    private productDetailsService: ProductDetailService
  ) {
    this.productForm = this.formBuilder.group({});
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = params['id']
      if (this.id) {
        this.editMode = true;
        this.edit();
      }
      else {
        this.addMode = true
        this.add();
      }
    })
  }

  edit = () => {
    this.productDetailsService.getProductDetails(this.id).subscribe((data) => {
      this.product = data;
      console.log(this.product)
      this.productForm = this.formBuilder.group({
        name: [this.product.name, Validators.required],
        price: [this.product.price, Validators.required],
        description: [this.product.description, Validators.required],
        brand: [this.product.brand, Validators.required],
        category: [this.product.category, Validators.required],
        addedQuantity: [0, Validators.required],
      });
      console.log('Product form status:', this.productForm.status);
    });
  }

  add = () => {
    this.productForm = this.formBuilder.group({
      name: ['', Validators.required],
      price: ['', Validators.required],
      description: ['', Validators.required],
      brand: ['', Validators.required],
      category: ['', Validators.required],
      quantityInStock: ['', Validators.required],
      addedQuantity: [0, Validators.required], // Add this line
    });
  }


  onSubmit = () => {
    const dialogData = this.prepareDialogData();
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: dialogData
    }); dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        const details = this.prepareQueryData(dialogData);
        this.confirmSubmission(details);
      }
    });
  }

  prepareDialogData = () => {
    const formValue = this.productForm.value;
    return {
      title: "Please verify product details before submission:",
      confirmText: "Confirm",
      cancelText: "Cancel",
      fields: {
        Price: formValue.price,
        Name: formValue.name,
        Description: formValue.description,
        Brand: formValue.brand,
        Category: formValue.category,
        Quantity: this.addMode ? formValue.quantityInStock : this.product.quantityInStock + formValue.addedQuantity
      }
    };
  }

  prepareQueryData = (dialogData: any) => {
    return {
      "price": dialogData.fields.Price,
      "name": dialogData.fields.Name,
      "description": dialogData.fields.Description,
      "brand": dialogData.fields.Brand,
      "quantityInStock": dialogData.fields.Quantity,
      "category": dialogData.fields.Category
    };
  }

  confirmSubmission = (details: any) => {
    if (this.addMode) {
      this.productFormService.addProduct(details).subscribe(
        (response) => {
          window.alert('Product added successfully !')
          this.router.navigate(['/adminPage']);
        },
        (error) => {
          console.log(error);
          window.alert('Product not added: ' + error);
        }
      );
    }
    else {
      this.productFormService.editProduct(this.id, details).subscribe(
        (response) => {
          window.alert('Product updated successfully !')
          this.router.navigate(['/adminPage']);
        },
        (error) => {
          window.alert('Product not updated: ' + error);
        }
      );
    }
  }
}
