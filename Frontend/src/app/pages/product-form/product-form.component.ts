import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, ValidationErrors, AbstractControl, ValidatorFn } from '@angular/forms';
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
  ) { }

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
      this.productForm = this.formBuilder.group({
        name: [this.product.name, Validators.required],
        price: [this.product.price, Validators.required],
        description: [this.product.description, Validators.required],
        addedQuantity: [0, Validators.required],
      });
    });
  }

  add = () => {
    this.productForm = this.formBuilder.group({
      name: ['', Validators.required],
      price: ['', Validators.required],
      description: ['', Validators.required],
      quantityInStock: ['', Validators.required],
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
        Quantity: this.addMode ? formValue.quantityInStock : this.product.quantityInStock + formValue.addedQuantity
      }
    };
  }

  prepareQueryData = (dialogData: any) => {
    const formValue = this.productForm.value;
    return {
      "price": dialogData.fields.Price,
      "name": dialogData.fields.Name,
      "description": dialogData.fields.Description,
      "quantityInStock": dialogData.fields.Quantity
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
