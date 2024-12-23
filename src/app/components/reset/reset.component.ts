import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../../Services/profile.service' ;
import {Datanavbar , user} from '../../models/navbar' ;
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common'; 
import { HttpClientModule } from '@angular/common/http'; 
import { FormBuilder, FormGroup, ReactiveFormsModule,Validators } from '@angular/forms';


@Component({
  selector: 'app-reset',
  imports: [ReactiveFormsModule,CommonModule ,HttpClientModule],
  standalone: true,
  templateUrl: './reset.component.html',
  styleUrl: './reset.component.css',
  providers: [ProfileService]
})

export class ResetComponent {
  resetForm: FormGroup;
  isSubmitting: boolean = false; // To prevent multiple submissions
  errorMessage: string = ''; // To show error messages
  successMessage: string = ''; // To show success messages
  userId: string = '1'; // You can modify this to be dynamic based on your use case


  // Booleans to manage the visibility of the passwords
  showCurrentPassword: boolean = false;
  showNewPassword: boolean = false;
  showConfirmPassword: boolean = false;

  
  constructor(
    private fb: FormBuilder,
    private profileService: ProfileService,
    private router: Router // Inject Router
  ) {
    // Initialize the form with validation
    this.resetForm = this.fb.group({
      currentPassword: ['', [Validators.required]],
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]],
    });
  }

 
  // Method to toggle the visibility of passwords
  togglePasswordVisibility(field: string): void {
     switch(field) {
       case 'currentPassword':
         this.showCurrentPassword = !this.showCurrentPassword;
         break;
       case 'newPassword':
         this.showNewPassword = !this.showNewPassword;
         break;
       case 'confirmPassword':
         this.showConfirmPassword = !this.showConfirmPassword;
         break;
     }
   }



  ngOnInit(): void {}

  autoDismissError() {
    setTimeout(() => {
      this.errorMessage = '' ;
    }, 1000);  // The alert will disappear after 10 seconds
  }

  resetPassword() {

    if (this.resetForm.invalid) {
      this.errorMessage = 'Please fill all the required fields correctly.';
      this.autoDismissError() ;
      return;
    }
  
    const { currentPassword, newPassword, confirmPassword } = this.resetForm.value;
  
    // Clear existing errors
    this.resetForm.get('currentPassword')?.setErrors(null);
  
    if (newPassword !== confirmPassword) {
      this.resetForm.setErrors({ passwordMismatch: true });
      return;
    }
  
    this.isSubmitting = true;
    this.errorMessage = '';
    this.successMessage = '';
  
    const data = { currentPassword, newPassword };
    const userData = { ...data , userid: this.userId };
    console.log(userData)
  
    // Call the service to reset password
    this.profileService.resetPassword(userData).subscribe(
      (response) => {
        this.isSubmitting = false;
        this.successMessage = 'Password updated successfully!';
        //this.resetForm.reset();
        setTimeout(() => {
          this.router.navigate(['Profile/login']);
        }, 1000);
      },
      (error) => {
        this.isSubmitting = false;
        // Handle specific error for current password
        if (error.error?.error === 'Old password is incorrect') {
          // Set a server error on the currentPassword control
          this.resetForm.get('currentPassword')?.setErrors({ serverError: true });
          this.errorMessage = 'Your current password is incorrect. Please try again.';
        } else {
          // Handle other errors
          this.errorMessage = 'Failed to update password. Please try again later.';
        }
      }
    );
  }
  
}


/* backend response {
  "status": "error",
  "message": "Incorrect current password",
  "errorCode": "INCORRECT_CURRENT_PASSWORD"
} */




