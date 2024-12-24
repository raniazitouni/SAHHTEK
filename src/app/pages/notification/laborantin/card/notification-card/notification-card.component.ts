import { Component, Output, EventEmitter, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-notification-card',
  templateUrl: './notification-card.component.html',
  styleUrls: ['./notification-card.component.css'],
  imports: [CommonModule]
})
export class NotificationCardComponent {
  
  @Input() notification!: {
    patient: string;
    doctor: string;
    date: string;
    etatdemande: boolean;
    testResults: any[]; 
  };

  
  @Output() cardClicked = new EventEmitter<void>();

 
  get isProcessed(): boolean {
    return this.notification.etatdemande;
  }

  handleClick(): void {
    if (!this.notification.etatdemande) {
      
      this.cardClicked.emit();
      console.log('Card clicked and event emitted');
      
     
      this.notification.etatdemande = true;
    } else {
      console.log('Card has already been processed');
    }
  }
}
