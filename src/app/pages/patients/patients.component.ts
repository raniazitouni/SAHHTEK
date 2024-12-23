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
  imports: [AddRadioComponent,HttpClientModule],
  templateUrl: './patients.component.html',
  styleUrl: './patients.component.css',
  providers: [PopupService]
})

export class PatientsComponent {
  
  selectedRadioData: any;

  // hady tro7 omb3d remplaciha b demande ml for f html 
  demande =  {
    "patient": {
        "nom": "aa",
        "prenom": "aa"
    },
    "docteur": {
        "nom": "aaa",
        "prenom": "aaa"
    },
    "typeRadio": "IRM"
}

  constructor(private popupService: PopupService) {}

  openPopup(demande : any ): void {
    this.popupService.showPopup();
    this.selectedRadioData = demande;  // Set the selected item data
    console.log('Item passed to popup:', demande);
  }
}
  
  





/**
 "patient": {
            "nom": "mridyara",
            "prenom": "mridbenlacheheb"
        },
        "docteur": {
            "nom": "khayther",
            "prenom": "amina"
        },
        "typeRadio": "IRM"

 */