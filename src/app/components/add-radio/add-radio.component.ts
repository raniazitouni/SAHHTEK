import { Component , OnInit } from '@angular/core';
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
  Imagerie : any ;
  icludeImage : boolean = true ;
  backendUrl: string = 'https://your-backend-api.com/upload'; // Replace with your backend API endpoint


  constructor(private popupService: PopupService , private http: HttpClient) {}

  ngOnInit(): void {
    this.popupService.isPopupVisible$.subscribe((visible) => {
      this.isPopupVisible = visible;
      
    });
    this.popupService.getDemandeRadio().subscribe(
      (data) => {
        this.Imagerie = data;
        console.log('Iamgerie:', this.Imagerie); // Log the fetched data
      },
      (error) => {
        console.error('Error fetching radio :', error); // Handle errors
      }
    );
  }

  closePopup(): void {
    this.popupService.hidePopup();
    this.compteRendu = '';
    this.selectedFile = null; 
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
    formData.append('compteRendu', this.compteRendu); // Append "compte rendu"
  
    if (this.selectedFile) {
      formData.append('file', this.selectedFile, this.selectedFile.name); // Append the file
    }
  
    // Debugging: log formData keys and values
    for (const pair of formData.entries()) {
      console.log(pair[0] + ':', pair[1]);
    }
  
    /*/ Send the data to the backend/*
    this.http.post(this.backendUrl, formData).subscribe(
      (response) => {
        console.log('Data sent successfully:', response);
        this.closePopup(); // Close popup after success
      },
      (error) => {
        console.error('Error sending data:', error);
        console.log('Failed to send data. Please try again.');
      }
    );*/
  }
  

}



/*
import { Component } from '@angular/core';
import { PopupService } from '../../Services/Popup.service';
import {PopupRadioComponent} from '../../components/popup-radio/popup-radio.component'
import {AddRadioComponent} from '../../components/add-radio/add-radio.component'
import { HttpClientModule } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-patients',
  standalone: true,
  imports: [AddRadioComponent,HttpClientModule],
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
 --------------------------------------- html ------------------------------
<button 
  class="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700" 
  (click)="openPopup()">
  Ouvrir Imagerie Médicale
</button>
<app-add-radio></app-add-radio>


*/
