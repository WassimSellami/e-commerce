import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { TopBarComponent } from './utility-components/top-bar/top-bar.component';
import { ProductListComponent } from './pages/product-list/product-list.component';
import { ProductDetailComponent } from './pages/product-detail/product-detail.component';
import { CartComponent } from './pages/cart/cart.component';
import { ShippingComponent } from './pages/shipping/shipping.component';
import { FormsModule } from '@angular/forms';
import { ConfirmationDialogComponent } from './utility-components/confirmation-dialog/confirmation-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { AdminPageComponent } from './pages/admin-page/admin-page.component';
import { ProductFormComponent } from './pages/product-form/product-form.component';


@NgModule({
  imports: [
    MatDialogModule,
    FormsModule,
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      { path: 'products', component: ProductListComponent },
      { path: 'products/:id', component: ProductDetailComponent },
      { path: 'cart', component: CartComponent },
      { path: 'shipping', component: ShippingComponent },
      { path: 'adminPage', component: AdminPageComponent },
      { path: 'productForm', component: ProductFormComponent },
    ])
  ],
  declarations: [
    AppComponent,
    TopBarComponent,
    ProductListComponent,
    ProductDetailComponent,
    CartComponent,
    ShippingComponent,
    ConfirmationDialogComponent,
    AdminPageComponent,
    ProductFormComponent,
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
