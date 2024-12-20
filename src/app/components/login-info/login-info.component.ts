import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../../Services/profile.service' ;
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common'; 
import { HttpClientModule } from '@angular/common/http'; 

@Component({
  selector: 'app-login-info',
  imports: [CommonModule ,HttpClientModule,RouterModule],
  standalone: true,
  templateUrl: './login-info.component.html',
  styleUrl: './login-info.component.css' ,
  providers: [ProfileService]
})

export class  LoginInfoComponent implements  OnInit {
    userProfile: any; // Variable to hold the fetched user profile data
  
    constructor(private profileService: ProfileService) {}
  
    ngOnInit(): void {
      // Call the service method to fetch user profile
      this.profileService.getUserProfile().subscribe(
        (data) => {
          this.userProfile = data;
          console.log('User Profile:', this.userProfile); // Log the fetched data
        },
        (error) => {
          console.error('Error fetching user profile:', error); // Handle errors
        }
      );
    }
  }