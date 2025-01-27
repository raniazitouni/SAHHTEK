import { Component, OnInit, AfterViewInit } from '@angular/core';
import { HttpClient , HttpClientModule } from '@angular/common/http';
import { NotificationCardComponent } from './card/notification-card/notification-card.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {
  Chart,
  BarElement,
  CategoryScale,
  LinearScale,
  BarController,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';


Chart.register(
  BarElement,
  CategoryScale,
  LinearScale,
  BarController,
  Title,
  Tooltip,
  Legend
);

@Component({
  selector: 'app-laboratin-notifications',
  templateUrl: './notification-laborantin.component.html',
  styleUrls: ['./notification-laborantin.component.css'],
  imports: [NotificationCardComponent, FormsModule, CommonModule , HttpClientModule],
})
export class LaboratinNotificationsComponent implements OnInit, AfterViewInit {
  
  notifications: any[] = [];
  user_id: any;
  isModalOpen = false;

  selectedNotification: any = null;

  inputValues: any = {
    glycemie: '',
    pression: '',
    cholesterol: ''
  };

 
  chart: any;
  grapheexi: boolean | undefined;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.user_id = localStorage.getItem('user_id');
    if (this.user_id) {
      this.fetchNotifications(this.user_id);
    }
  }


  ngAfterViewInit(): void {}


  fetchNotifications(user_id: string | null): void {
    
      this.http.post<any[]>('http://127.0.0.1:8000/profil/demandes_bilan/', { laborantinId: user_id })
      .subscribe(
      (data) => {
        console.log('Notifications:lllll');
        console.log('Notifications:', data);
        if (Array.isArray(data)) {
          
          this.notifications = data.map((notification: any) => ({
            patientName: `${notification.patient.nom} ${notification.patient.prenom}`,
            doctorName: `${notification.docteur.nom} ${notification.docteur.prenom}`,
            date: notification.dateDenvoi, 
            etatDemande: notification.etatDemande, 
            demandebilanid : notification.demandeId ,

          }));
        } else {
          console.error('Unexpected response format:', data);
        }
      },
      (error) => {
        console.error('Failed to fetch notifications', error);
      }
    );
  }
  


  onCardClick(notification: any): void {
    this.selectedNotification = notification;

    console.log('notification ; '+ notification.demandebilanid)
    this.openModal();
  }

  openModal(): void {
    this.isModalOpen = true;
  }

  generateGraph(): void {
    const labels = ['Glycémie', 'Pression', 'Cholestérol'];
    const values = [
      this.inputValues.glycemie,
      this.inputValues.pression,
      this.inputValues.cholesterol,
    ];

       
    // Check if all input values are filled
    if (values.every((val) => val != null && val !== '')) {

      
      this.grapheexi= true;

      if (this.chart) {
        this.chart.destroy();  // Destroy the previous chart if exists
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
      console.log('Veuillez remplir toutes les valeurs.');
    }
  }

  sendBilanToBackend(): void{
    console.log( 'hiiiiiiii true ')

    const demandebilanid = this.selectedNotification?.demandebilanid || null;
    this.user_id = localStorage.getItem('user_id');
    const bilannn = {
      etatbilan: this.grapheexi,
      glycemievalue: this.inputValues.glycemie,
      pressionvalue: this.inputValues.pression,
      cholesterolvalue: this.inputValues.cholesterol,
      resultdate: new Date().toISOString().split('T')[0], 
      userid: this.user_id, 
      patientid:1, 
      demandebilanid, 
    };

    this.http.post('http://127.0.0.1:8000/maj/AjouterBillan/', bilannn)
      .subscribe({
        next: (response) => {
          console.log(bilannn + 'hiiiiiiii true ')
          console.log('Bilan added successfully:', response);
        },
        error: (error) => {
          console.log(bilannn)
          console.error('Error adding bilan:', error);
        },
      });
  }


  closeModal(): void {
    this.isModalOpen = false;
    this.selectedNotification = null;
  }
}

