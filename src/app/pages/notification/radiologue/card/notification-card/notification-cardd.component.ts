import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { HttpClient , HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-notification-cardd',
  standalone: true,
  imports: [CommonModule ,HttpClientModule],
  templateUrl: './notification-cardd.component.html',
  styleUrls: ['./notification-cardd.component.css'],
})
export class NotificationCardComponent {
  @Input() demande!: {
    patientName: string;
    doctorName: string;
    date: string;
    typeRadio: string;
    etatDemande: boolean;
  };

  @Output() cardClicked = new EventEmitter<void>();

  get isProcessed(): boolean {
    return this.demande.etatDemande;
  }

  handleClick(): void {
    if (!this.demande.etatDemande) {

      this.cardClicked.emit();
      console.log('Card clicked and event emitted');


      this.demande.etatDemande = true;
    } else {
      console.log('Card has already been processed');
    }
  }
}
