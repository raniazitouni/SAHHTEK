import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, Input, OnInit, ViewChild, ElementRef  } from '@angular/core';
import { Router } from '@angular/router';
import * as QRCode from 'qrcode';
import { PopupService } from '../../Services/PopupRadio.service';
import {PopupRadioComponent} from '../popup-radio/popup-radio.component';
import {PopupbioComponent} from '../popupbio/popupbio.component';
import {AddRadioComponent} from '../add-radio/add-radio.component';
import { HttpClientModule } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { Chart, BarElement, CategoryScale, LinearScale, BarController, Title, Tooltip,  Legend,} from 'chart.js';

Chart.register(
  BarElement,
  CategoryScale,
  LinearScale,
  BarController,
  Title,
  Tooltip,
  Legend
);


type OrdonnanceDetail = {
  nomMedicament: string;
  dose: string;
  duree: string;
};
@Component({
  selector: 'app-dpi',
  standalone: true,
  imports: [CommonModule ,PopupRadioComponent,HttpClientModule],
  templateUrl: './dpi.component.html',
  styleUrl: './dpi.component.css' ,
  providers: [PopupService]
})
export class DPIComponent implements OnInit, AfterViewInit {
    
 @ViewChild('chartCanvas') chartCanvas: ElementRef | undefined;
 @Input() bilanBiologiqueId: string | undefined;
 isModalOpen = false;
 inputValues: any = {
   glycemie: null,
   pression: null,
   cholesterol: null,
 };
 laborantin: any = null;
 resultDate: string = '';
 chart: any;
 openchart: any;
  
  constructor(private router: Router, private popupService: PopupService, private http: HttpClient) {}

  ngAfterViewInit(): void {
    if (this.openchart && this.chartCanvas) {
      this.generateGraph(); 
    }
  }

  radioIdToShow: string  | null = null ; 
  
  consultation : string = '1' ;


  openModal(bilanBiologiqueId: string): void {
    this.isModalOpen = true;
    this.http.post('http://127.0.0.1:8000/profil/detail_bilan_bio/', { bilanBiologiqueId }).subscribe(
      (data: any) => {
        this.inputValues.glycemie = data.glycemieValue;
        this.inputValues.pression = data.pressionValue;
        this.inputValues.cholesterol = data.cholesterolValue;
        this.laborantin = data.laborantin;
        this.resultDate = data.resultDate;
        this.openchart = data.etatbilan;
        if (this.openchart) {
          this.generateGraph(); // Only generate graph if openchart is true
        }
        
      });
  }

    closeModall(): void {
      this.isModalOpen = false;
      if (this.chart) {
        this.chart.destroy(); // Clean up the chart instance
      }
    }
  
    showGraph(): boolean {
      
      return this.openchart ;
    }
  
    generateGraph(): void {
      const labels = ['Glycémie', 'Pression', 'Cholestérol'];
      const values = [
        parseFloat(this.inputValues.glycemie),
        parseFloat(this.inputValues.pression),
        parseFloat(this.inputValues.cholesterol),
      ];
  
      if (values.every((val) => !isNaN(val) && val !== 0)) {
        // Destroy the existing chart if it exists
        if (this.chart) {
          this.chart.destroy();
        }
  
        const canvas = document.getElementById('chartCanvas') as HTMLCanvasElement;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          this.chart = new Chart(ctx, {
            type: 'bar',
            data: {
              labels: labels,
              datasets: [
                {
                  label: 'Bilan Biologique',
                  data: values,
                  backgroundColor: 'rgba(63, 108, 181, 0.6)',
                  borderColor: 'rgba(63, 108, 181, 1)',
                  borderWidth: 1,
                },
              ],
            },
            options: {
              responsive: true,
              scales: {
                y: {
                  beginAtZero: true,
                },
              },
            },
          });
        }
      } else {
        console.log('Veuillez remplir toutes les valeurs numériques.');
      }
    }





  openPopup(bilanRadiologiqueId : string): void {
    this.popupService.showPopup();
    this.radioIdToShow = bilanRadiologiqueId ;
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
