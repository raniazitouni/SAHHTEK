import { Component , OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { PopupService } from '../../Services/PopupRadio.service';
import { radio } from '../../models/Bilan' ;


@Component({
  selector: 'app-popup-radio',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './popup-radio.component.html',
  styleUrl: './popup-radio.component.css',
})

export class PopupRadioComponent implements OnInit {
  isPopupVisible: boolean = false;
  radio : any  ;
  constructor(private popupService: PopupService) {}

  ngOnInit(): void {
    this.popupService.isPopupVisible$.subscribe((visible) => {
      this.isPopupVisible = visible;
    });
    
    this.popupService.getImagerie().subscribe(
      (data) => {
        this.radio = data;
        console.log('radio:', this.radio); // Log the fetched data
      },
      (error) => {
        console.error('Error fetching radio :', error); // Handle errors
      }
    );

  }

  closePopup(): void {
    this.popupService.hidePopup();
  }
}



/*  ajouter f dpi html et  component

<button 
  class="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700" 
  (click)="openPopup()">
  Ouvrir Imagerie Médicale
</button>
<app-popup-radio></app-popup-radio>


import { Component } from '@angular/core';
import { PopupService } from '../../Services/Popup.service';
import {PopupRadioComponent} from '../../components/popup-radio/popup-radio.component'
import {AddRadioComponent} from '../../components/add-radio/add-radio.component'
import { HttpClientModule } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-patients',
  standalone: true,
  imports: [PopupRadioComponent,HttpClientModule],
  templateUrl: './patients.component.html',
  styleUrl: './patients.component.css',
  providers: [PopupService]
})

export class PatientsComponent {

  constructor(private popupService: PopupService) {}

  openPopup(): void {
    this.popupService.showPopup();
  }
}

*/