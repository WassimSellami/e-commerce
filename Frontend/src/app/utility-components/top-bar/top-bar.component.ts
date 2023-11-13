import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.css']
})
export class TopBarComponent {
  showSearchDiv: boolean = false;
  constructor(private router: Router) { }

  @Output() emitter: EventEmitter<string>
    = new EventEmitter<string>();

  emit(searchKeywords: string) {
    this.emitter.emit(searchKeywords);
  }

  goToProductsPage = (keywords: any) => {
    if (this.isProductsRoute()) {
      this.emit(keywords);
    }
    else {
      this.router.navigate(['/products', { "k": keywords }]);
    }
  }

  private isProductsRoute() {
    return this.router.url === '/products';
  }
}
