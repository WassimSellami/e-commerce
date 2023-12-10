import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/products';
import { ProductDetailService } from 'src/app/services/product-detail.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  allProducts: Product[] = [];
  products: Product[] = [];
  category = "All"
  filters: { [key: string]: any[] } = {};
  selectedFilters: { [key: string]: Set<number> } = {};
  sortingOptions: any;
  sortFunctions: Map<String, (a: Product, b: Product) => number> = new Map([]);
  selectedSortOption: String = 'price-asc'

  constructor(
    protected productDetailService: ProductDetailService,  // Remove the private keyword
    protected router: Router,
    protected route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(queryParams => {
      if (queryParams['category']) {
        this.category = queryParams['category'];
      }
      this.productDetailService.getProducts(this.category).subscribe((data) => {
        this.allProducts = data;
        this.products = this.allProducts;
        this.initFilters();
        this.initSortingFunctions();
        this.onSortChange();
      })
    });
  }

  applyFilters() {
    this.products = this.allProducts;
    if (this.selectedFilters['Brand'] && this.selectedFilters['Brand'].size > 0) {
      const selectedBrands = [...this.selectedFilters['Brand']].map(index => { return this.filters['Brand'][index] })
      this.products = this.products.filter(item =>
        selectedBrands.some(filterTerm =>
          item.brand.toUpperCase().includes(filterTerm))
      );
    }
    if (this.selectedFilters['Price'] && this.selectedFilters['Price'].size > 0) {
      const selectedPriceRange = this.filters['Price'][this.selectedFilters['Price'].values().next().value];
      this.products = this.products.filter(item =>
        item.price <= selectedPriceRange[1] && item.price >= selectedPriceRange[0]
      );
    }
  }

  selectFilter(filter: string, index: number, isRadio: boolean = false) {
    if (!this.selectedFilters[filter] || isRadio) {
      this.selectedFilters[filter] = new Set<number>();
    }
    if (this.selectedFilters[filter].has(index)) {
      this.selectedFilters[filter].delete(index);
    } else {
      this.selectedFilters[filter].add(index);
    }

    this.applyFilters();
  }

  initFilters() {
    this.onSortChange();
    // initialize from constants class
    this.filters['Price'] = [[0, 100000], [0, 200], [200, 500], [500, 1000], [1000, 1500], [1500, 2000]];
    let brands = new Set<String>;
    for (const product of this.products) {
      if (!this.filters['Brand']) {
        this.filters['Brand'] = []
      }
      brands.add(product.brand.toUpperCase());
    }
    this.filters['Brand'] = [...brands];
  }

  initSortingFunctions = () => {
    // initialize from constants class
    this.sortingOptions = [
      { value: 'price-asc', label: 'Price: Low to High' },
      { value: 'price-desc', label: 'Price: High to Low' },
      { value: 'newest', label: 'Newest arrivals' }
    ]
    // initialize from constants class
    this.sortFunctions = new Map<string, (a: Product, b: Product) => number>([
      ['price-asc', (a, b) => a.price - b.price],
      ['price-desc', (a, b) => b.price - a.price],
      ['newest', (a, b) => {
        if (a.createdAt < b.createdAt) { return 1; }
        else if (a.createdAt > b.createdAt) { return -1; }
        else { return 0; }
      }],
    ]);
  }

  viewProductDetails(id: number) {
    this.router.navigate(['/product', id]);
  }

  onSortChange() {
    const cmpFunction = this.sortFunctions.get(this.selectedSortOption)
    this.products.sort(cmpFunction)
  }
}
