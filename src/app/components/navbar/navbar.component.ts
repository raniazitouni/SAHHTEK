import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { Datanavbar, user } from '../../models/navbar';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent implements OnInit {
  navData = Datanavbar;
  user = user;

  
  isMenuOpen: boolean = false;

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }



  activeLink: string = '';

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.updateActiveLink();
      });

    this.updateActiveLink(); // Ensure active link is set on initial load
  }

  setActiveLink(routeLink: string): void {
    this.activeLink = routeLink;
    this.isMenuOpen = false;
  }

  private updateActiveLink(): void {
    const currentRoute = this.router.url.split('?')[0]; // Exclude query params
    const parentRoute = this.getParentRoute(currentRoute);
    this.activeLink = parentRoute || '';
  }

  private getParentRoute(currentRoute: string): string | null {
    for (const navItem of this.navData) {
      if (currentRoute === `/${navItem.routeLink}`) {
        return navItem.routeLink;
      }
      if (currentRoute.startsWith(`/${navItem.routeLink}/`)) {
        return navItem.routeLink;
      }
    }
    return null;
  }
}
