import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable , of } from 'rxjs';
import {Datanavbar , user} from '../models/navbar' ;

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  user = user ;  
  private apiUrl = 'https://your-backend-url/api/profile'; // Replace with your backend API

  constructor(private http: HttpClient) {}

  // Fetch user profile
  getUserProfile(): Observable<any> {
   // return this.http.get(`${this.apiUrl}/get`);
   return of(this.user);
  }

  // Update user profile
  updateUserProfile(data: any): Observable<any> {
    //return this.http.post(`${this.apiUrl}/update`, data);
    return of({ success: true, message: 'Profile updated successfully' });
  }

  //reset password 
  ressetpassword(data: any): Observable<any> {
    //return this.http.post(`${this.apiUrl}/update`, data);
    return of({ success: true, message: 'password updated successfully' });
  }
}
