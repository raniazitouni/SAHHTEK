import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NotificationCardComponent } from '../radiologue/card/notification-card/notification-cardd.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-notification-radiologue',
  standalone: true,
  imports: [NotificationCardComponent, FormsModule, CommonModule],
  templateUrl: './notification-radiologue.component.html',
  styleUrls: ['./notification-radiologue.component.css'],
})
export class NotificationRadiologueComponent implements OnInit {
  selectedDemande: any = null;
  demandes: any[] = [];
  isModalOpen = false;
  user_id: string | null | undefined;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.user_id = localStorage.getItem('user_id');
    if (this.user_id) {
      this.fetchDemandes(this.user_id);
    }
  }

  fetchDemandes(user_id: string | null): void {
    this.http
      .post<any[]>('http://127.0.0.1:8000/profil/demandes_radio/', { userId: user_id })
      .subscribe(
        (data) => {
          // Map the response to the desired format
          this.demandes = data.map((demande: any) => ({
            patientName: `${demande.patient.nom} ${demande.patient.prenom}`,
            doctorName: `${demande.docteur.nom} ${demande.docteur.prenom}`,
            typeRadio: demande.typeRadio,
            date: demande.dateDenvoi,
            etatDemande: demande.etatDemande,
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

  openModal(): void {
    this.isModalOpen = true;
  }

  closeModal(): void {
    this.isModalOpen = false;
    this.selectedDemande = null;
  }
}
