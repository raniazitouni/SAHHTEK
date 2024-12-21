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
  private apiUrl = 'https://example.com/api/soins'; //  API URL
  soins = soins ;

  constructor(private http: HttpClient) {}

  getSoins(): Observable<Soin[]> {
   // return this.http.get<Soin[]>(this.apiUrl);
   return of(this.soins);
  }
}
