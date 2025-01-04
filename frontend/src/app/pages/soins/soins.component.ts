import { Component, OnInit } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { SoinService } from '../../Services/soin.service';

interface Soin {
  consultationDate: string;
  descriptionSoin: string;
  observation: string | null; // Allow null
  showDetails?: boolean; // Optional for toggling details
}

@Component({
  selector: 'app-soins',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './soins.component.html',
  styleUrls: ['./soins.component.css'],
  providers: [SoinService],
})
export class SoinsComponent implements OnInit {
  soins: Soin[] = [];
  selectedSoin: Soin | null = null;
  infermierId: string = localStorage.getItem('user_id') || '';

  constructor(private soinService: SoinService, private location: Location) {}

  ngOnInit(): void {
    this.fetchSoins();
  }

  fetchSoins(): void {
    this.soinService.getSoins(this.infermierId).subscribe(
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
    this.location.back();
  }
}
