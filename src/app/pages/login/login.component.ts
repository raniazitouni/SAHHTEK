import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html', 
  styleUrls: ['./login.component.css'] 
})
export class LoginPageComponent {
  isModalOpen = false; 

  // Ouvre le modal
  openModal() {
    this.isModalOpen = true;
  }

  // Ferme le modal
  closeModal() {
    this.isModalOpen = false;
  }
}
