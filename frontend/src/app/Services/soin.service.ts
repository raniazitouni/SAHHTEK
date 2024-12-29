import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable , map } from 'rxjs';

// Define the structure for the Soin and the response
interface Soin {
  consultationDate: string;
  descriptionSoin: string;
  observation: string;
}

interface SoinResponse {
  patientId: string;
  soins: Soin[];
}

@Injectable({
  providedIn: 'root',
})
export class SoinService {
  private apiUrl = 'http://127.0.0.1:8000/profil/patient-soins/'; // API URL

  constructor(private http: HttpClient) {}

  // Method to fetch soins for a given patientId
  getSoins(patientId: string): Observable<Soin[]> {
    // Prepare the body for the POST request
    const body = { patientId };

    // Send the POST request and return the soins list from the response
    return this.http.post<SoinResponse>(this.apiUrl, body).pipe(
      // Extract soins from the response object
      map((response) => response.soins)
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