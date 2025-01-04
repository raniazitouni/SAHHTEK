import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { HttpClient , HttpClientModule } from '@angular/common/http';
import { NotificationCardComponent } from '../radiologue/card/notification-card/notification-cardd.component';
import { FormsModule } from '@angular/forms';
import { PopupService } from '../../../Services/PopupRadio.service';
import {AddRadioComponent} from '../../../components/add-radio/add-radio.component'

@Component({
  selector: 'app-notification-radiologue',
  standalone: true,
  imports: [NotificationCardComponent, FormsModule, CommonModule , HttpClientModule ,AddRadioComponent],
  templateUrl: './notification-radiologue.component.html',
  styleUrls: ['./notification-radiologue.component.css'],
  providers: [PopupService]
})
export class NotificationRadiologueComponent implements OnInit {
  selectedDemande: any = null;
  demandes: any[] = [];
  isModalOpen = false;
  user_id: string | null | undefined;
  selectedRadioData: any;

  constructor(private http: HttpClient ,private popupService: PopupService) {}

  ngOnInit(): void {
    this.user_id = localStorage.getItem('user_id');
    if (this.user_id) {
      this.fetchDemandes(this.user_id);
    }
  }

  fetchDemandes(user_id: string | null): void {
    this.http
      .post<any[]>('http://127.0.0.1:8000/profil/demandes_radio/', { radiologueId: user_id })
      .subscribe(
      
        (data) => {
          console.log('Notifications:', data);
          // Map the response to the desired format
          this.demandes = data.map((demande: any) => ({
            patientName: `${demande.patient.nom} ${demande.patient.prenom}`,
            doctorName: `${demande.docteur.nom} ${demande.docteur.prenom}`,
            typeRadio: demande.typeRadio,
            date: demande.dateDenvoi,
            etatDemande: demande.etatDemande, 
            demandeId : demande.demandeId
          }));
        },
        (error) => {
          console.error('Error fetching data', error);
        }
      );
  }

  onCardClick(demande: any): void {
   
    this.selectedDemande = demande;
    this.openModal();
  }

 

  openPopup(demande : any ): void {
    console.log('hdy demande: '+ demande)
    this.popupService.showPopup();
    this.selectedRadioData = demande;  // Set the selected item data
    console.log('Item passed to popup:', demande);
  }

  openModal(): void {
    this.isModalOpen = true;
  }

  closeModal(): void {
    this.isModalOpen = false;
    this.selectedDemande = null;
  }
}













