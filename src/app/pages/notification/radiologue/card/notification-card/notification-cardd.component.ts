import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-notification-cardd',
  standalone: true,
  imports: [CommonModule],
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
    this.cardClicked.emit();
  }
}
