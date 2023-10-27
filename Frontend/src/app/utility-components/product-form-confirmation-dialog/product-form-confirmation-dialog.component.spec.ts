import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductFormConfirmationDialogComponent } from './product-form-confirmation-dialog.component';

describe('ProductFormConfirmationDialogComponent', () => {
  let component: ProductFormConfirmationDialogComponent;
  let fixture: ComponentFixture<ProductFormConfirmationDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProductFormConfirmationDialogComponent]
    });
    fixture = TestBed.createComponent(ProductFormConfirmationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
