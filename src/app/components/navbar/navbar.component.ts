import { Component } from '@angular/core';
import {Datanavbar , user} from '../../models/navbar' ;
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
   navData = Datanavbar ; 
   user = user ;

   activeLink: string = ''; 
   setActiveLink(routeLink: string): void {
     this.activeLink = routeLink;
   }
  
  
}
