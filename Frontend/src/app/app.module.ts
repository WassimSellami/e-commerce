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
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { CategoryBarComponent } from './utility-components/category-bar/category-bar.component';
import { SearchComponent } from './pages/search/search.component';


@NgModule({
  imports: [
    MatDialogModule,
    FormsModule,
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatSlideToggleModule,
    RouterModule.forRoot([
      { path: 'products', component: ProductListComponent },
      { path: 'product/:id', component: ProductDetailComponent },
      { path: 'cart', component: CartComponent },
      { path: 'shipping', component: ShippingComponent },
      { path: 'adminPage', component: AdminPageComponent },
      { path: 'productForm', component: ProductFormComponent },
      { path: 'search', component: SearchComponent },
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
    CategoryBarComponent,
    SearchComponent,
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
