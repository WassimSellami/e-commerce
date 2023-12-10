import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.css']
})

export class TopBarComponent implements OnInit {
  searchKeywords: String = '';

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.emptySearchKeywords();
    });
  }
  goToSearchPage = (keywords: any) => {
    this.router.navigate(['/search'], { queryParams: { k: keywords } });
  }

  emptySearchKeywords = () => {
    if (!this.router.url.includes('/search')) {
      this.searchKeywords = ''
    }
  }

  isAdminUser = () => {
    var isUserAdmin = true;
    return this.isUserLogged() && isUserAdmin;
  }

  isUserLogged = () => {
    return false;
  }
}
