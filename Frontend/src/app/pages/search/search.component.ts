import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductDetailService } from 'src/app/services/product-detail.service';
import { ProductListComponent } from '../product-list/product-list.component';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent extends ProductListComponent implements OnInit {
  keywords: String = '';

  constructor(
    route: ActivatedRoute,
    router: Router,
    productDetailService: ProductDetailService
  ) {
    super(productDetailService, router, route);
  }

  override ngOnInit(): void {
    this.route.queryParams.subscribe(queryParams => {
      this.keywords = queryParams['k'];
      this.productDetailService.getProducts().subscribe((data) => {
        this.allProducts = data;
        this.products = this.allProducts;
        this.searchProducts();
        this.initFilters();
        this.initSortingFunctions();
        this.onSortChange();
      })
    })
  }

  searchProducts() {
    const searchTermUpperList = this.keywords.trim().split(/\s+/).map(searchTerm => searchTerm.toUpperCase().trim());
    this.allProducts = this.allProducts.filter(item =>
      searchTermUpperList.some(searchTerm =>
        item.name.toUpperCase().includes(searchTerm) || (item.description.toUpperCase().includes(searchTerm)) || (item.brand.toUpperCase().includes(searchTerm))
      )
    );
    this.products = this.allProducts
  }
}
