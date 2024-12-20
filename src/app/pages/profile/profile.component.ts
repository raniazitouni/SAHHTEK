import { Component ,OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProfileService } from '../../Services/profile.service' ;
import {Datanavbar , user} from '../../models/navbar' ;
import { HttpClientModule } from '@angular/common/http'; 
//import { FormBuilder, FormGroup,ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule,RouterModule,HttpClientModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css' ,
  providers: [ProfileService]
})

export class ProfileComponent implements OnInit {
  activeLink: string = 'personnel-info';
  username: string = ''; // Property to store the username

  setActiveLink(routeLink: string): void {
   this.activeLink =  routeLink;
  }
  constructor(private profileService: ProfileService) {}
 
 
  ngOnInit(): void {
     this.fetchUserData();
  }
 
   // Fetch user data from backend
  fetchUserData() {
     this.profileService.getUserProfile().subscribe(
       (data) => {
         this.username = data.nomUser;
       },
       (error) => {
         console.error('Error fetching user data:', error);
       }
     );
   }


}






