import { Component , OnInit , Input } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { PopupService } from '../../Services/PopupRadio.service';
import { HttpClient } from '@angular/common/http';
import { Imagerie } from '../../models/Bilan' ;
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-radio',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './add-radio.component.html',
  styleUrl: './add-radio.component.css'
})

export class AddRadioComponent implements OnInit {
  isPopupVisible: boolean = false;
  compteRendu: string = ''; 
  selectedFile: File | null = null; 
  selectedFileName: string = '';
  @Input() Imagerie : any ;
  icludeImage : boolean = true ;
  userId: string = localStorage.getItem('user_id') || '';
  backendUrl: string = 'http://127.0.0.1:8000/maj/AjouterRadio/'; // Replace with your backend API endpoint


  constructor(private popupService: PopupService , private http: HttpClient) {}

  ngOnInit(): void {
    this.popupService.isPopupVisible$.subscribe((visible) => {
      this.isPopupVisible = visible;     
    });
  }

  closePopup(): void {
    this.popupService.hidePopup();
    this.compteRendu = '';
    this.selectedFile = null; 
    this.selectedFileName = '';
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      this.selectedFile = file; // Assign the selected file to the variable
      this.selectedFileName = file.name; // Update the file name
      (document.querySelector('input[type="text"]') as HTMLInputElement).value = file.name; // Display the file name in the input field
    }
  }
  
  

  // Submit data to the backend
  sendData(): void {
    if (!this.compteRendu) {
      alert('Please provide "compte rendu".');
      return;
    }
  
    if (!this.selectedFile) {
      this.icludeImage = false ; 
      return;
    }
    this.icludeImage=true ;
  

    // Create FormData object

    const formData = new FormData();
    console.log('hoollaaa : '+this.Imagerie)
    formData.append('compterendu', this.compteRendu); // Append "compte rendu"
    formData.append('radiotype', this.Imagerie.typeRadio); 
    formData.append('demanderadioid', this.Imagerie.demandeId);
    formData.append('userid', this.userId);  // remplace 1 b user.id m local storage 

  
    if (this.selectedFile) {
      formData.append('image', this.selectedFile); // Append the file
      console.log(this.selectedFile)
    }
  
    const formDataObject: any = {};
    formData.forEach((value, key) => {
    formDataObject[key] = value;
    });
    console.log('FormData to be sent:', formDataObject);
    console.log('hiiiiiiiiiiiiiiiiiii zmar +' + this.Imagerie)
  
    /* Send the data to the backend*/
    this.http.post(this.backendUrl, formData).subscribe(
      (response) => {
        console.log('Data sent successfully:', response);
        this.closePopup(); // Close popup after success
      },
      (error) => {
        console.error('Error sending data:', error);
        console.log('Failed to send data. Please try again.');
      }
    );
  }
  

}



/*
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
    "demandeRadioId":"1" ,
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
 --------------------------------------- html ------------------------------
<button 
  class="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700" 
  (click)="openPopup(demande)"> <!--  send the object of the demande object aya declarato f boucle for   -->
  Ouvrir Imagerie Médicale
</button>
<app-add-radio [Imagerie]="selectedRadioData" ></app-add-radio>


*/
