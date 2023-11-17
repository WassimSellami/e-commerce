import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.productDetailService.getCategories().subscribe((data) => {
      this.allCategories = data;
    })
  }

  selectCategory = (category: String) => {
    this.router.navigate(['/products'], { queryParams: { category: category } });
  }
}
