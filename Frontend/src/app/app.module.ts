import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { TopBarComponent } from './utility-components/top-bar/top-bar.component';
import { ProductListComponent } from './pages/product-list/product-list.component';
import { ProductAlertsComponent } from './utility-components/product-alerts/product-alerts.component';
import { ProductDetailComponent } from './pages/product-detail/product-detail.component';
import { CartComponent } from './pages/cart/cart.component';
import { ShippingComponent } from './pages/shipping/shipping.component';
import { FormsModule } from '@angular/forms';
import { ConfirmationDialogComponent } from './utility-components/confirmation-dialog/confirmation-dialog.component';
import { MatDialogModule } from '@angular/material/dialog'; // Import MatDialogModule


@NgModule({
  imports: [
    MatDialogModule,
    FormsModule,
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      { path: '', component: ProductListComponent },
      { path: 'products/:productId', component: ProductDetailComponent },
      { path: 'cart', component: CartComponent },
      { path: 'shipping', component: ShippingComponent },
    ])
  ],
  declarations: [
    AppComponent,
    TopBarComponent,
    ProductListComponent,
    ProductAlertsComponent,
    ProductDetailComponent,
    CartComponent,
    ShippingComponent,
    ConfirmationDialogComponent,
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
