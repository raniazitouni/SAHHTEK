import { Component, OnInit } from '@angular/core';
import { CommonModule , Location } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { SoinService } from '../../Services/soin.service';

interface Soin {
  consultationDate: string;
  descriptionSoin: string;
  observation: string;
  showDetails?: boolean; // Optional property for toggling details
}

@Component({
  selector: 'app-soins',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './soins.component.html',
  styleUrls: ['./soins.component.css'],
  providers: [SoinService]
})
export class SoinsComponent implements OnInit {
  soins: Soin[] = [];
  selectedSoin: Soin | null = null;
  patientId: string = '1111'; // You can modify this to be dynamic based on your use case

  constructor(private soinService: SoinService , private location: Location) {} 
  

  ngOnInit(): void {
    this.fetchSoins();
  }

  fetchSoins(): void {
    // Pass the patientId to the service method
    this.soinService.getSoins(this.patientId).subscribe(
      (data: Soin[]) => {
        this.soins = data.map((soin) => ({ ...soin, showDetails: false }));
        console.log('Fetched soins:', this.soins);
      },
      (error) => {
        console.error('Error fetching soins:', error);
      }
    );
  }

  toggleDetails(soin: Soin): void {
    soin.showDetails = !soin.showDetails;
  }
  
 
  goBack(): void {
    this.location.back(); // Navigate to the previous page
  }

}
