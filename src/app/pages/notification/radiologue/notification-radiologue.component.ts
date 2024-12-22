import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NotificationCardComponent } from '../radiologue/card/notification-card/notification-cardd.component';


@Component({
  selector: 'app-notification-radiologue',
  standalone: true,
  imports: [CommonModule, NotificationCardComponent], // Ensure this is included
  templateUrl: './notification-radiologue.component.html',
  styleUrls: ['./notification-radiologue.component.css'],
})
export class NotificationRadiologueComponent {
  demandes = [
    {
      patient: 'belkis',
      type: 'Radiologie',
      doctor: 'Dr Alouane',
      date: '7-12-2024',
      etatdemande: false,
    },
    {
      patient: 'aya',
      type: 'Radiologie',
      doctor: 'Dr Karim',
      date: '6-12-2024',
      etatdemande: true,
    },
  ];

  isModalOpen = false;
  selectedNotification: any = null;

  onCardClick(demande: any): void {
    this.selectedNotification = demande;
    this.openModal();
  }

  openModal(): void {
    this.isModalOpen = true;
    setTimeout(() => this.generateGraph(), 500);
  }

  closeModal(): void {
    this.isModalOpen = false;
    this.selectedNotification = null;
  }

  generateGraph(): void {
    const chartContainer = document.getElementById('chart-container');
    if (chartContainer) {
      chartContainer.innerHTML = `
        <div class="h-full flex items-center justify-center text-[#697D95]">
          Graphique ici
        </div>`;
    }
  }
}
