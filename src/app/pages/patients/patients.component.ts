import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Patient {
  nss: string;
  personne: string;
  mail: string;
  mutuelle: string;
  name: string;
  surname: string;
  birthdate: string;
  phone: string;
  address: string;
  etatpatient: number; 
}




@Component({
  selector: 'app-patients',
  templateUrl: './patients.component.html',
  styleUrls: ['./patients.component.css'],
  imports: [ FormsModule, CommonModule,HttpClientModule],
})
export class PatientsComponent implements OnInit {
  patients: Patient[] = [];
  isModalOpen = false;
  
  today: string = new Date().toISOString().split('T')[0];
  
  newPatient: Patient = {
    nss: '',
    name: '',
    surname: '',
    phone: '',
    birthdate: '',
    address: '',
    mail: '',
    mutuelle: '',
    personne: '',
    etatpatient: 0, // hospitalisé
  };

  constructor(private http: HttpClient) {}

  ngOnInit() {
    const hospitalId = 1;  
    this.fetchPatients(hospitalId); 
}

  
  fetchPatients(hospitalId: number) {
    this.http.get<Patient[]>(`http://127.0.0.1:8000/profil/patients_by_hospital/${hospitalId}`).subscribe(
      (data) => {
        this.patients = data; 
      },
      (error) => {
        console.error('Error fetching patients:', error); 
      }
    );
}

  
  openModal() {
    this.isModalOpen = true;
  }

  
  closeModal() {
    this.isModalOpen = false;
  }

  // Add a new patient
  addPatient() {
    const patientData = {
      patientid: this.newPatient.nss,
      nomuser: this.newPatient.name,
      prenomuser: this.newPatient.surname,
      telephone: this.newPatient.phone,
      datedenaissance: this.newPatient.birthdate,
      adresse: this.newPatient.address,
      emailuser: this.newPatient.mail,
      etatpatient: this.newPatient.etatpatient,
      mutuelle: this.newPatient.mutuelle,
      personneacontacter: this.newPatient.personne,
      hopitalid: 1,
    };

    this.http.post('http://127.0.0.1:8000/maj/CreateDpi', patientData).subscribe(
      (response) => {
        console.log('Patient added:', response);
        if (response  === 'Object created successfully') {
          
          this.patients.push({ ...this.newPatient });
          
          this.newPatient = {
            nss: '',
            name: '',
            surname: '',
            phone: '',
            birthdate: '',
            address: '',
            mail: '',
            mutuelle: '',
            personne: '',
            etatpatient: 0, 
          };
          
          this.closeModal();
        }
      },
      (error) => {
        console.error('Error adding patient:', error);
      }
    );
  }

  
  updatePatientStatus(patient: Patient) {
    const updatedPatientData = {
      nss: patient.nss, 
      etatpatient: patient.etatpatient
    };

    
    this.http.put(`http://127.0.0.1:8000/profil/patients_by_hospital/${patient.nss}`, updatedPatientData).subscribe(
      (response) => {
        console.log('Patient status updated:', response);
      },
      (error) => {
        console.error('Error updating patient status:', error);
      }
    );
  }
}
