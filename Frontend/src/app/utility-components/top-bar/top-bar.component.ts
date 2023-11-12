import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.css']
})
export class TopBarComponent implements OnInit {
  showSearchDiv: boolean = false;
  constructor(private router: Router) { }

  ngOnInit() {
    this.router.events.pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.checkRoute();
      });
  }

  @Output() emitter: EventEmitter<string>
    = new EventEmitter<string>();

  emit(searchKeywords: string) {
    this.emitter.emit(searchKeywords);
  }

  private checkRoute() {
    this.showSearchDiv = this.router.url === '/products';
  }
}
