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

  private apiUrl = 'http://127.0.0.1:8000/profil/detail_bilan_radio/'; 
  private apiUrlBilan = 'http://127.0.0.1:8000/profil/demandes_radio/';
  
  constructor(private http: HttpClient) {}

 // Fetch user profile
 getImagerie(bilanRadiologiqueId: string): Observable<any> {
  const body = { bilanRadiologiqueId };
  console.log(body) ;
  return this.http.post(this.apiUrl, body);  // Add return statement here
}

  
  getDemandeRadio(bilanDemandeId: string): Observable<any> {
    const body = { bilanDemandeId };
    console.log(body) ;
    return this.http.post(this.apiUrl, body);  // Add return statement here
  }


  showPopup(): void {
    this.popupVisibility.next(true);
  }

  hidePopup(): void {
    this.popupVisibility.next(false);
  }
}
