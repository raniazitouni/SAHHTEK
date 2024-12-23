import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { Datanavbar, user } from '../../models/navbar';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProfileService } from '../../Services/profile.service' ;
//import {Datanavbar , user} from '../../models/navbar' ;
import { HttpClientModule } from '@angular/common/http'; 
//import { FormBuilder, FormGroup,ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule,HttpClientModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
  providers: [ProfileService]
})


export class NavbarComponent implements OnInit {
  navData = Datanavbar;
  userId: string = '1'; // You can modify this to be dynamic based on your use case
  role : string ='' // jibih m local storage
  user : any ;

  
  isMenuOpen: boolean = false;

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }



  activeLink: string = '';

  constructor(private router: Router, private activatedRoute: ActivatedRoute ,private profileService: ProfileService) {}
 
 
  ngOnInit(): void {
   
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.updateActiveLink();
      });
      this.fetchUserData();
    this.updateActiveLink(); // Ensure active link is set on initial load
  }
  
  fetchUserData() {
    this.profileService.getUserProfile(this.userId).subscribe(
       (data) => {
         this.user = data ;
         this.user.role = 'docteur' ;
       },
       (error) => {
         console.error('Error fetching user data:', error);
       }
     );
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





  
