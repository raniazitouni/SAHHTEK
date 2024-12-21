import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
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

  constructor(private soinService: SoinService) {}

  ngOnInit(): void {
    this.fetchSoins();
  }

  fetchSoins(): void {
    this.soinService.getSoins().subscribe(
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
}
