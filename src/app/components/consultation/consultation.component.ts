import { Component } from '@angular/core';
@Component({
  selector: 'app-consultation',
  templateUrl: './consultation.component.html',
  styleUrls: ['./consultation.component.css']
})
export class ConsultationComponent {
  isModalVisible = false;
  ordonnanceData  = {
    nommedicament: '',
    dose: '',
    duree: ''
  };
  ordonnanceList: { nommedicament: string; dose: string; duree: string; }[] = []; // Correctly declare the array of OrdonnanceData

  
  consultationData = {
    consulationdate: '',
    resumeconsultation: '',
    userid: 4 ,
    patientid: 1,
    demanderadioid:'',
    demandebilanid:'',
    ordonnanceid: null
  };
  isDropdownVisible = false;
  
  demanderadio ={
    patientid : 1,
    docteurid:4,
    typeradio : ''
  }
  demandeBillan ={
    patientid : 1,
    docteurid:4
  }

  toggleDropdown(): void {
      this.isDropdownVisible = !this.isDropdownVisible;
  } 
  hideDropdown(): void {
    this.isDropdownVisible = false;
    this.submitDemanderadio();
}
  selectRadioType(type: string): void {
    this.demanderadio.typeradio = type;}

  updateResume(event: any): void {
    this.consultationData.resumeconsultation = event.target.value;
  } 
  updatenommedicament(event:any):void{
    this.ordonnanceData.nommedicament=event.target.value;
  }
  updatedose(event:any):void{
    this.ordonnanceData.dose=event.target.value;
  }
  updateduree(event:any):void{
    this.ordonnanceData.duree=event.target.value;
  }
  onDateChange(event: any): void {
  this.consultationData.consulationdate = event.target.value;

  }
  addOrdonnance(): void {
    this.ordonnanceList.push(this.ordonnanceData);
  }
  saveOrdonnance(): void {
    this.closeModal();
    this.submitOrdonnance();
  }

  submitOrdonnance(): void {

    const url = 'http://127.0.0.1:8000/maj/AjouterOrdonance/';
    const dataToSendord = this.ordonnanceList;
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
      
      if (data && data.ordonance) {
        const ordonnanceid = data.ordonance.ordonnanceid;
        this.consultationData.ordonnanceid = ordonnanceid;  
      }
    })
    .catch((error) => {
      console.error('Error during ordonnance creation:', error);
    });
  }

  submitDemanderadio(): void {
    const url = 'http://127.0.0.1:8000/maj/AjouterDemandeRadio/';
    const dataToSend = this.demanderadio;
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dataToSend),  // Send the data as JSON
    })
    .then((response) => response.json())  // Convert response to JSON
  
    .then((data) => {
     
      console.log(data.message);
      
      if (data && data.demandeRadio) {
        const demanderadioid = data.demandeRadio.demanderadioid;
        this.consultationData.demanderadioid = demanderadioid;  
      }
    })
    .catch((error) => {
      console.error('Error during demande creation radio:', error);
    });
  }
  submitDemandeBillan(): void {
    const url = 'http://127.0.0.1:8000/maj/AjouterDemandeBilan/';
    const dataToSend = this.demandeBillan;
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dataToSend),  // Send the data as JSON
    })
    .then((response) => response.json())  // Convert response to JSON
  
    .then((data) => {
     
      console.log(data.message);
      
      if (data && data.demandeBillan) {
        const demandebilanid= data.demandeBillan.demandebilanid;
        this.consultationData.demandebilanid = demandebilanid;  
      }
    })
    .catch((error) => {
      console.error('Error during demande creation Billan:', error);
    });
  }
  openOrdonnancePopup(existingData?: {nommedicament: string; dose: string; duree: string;}): void {
    if (existingData) {
      this.ordonnanceData = { ...existingData }; 
    } else {
      this.ordonnanceData = { nommedicament: '', dose: '', duree: '' }; 
    }
    this.isModalVisible = true; 
  }
  closeModal(): void {
    this.isModalVisible = false;
  }

  submitConsultation(): void {
    const url = `http://127.0.0.1:8000/maj/AjouterConsultation/`;
    const dataToSend = this.consultationData;
    console.log('Data to send:', dataToSend);
    if (!this.consultationData.consulationdate) {
      this.consultationData.consulationdate = new Date().toISOString().split('T')[0]; // Format: YYYY-MM-DD
    } else {
      const dateObj = new Date(this.consultationData.consulationdate);
      if (isNaN(dateObj.getTime())) {
        alert('Invalid date provided. Please correct it.');
        return;
      }
      this.consultationData.consulationdate = dateObj.toISOString().split('T')[0];
    }
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dataToSend),  
    })
  
    .then((response) => response.json())  
    .then((data) => {
      
      console.log(data.message);
      })
    .catch((error) => {
      console.error('Error during Consultation creation:', error);
    });
    }  }

  