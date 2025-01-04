import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../Services/auth.service';
 
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html', 
  styleUrls: ['./login.component.css'] ,
  imports: [ FormsModule, CommonModule,HttpClientModule],
  providers: [AuthService]
})
export class LoginPageComponent {
  email: string = '';
  password: string = '';
  forgotEmail: string = ''; 
  constructor(private http: HttpClient , private router: Router, private authService: AuthService) {}


  onSubmit() {
    const loginData = {
      email: this.email,
      password: this.password,
    };
    console.log(loginData),
    this.http.post('http://127.0.0.1:8000/login/', loginData).subscribe(
     
      (response: any) => {
       console.log(response)
        if (response.message === 'Login successful') {
          localStorage.setItem('user_id', response.user_id);
          localStorage.setItem('role', response.role);
          localStorage.setItem('hospital_id', response.hopital_id);
          if (localStorage.getItem('role') == 'patient') {
            localStorage.setItem('patient_id', response.patientId);
          }
          
          this.authService.login(); 
          this.router.navigate(['Profile']); 
        } else {
          alert('E-mail ou mot de passe invalide');
        }
      },
      (error) => {
        console.error('Error:', error);
        alert('Une erreur est survenue lors de la connexion');
      }
    );
  }




  isModalOpen = false; 

  
  openModal() {
    this.isModalOpen = true;
  }

  
  closeModal() {
    this.isModalOpen = false;
  }

  // Forgot password 
  resetPassword() {
    if (!this.forgotEmail) {
      alert('Veuillez entrer votre email');
      return;
    }

    const resetData = { email: this.forgotEmail };

    this.http.post('http://127.0.0.1:8000/forgot-password/', resetData).subscribe(
      (response: any) => {
        if (response.message === 'Password reset email sent successfully.') {
          alert('Un email de réinitialisation a été envoyé.');
          this.closeModal();  
        } else {
          alert('Erreur lors de l\'envoi de l\'email de réinitialisation');
        }
      },
      (error) => {
        console.error('Error:', error);
        alert('Une erreur est survenue lors de la réinitialisation du mot de passe');
      }
    );
  }
}


