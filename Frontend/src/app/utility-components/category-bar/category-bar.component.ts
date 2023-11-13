import { Component, OnInit } from '@angular/core';
import { ProductDetailService } from 'src/app/services/product-detail.service';

@Component({
  selector: 'app-category-bar',
  templateUrl: './category-bar.component.html',
  styleUrls: ['./category-bar.component.css']
})

export class CategoryBarComponent implements OnInit {

  allCategories: String[] = [];

  constructor(
    private productDetailService: ProductDetailService,
  ) { }

  ngOnInit(): void {
    this.productDetailService.getCategories().subscribe((data) => {
      this.allCategories = data;
    })
  }
}
