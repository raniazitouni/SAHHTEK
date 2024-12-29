import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from "./components/navbar/navbar.component";
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from './Services/auth.service';



@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent , CommonModule],
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Client';
  constructor(private router: Router ) {}
   
  get isLoginPage(): boolean {
    return this.router.url === '/login';
  }
  
  
}





