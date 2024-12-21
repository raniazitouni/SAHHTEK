import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { Observable , of } from 'rxjs';
import {radio , Imagerie} from '../models/Bilan' ;

@Injectable({
  providedIn: 'root',
})
export class PopupService {
  private popupVisibility = new BehaviorSubject<boolean>(false);
  isPopupVisible$ = this.popupVisibility.asObservable();

  Radio = Imagerie ;
  radio = radio  ;  
  private apiUrl = 'https://your-backend-url/api/radio'; 
  
  constructor(private http: HttpClient) {}
  // Fetch user profile
  getImagerie(): Observable<any> {
     // return this.http.get(`${this.apiUrl}/get`);
    return of(this.radio);
  }
  
  getDemandeRadio(): Observable<any> {
    // return this.http.get(`${this.apiUrl}/get`);
   return of(this.Radio);
 }


  showPopup(): void {
    this.popupVisibility.next(true);
  }

  hidePopup(): void {
    this.popupVisibility.next(false);
  }
}
