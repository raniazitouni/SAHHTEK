import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable , of } from 'rxjs';
import {Datanavbar , user} from '../models/navbar' ;


@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  private apiUrl = 'http://127.0.0.1:8000/profil/user_personal_info/'; // Backend API URL
  private apiUrlUser =  'http://127.0.0.1:8000/maj/UpdateUserInfo/'  
  private apiUrlres =  'http://127.0.0.1:8000/maj/ResetPassword/'     
  user = user ;
  

  constructor(private http: HttpClient) {}

  // Fetch user profile with POST and ID in URL
  getUserProfile( userId: string ): Observable<any> {
    const body = { userId };
    return this.http.post(this.apiUrl, body);
  }

  // Update user profile
  updateUserProfile( data: any): Observable<any> {
    return this.http.put(this.apiUrlUser, data);
  }

  // Reset password
  resetPassword(data: any): Observable<any> {
   return this.http.put(this.apiUrlres, data);
   //return of (this.user) ;
  }
}
