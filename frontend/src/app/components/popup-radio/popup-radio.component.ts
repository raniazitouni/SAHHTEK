import { Component , OnInit ,Input, OnChanges ,SimpleChanges} from '@angular/core';
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
  @Input() bilanRadiologiqueId : string | null = null  ;
  imageUrl : string ='';

  constructor(private popupService: PopupService) {}

  ngOnInit(): void {
    this.popupService.isPopupVisible$.subscribe((visible) => {
      this.isPopupVisible = visible;
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['bilanRadiologiqueId'] && this.bilanRadiologiqueId) {
       this.fetchRadioData();
    } else {
      console.warn('bilanRadiologiqueId is not set or is invalid!');
    }
  }
  
  fetchRadioData(): void {
    this.popupService.getImagerie( this.bilanRadiologiqueId ).subscribe(
      (data) => {
        this.radio = data;
        console.log('radio:', this.radio);
        this.imageUrl = `http://127.0.0.1:8000/${data.image}`;
  
      },
      (error) => {
        console.error('Error fetching radio:', error);
      }
    );

  }

  closePopup(): void {
    this.popupService.hidePopup();
  }
}



/*  ajouter f dpi html et  component

<button 
  class=" bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700" 
  *ngIf= consultation 
  (click)="openPopup(consultation)">    <!-- consultation.bilanRadiologiqueId-->
  Ouvrir Imagerie Médicale
</button>
<app-popup-radio [bilanRadiologiqueId]="radioIdToShow" >
</app-popup-radio>


import { Component,Input, OnChanges } from '@angular/core';
import { PopupService } from '../../Services/PopupRadio.service';
import {PopupRadioComponent} from '../../components/popup-radio/popup-radio.component'
import {AddRadioComponent} from '../../components/add-radio/add-radio.component'
import { HttpClientModule } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common'; 


@Component({
  selector: 'app-patients',
  standalone: true,
  imports: [PopupRadioComponent,HttpClientModule,CommonModule],
  templateUrl: './patients.component.html',
  styleUrl: './patients.component.css',
  providers: [PopupService]
})

export class PatientsComponent {

  radioIdToShow: string  | null = null ; 
  consultation : string = '1' ;

  constructor(private popupService: PopupService) {}

  openPopup(bilanRadiologiqueId : string): void {
    this.popupService.showPopup();
    this.radioIdToShow = bilanRadiologiqueId ;
  }
}

*/