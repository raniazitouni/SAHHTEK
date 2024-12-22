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
    patient: string;
    doctor: string;
    date: string;
    type: string;
    etatdemande: boolean;}

  @Output() cardClicked = new EventEmitter<void>();

  get isProcessed(): boolean {
    return this.demande.etatdemande;
  }

  handleClick(): void {
    this.cardClicked.emit();
  }
}

