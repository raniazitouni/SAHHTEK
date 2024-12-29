import { Component, Output, EventEmitter, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient , HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-notification-card',
  templateUrl: './notification-card.component.html',
  styleUrls: ['./notification-card.component.css'],
  imports: [CommonModule , HttpClientModule]
})
export class NotificationCardComponent {

  @Input() notification!: {
    patientName: string;
    doctorName: string;
    date: string;
    etatDemande: boolean;
    demandebilanid: BigInteger;
  };

  
  @Output() cardClicked = new EventEmitter<void>();

 
  get isProcessed(): boolean {
    return this.notification.etatDemande;
  }

  handleClick(): void {
    console.log(this.notification)

    if (!this.notification.etatDemande) {
      
      this.cardClicked.emit();
      console.log('Card clicked and event emitted');
      
     
      this.notification.etatDemande = true;
    } else {
      console.log('Card has already been processed');
    }
  }
}
