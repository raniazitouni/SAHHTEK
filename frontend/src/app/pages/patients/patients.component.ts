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
  standalone: true,
  selector: 'app-patients',
  templateUrl: './patients.component.html',
  styleUrls: ['./patients.component.css'],
  imports: [CommonModule, HttpClientModule, FormsModule],
})
export class PatientsComponent implements OnInit {
    patients: Patient[] = [];
    isModalOpen = false;
    today: string = new Date().toISOString().split('T')[0];
    errorMessage: string = '';
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
      etatpatient: 0, // hospitalisÃ©
    };
    user_id: any;
    userRole: string | undefined;
  
    constructor(private http: HttpClient) {}
  
    ngOnInit() {
      this.user_id = localStorage.getItem('user_id');
      this.userRole = localStorage.getItem('role') as 'docteur' | 'recepcioniste';
      //const hospitalId = localStorage.getItem('hospital_id');

      if (this.userRole === 'docteur') {
        this.fetchPatientsByDoctor(this.user_id);
      } else if (this.userRole === 'recepcioniste') {
        this.fetchPatientsByHospital(/*Number(hospitalId)*/1);
      }
    }
    

    fetchPatientsByDoctor(userId: number) {
      const url = 'http://127.0.0.1:8000/profil/docteur_patients/';
      
      this.http.post<{ patients: Patient[] }>(url, { doctorId: userId }).subscribe(
        (data) => {
          console.log(data); 
          if (Array.isArray(data.patients)) {
            this.patients = data.patients.map((patient: any) => ({
              nss: patient.patientId || '',
              name: patient.nom || '', 
              surname: patient.prenom || '',
              phone: patient.telephone || '', //mkch
              birthdate: patient.datedenaissance || '', //mkch 
              mutuelle: patient.mutuelle || '',
              personne: patient.personneAContacter || '',
              etatpatient: patient.etatPatient || 0,
              address: '',
              mail: '',
            }));
          } else {
            console.error('Expected patients to be an array but got', data.patients);
          }
        },
        (error) => {
          console.error('Error fetching patients:', error);
        }
      );
      
    }
  



    fetchPatientsByHospital(hospitalId: number) {
      const url = 'http://127.0.0.1:8000/profil/patients_by_hospital/';
      
      this.http.post<Patient[]>(url, { hopitalId: hospitalId }).subscribe(
        (data) => {
          this.patients = data.map((patient: any) => ({
            nss: patient.patientId || '',
            name: patient.nomUser || '',
            surname: patient.prenomUser || '',
            phone: patient.telephone || '',
            birthdate: patient.dateDeNaissance || '',
            address: patient.adresse || '',
            mail: patient.emailUser || '',
            mutuelle: patient.mutuelle || '',
            personne: patient.personneAContacter || '',
            etatpatient: patient.etatPatient || 0,
          }));
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
      this.errorMessage = '';
      console.log("Adding new patient:", this.newPatient);
      const hospitalId = localStorage.getItem('hospital_id');
      
      if (!this.newPatient.nss || !/^\d{16}$/.test(this.newPatient.nss)) {
        this.errorMessage = 'Le NSS doit contenir exactement 16 chiffres';
        return; 
      }

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
        hopitalid: 1 /*Number(hospitalId)*/,  // the hospital ID here
      };
      
      console.log("Sending patient data:", patientData);
      
      this.http.post('http://127.0.0.1:8000/maj/CreateDpi/', patientData).subscribe(
        (response :any ) => {
          console.log('Patient added:', response);
  
          // Check if the response is successful
          if (response.message === 'Object created successfully') {
            this.closeModal()
            // Add the new patient to the patients list
            this.patients.push({ ...this.newPatient });
  
            // Reset the form after successful addition
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
              etatpatient: 0,  // Reset status
            }; 
          } else {
            
            this.errorMessage = 'Le NSS existe déja';
          }

        },
        (error) => {
          console.error('Error adding patient:', error);
          this.errorMessage = 'Le NSS existe déja';
        }
      );

     
    }

    updatePatientStatus(patient: Patient) {
      const updatedPatientData = {
        patientid: patient.nss, 
        etatpatient: patient.etatpatient
      };
  
      this.http.post(`http://127.0.0.1:8000/maj/UpdatePatientStatus/`, updatedPatientData).subscribe(
        (response) => {
          console.log('Patient status updated:', response);
        },
        (error) => {
          console.error('Error updating patient status:', error);
        }
      );
    }
}
