import { Component } from '@angular/core';

interface Patient {
  name: string;
  surname: string;
  birthdate: string;
  phone: string;
  address: string;
}

@Component({
  selector: 'app-patients',
  templateUrl: './patients.component.html',
  styleUrls: ['./patients.component.css'],
})
export class PatientsComponent {
  patients: Patient[] = [];
  isModalOpen = false;

  newPatient: Patient = {
    name: '',
    surname: '',
    birthdate: '',
    phone: '',
    address: '',
  };

  openModal() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }

  addPatient() {
    this.patients.push({ ...this.newPatient });
    this.newPatient = { name: '', surname: '', birthdate: '', phone: '', address: '' };
    this.closeModal();
  }
}
