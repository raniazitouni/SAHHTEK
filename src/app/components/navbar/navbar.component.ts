import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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

   activeLink: string = 'Recherche';
 

  setActiveLink(routeLink: string): void {
    this.activeLink =  routeLink;
  }
  
  
  
}



