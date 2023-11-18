import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/models/products';
import { ProductDetailService } from 'src/app/services/product-detail.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})


export class SearchComponent implements OnInit {
  keywords: String = ''
  allProducts: Product[] = []
  products: Product[] = [];
  searchedProducts: Product[] = [];
  filters: { [key: string]: any[] } = {};
  selectedFilters: { [key: string]: Set<number> } = {};
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productDetailService: ProductDetailService
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(queryParams => {
      this.keywords = queryParams['k'];
      this.productDetailService.getProducts().subscribe((data) => {
        this.allProducts = data;
        this.products = this.allProducts;
        this.searchedProducts = this.allProducts;
        this.searchProducts();
        this.initFilters();
      })
    })
  }

  searchProducts() {
    // console.log("gdq:", this.keywords)
    const searchTermUpperList = this.keywords.trim().split(/\s+/).map(searchTerm => searchTerm.toUpperCase().trim());
    this.searchedProducts = this.allProducts.filter(item =>
      searchTermUpperList.some(searchTerm =>
        item.name.toUpperCase().includes(searchTerm) || (item.description.toUpperCase().includes(searchTerm)) || (item.brand.toUpperCase().includes(searchTerm))
      )
    );
    this.products = this.searchedProducts
  }

  initFilters() {
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

  viewProductDetails(id: number) {
    this.router.navigate(['/product', id]);
  }

  applyFilters() {
    this.products = this.searchedProducts;
    if (this.selectedFilters['Brand'] && this.selectedFilters['Brand'].size > 0) {
      const selectedBrands = [...this.selectedFilters['Brand']].map(index => { return this.filters['Brand'][index] })
      this.products = this.products.filter(item =>
        selectedBrands.some(searchTerm =>
          item.brand.toUpperCase().includes(searchTerm))
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
}
