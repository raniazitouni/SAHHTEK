import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../../Services/profile.service' ;
import {Datanavbar , user} from '../../models/navbar' ;
import { CommonModule } from '@angular/common'; 
import { HttpClientModule } from '@angular/common/http'; 
import { FormBuilder, FormGroup, ReactiveFormsModule,Validators } from '@angular/forms';

@Component({
  selector: 'app-personal-info',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule ,HttpClientModule],
  templateUrl: './personal-info.component.html',
  styleUrl: './personal-info.component.css',
  providers: [ProfileService]
})
export class PersonalInfoComponent implements OnInit {

  profileForm: FormGroup;
  serverErrors: { [key: string]: string } = {}; // To store validation errors
  userId: string = localStorage.getItem('user_id') || ''

  constructor(private fb: FormBuilder, private profileService: ProfileService) {
    // Initialize the form
    this.profileForm = this.fb.group({
      prenomUser: [{ value: ''}, Validators.required],
      nomUser: [{ value: ''}, Validators.required],
      dateDeNaissance: [{ value: ''}, Validators.required],
      telephone: [{ value: ''}, [ Validators.pattern('^\\d{10}$')]],
      adresse: [{ value: ''}, Validators.required],
    });
  }

  ngOnInit(): void {
    this.fetchUserData();
  }

  // Fetch user data from backend
  fetchUserData() {
    this.profileService.getUserProfile(this.userId).subscribe(
      (data) => {
        this.profileForm.patchValue(data);
      },
      (error) => {
        console.error('Error fetching user data:', error);
      }
    );
  }



  // Save profile changes
  saveProfile() {
    this.serverErrors = {}; 
    if (this.profileForm.valid) {
      const profileData: Record<string, any> = { ...this.profileForm.value, userId: this.userId };
      const lowercaseProfileData = Object.keys(profileData).reduce((acc, key) => {
      acc[key.toLowerCase()] = profileData[key];
      return acc;
    }, {} as Record<string, any>); // Add type assertion here

      this.profileService.updateUserProfile(lowercaseProfileData).subscribe(
        (response) => {
          console.log('Profile updated successfully:', lowercaseProfileData);   
        },
        (error) => {
          if (error.status === 400) {
            this.serverErrors = error.error; // Display backend validation errors
          } else {
            console.error('Error saving profile:', error);
          }
       
        }
      );
    } else {
      console.error('Form is invalid');
      this.displayFormValidationErrors();
    }
  }

  // Display validation errors
  displayFormValidationErrors() {
    Object.keys(this.profileForm.controls).forEach((field) => {
      const control = this.profileForm.get(field);
      if (control && control.invalid) {
        this.serverErrors[field] = this.getErrorMessage(field, control.errors);
      }else{
        this.serverErrors[field] ='' ;
      }
    });
  }

  getErrorMessage(field: string, errors: any): string {
    if (errors?.required) {
      return `${field} is required`;
    }
    if (errors?.pattern) {
      return `${field} is invalid`;
    }
    return 'Invalid input.';
  }
  
}






