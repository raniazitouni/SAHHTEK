import { Injectable } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private router: Router) {}

  login() {
    localStorage.setItem('isLoggedIn', 'true');
    console.log(true);
  }

  logout() {
    localStorage.setItem('isLoggedIn', 'false');
    this.router.navigate(['login']);
    localStorage.setItem('user_id', '');
    localStorage.setItem('role', '');
  }

  isUserLoggedIn(): boolean {
    const status = localStorage.getItem('isLoggedIn') === 'true';
    console.log(status);
    return status;
  }
}
