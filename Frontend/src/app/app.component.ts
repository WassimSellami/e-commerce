import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  isProductListRoute: boolean = false;

  constructor(private router: Router) { }

  ngOnInit() {
    this.router.events.pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.checkRoute();
      });
  }

  searchKeywords = "";

  send(searchKeywords: string) {
    this.searchKeywords = searchKeywords;
  }

  private checkRoute() {
    const url = this.router.url;
    this.isProductListRoute = url.includes('/products')
  }
}
