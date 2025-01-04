import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable , map } from 'rxjs';

// Define the structure for the Soin and the response

interface Soin {
  consultationDate: string;
  descriptionSoin: string;
  observation: string | null; // Allow null values
  showDetails?: boolean; // Optional property for UI
}


interface SoinResponse {
  patientId: string;
  soins: Soin[];
}

@Injectable({
  providedIn: 'root',
})
export class SoinService {
  private apiUrl = 'http://127.0.0.1:8000/profil/soins_infermier/'; // API URL

  constructor(private http: HttpClient) {}

  getSoins(userId: string): Observable<Soin[]> {
    const body = { userId };
  
    return this.http.post<any[]>(this.apiUrl, body).pipe(
      map((response) =>
        response.map((item) => ({
          consultationDate: item.consultationDate,
          descriptionSoin: item.descriptionSoin,
          observation: item.observation, // May be null
        }))
      )
    );
  }
  
}




/*

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable , of } from 'rxjs';
import {soins} from '../models/Soins' ;

interface Soin {
  consultationDate: string;
  descriptionSoin: string;
  observation: string;
}

@Injectable({
  providedIn: 'root',
})
export class SoinService {
  private apiUrl = 'http://127.0.0.1:8000/profil/patient-soins/'; //  API URL
  soins = soins ;

  constructor(private http: HttpClient) {}

  getSoins(): Observable<Soin[]> {
    return this.http.get<Soin[]>(this.apiUrl);

  }
}
*/