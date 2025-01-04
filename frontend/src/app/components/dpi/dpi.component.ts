import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as QRCode from 'qrcode';
import { PopupService } from '../../Services/PopupRadio.service';
import {PopupRadioComponent} from '../popup-radio/popup-radio.component';
import {PopupbioComponent} from '../popupbio/popupbio.component';
import {AddRadioComponent} from '../add-radio/add-radio.component';
import { HttpClientModule } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';

type OrdonnanceDetail = {
  nomMedicament: string;
  dose: string;
  duree: string;
};
@Component({
  selector: 'app-dpi',
  standalone: true,
  imports: [CommonModule ,PopupRadioComponent,HttpClientModule, PopupbioComponent],
  templateUrl: './dpi.component.html',
  styleUrl: './dpi.component.css' ,
  providers: [PopupService]
})
export class DPIComponent implements OnInit{
  bilanBiologiqueId: string | undefined;
 
 constructor(private router: Router , private popupService: PopupService) {}
  radioIdToShow: string  | null = null ; 
  
  consultation : string = '1' ;


  openPopup(bilanRadiologiqueId : string): void {
    this.popupService.showPopup();
    this.radioIdToShow = bilanRadiologiqueId ;
  }


  openModal(bilanBiologiqueId: string): void {
    this.bilanBiologiqueId = bilanBiologiqueId;
  }



  navigateToConsultation() {
      this.router.navigate(['/consultation']); // Navigates to /consultation
  }
  isModalVisible = false;
  patientData = {
    qrCodeImageUrl: '',
    userId: localStorage.getItem('role') === 'patient'
      ? localStorage.getItem('user_id') || ''
      : localStorage.getItem('uspp') || '',
    patientId: localStorage.getItem('patient_id') || '',
    nomUser: '',
    prenomUser: '',
    telephone: '',
    dateDeNaissance: '',
    mutuelle: '',
    adresse: '',
    personneAContacter: '',
   };
   role = localStorage.getItem('role') || '';
   
   
   soinData  = {
    consultationDate: '',
    userId: localStorage.getItem('role') === 'patient'
      ? localStorage.getItem('user_id') || ''
      : localStorage.getItem('uspp') || '',
    nomUser: '',
    prenomUser:'',
    descriptionSoin:'',
    observation:'',
   };
   
   
   soinsdata = {
    patientid: localStorage.getItem('patient_id') || '',
    userid: localStorage.getItem('user_id') || '',
    consultationdate: '',
    descriptionsoin: '',
    observation: '',
   }
   
   
   
   
   
soinsList: { consultationDate: string; userId: string; nomUser: string; prenomUser: string ; descriptionSoin: string ; observation : string ;}[] = [];
consultationList:{ consultationDate: string; userId: string; nomUser: string; prenomUser: string ; resumeConsultation: string ; bilanBiologiqueId : string ; bilanRadiologiqueId:string ; ordonnanceId: string ;isordVisible:false; ordonnanceDetails :OrdonnanceDetail[] ; isResumeVisible : false }[] = [];
ngOnInit(): void {
  this.profilhh();   this.profilpp(); this.soins() ; this.consultaions();
  this.generateQrCode();
}

updatedescriptionSoin(event: any): void {
  this.soinsdata.descriptionsoin = event.target.value;
}

updateobser(event: any): void {
  this.soinsdata.observation = event.target.value;
}
onDateChange(event: any): void {
  this.soinsdata.consultationdate = event.target.value;
  }

addOrdonnance(): void {
  this.soinsList.push(this.soinData);
}

saveSoin(): void {
  console.log('Saving soin...');
  this.closeModal();
  this.submitSoin();
}

opensoinPopup(): void {
  this.isModalVisible = true; 
}

openresumePopup(consultation: any) {
  consultation.isResumeVisible = true; // Open the modal for the specific consultation
}

closeResumePopup(consultation: any) {
  consultation.isResumeVisible = false; // Close the modal for the specific consultation
}

openordPopup(consultation: any) {
  consultation.isordVisible = true; // Open the modal for the specific consultation
}

closeordPopup(consultation: any) {
  consultation.isordVisible = false; // Close the modal for the specific consultation
}

closeModal(): void {
  this.isModalVisible = false;
}

submitSoin(): void {
  const url = 'http://127.0.0.1:8000/maj/AjouterSoin/';
  const dataToSendord = this.soinsdata;
  console.log('llllll',dataToSendord);
  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(dataToSendord),  // Send the data as JSON
  })
  .then((response) => response.json())  // Convert response to JSON
  .then((data) => {
    console.log(data.message);
  })
  .catch((error) => {
    console.error('Error during ordonnance creation:', error);
  });
}



profilhh(): void {
  const url = 'http://127.0.0.1:8000/profil/user_personal_info/';
  const dataToSend = this.patientData;
  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(dataToSend),  // Send the data as JSON
  })
  .then((response) => response.json())  // Convert response to JSON
  .then((data) => {
    
    if (data ) {
      this.patientData.telephone = data.telephone;
      this.patientData.nomUser = data.nomUser;
      this.patientData.prenomUser = data.prenomUser;  
      this.patientData.adresse = data.adresse;
      this.patientData.dateDeNaissance = data.dateDeNaissance;
    }
  })
  .catch((error) => {
    console.error('Error during ordonnance creation:', error);
  });
}
profilpp(): void {
  const url = 'http://127.0.0.1:8000/profil/patient-personal_info/';
  const dataToSend = this.patientData;
  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(dataToSend),  // Send the data as JSON
  })
  .then((response) => response.json())  // Convert response to JSON
  .then((data) => {
    
    if (data ) {
      this.patientData.mutuelle = data.mutuelle;
      this.patientData.personneAContacter = data.personneAContacter;
    }
  })
  .catch((error) => {
    console.error('Error during ordonnance creation:', error);
  });
}

generateQrCode(): void {
  const currentPageUrl = window.location.href; // Get the current page URL
  QRCode.toDataURL(currentPageUrl)
    .then((url: any) => {
      this.patientData.qrCodeImageUrl = url; // Set the generated QR code image URL
    })
    .catch((error: any) => {
      console.error('Error generating QR code:', error);
    });
}

soins(): void {
  const url = 'http://127.0.0.1:8000/profil/patient-soins/';
  const dataToSend = this.patientData;
  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(dataToSend),  // Send the data as JSON
  })
  .then((response) => response.json())  // Convert response to JSON
  .then((data) => {    
    if (data ) {
      this.soinsList = data.soins;
    }
  })
  .catch((error) => {
    console.error('Error during ordonnance creation:', error);
  });
}

consultaions(): void {
  const url = 'http://127.0.0.1:8000/profil/patient-consultations/';
  const dataToSend = this.patientData;
  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(dataToSend),  // Send the data as JSON
  })
  .then((response) => response.json())  // Convert response to JSON
  .then((data) => {    
    if (data ) {
      this.consultationList = data;
    }
  })
  .catch((error) => {
    console.error('Error during ordonnance creation:', error);
  });
}
}