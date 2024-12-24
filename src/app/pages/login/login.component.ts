import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html', 
  styleUrls: ['./login.component.css'] ,
  imports: [ FormsModule, CommonModule,HttpClientModule],
})
export class LoginPageComponent {
  email: string = '';
  password: string = '';
  forgotEmail: string = ''; 
  Islogin : boolean = false ;

  constructor(private http: HttpClient) {}

  onSubmit() {
    const loginData = {
      email: this.email,
      password: this.password,
    };

    this.http.post('http://127.0.0.1:8000/login/', loginData).subscribe(
      (response: any) => {
        if (response.message === 'Login successful') {
          alert('Connexion réussie');
          console.log(response);
          localStorage.setItem('user_id', response.user_id);
          localStorage.setItem('role', response.role);

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


