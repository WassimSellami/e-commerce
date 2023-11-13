import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
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
  searchedProducts: Product[] = [];
  categories = ['Brand', 'Price'];
  filters: { [key: string]: any[] } = {};
  selectedFilters: { [key: string]: Set<number> } = {};
  constructor(
    private productDetailService: ProductDetailService,
    private router: Router,
    private route: ActivatedRoute
  ) { }
  @Input() searchKeywords: String = '';

  ngOnInit() {
    this.productDetailService.getProducts().subscribe((data) => {
      this.allProducts = data;
      this.products = this.allProducts;
      this.searchedProducts = this.allProducts;
      this.initFilters();
      this.route.params.subscribe(params => {
        if (params['k'] && params['k'] != '') {
          this.searchProducts(params['k']);
        }
      })
    })
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['searchKeywords'] && changes['searchKeywords'].currentValue !== changes['searchKeywords'].previousValue) {
      this.searchProducts(this.searchKeywords);
    }
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
    this.router.navigate(['/products', id]);
  }

  searchProducts(searchKeywords: String) {
    const searchTermUpperList = searchKeywords.trim().split(/\s+/).map(searchTerm => searchTerm.toUpperCase().trim());
    this.searchedProducts = this.allProducts.filter(item =>
      searchTermUpperList.some(searchTerm =>
        item.name.toUpperCase().includes(searchTerm) || (item.description.toUpperCase().includes(searchTerm)) || (item.brand.toUpperCase().includes(searchTerm))
      )
    );
    this.products = this.searchedProducts
  }
}
