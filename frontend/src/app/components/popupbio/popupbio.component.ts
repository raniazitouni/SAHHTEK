import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Chart, BarElement, CategoryScale, LinearScale, BarController, Title, Tooltip, Legend } from 'chart.js';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

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
  selector: 'app-popupbio',
  imports: [FormsModule,CommonModule,],
  templateUrl: './popupbio.component.html',
  styleUrls: ['./popupbio.component.css'],
})
export class PopupbioComponent {
  @Input() bilanBiologiqueId: string | undefined;

  isModalOpen = false;
  inputValues: any = {
    glycemie: null,
    pression: null,
    cholesterol: null,
  };
  laborantin: any = null;
  resultDate: string = '';
  chart: any;
  openchart: any;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    if (this.bilanBiologiqueId) {
      this.openModal(this.bilanBiologiqueId);
    }
  }

  openModal(bilanBiologiqueId: string): void {
    this.http.post('http://127.0.0.1:8000/profil/detail_bilan_bio/', { bilanBiologiqueId })
      .subscribe((data: any) => {
        this.inputValues.glycemie = data.glycemieValue;
        this.inputValues.pression = data.pressionValue;
        this.inputValues.cholesterol = data.cholesterolValue;
        this.laborantin = data.laborantin;
        this.resultDate = data.resultDate;
        this.openchart = data.etatbilan;
        this.isModalOpen = true;
        setTimeout(() => this.generateGraph(), 500); // Delay to ensure canvas is rendered
      });
  }

  closeModal(): void {
    this.isModalOpen = false;
    if (this.chart) {
      this.chart.destroy(); // Clean up the chart instance
    }
  }

  showGraph(): boolean {
    
    return this.openchart ;
  }

  generateGraph(): void {
    const labels = ['Glycémie', 'Pression', 'Cholestérol'];
    const values = [
      parseFloat(this.inputValues.glycemie),
      parseFloat(this.inputValues.pression),
      parseFloat(this.inputValues.cholesterol),
    ];

    if (values.every((val) => !isNaN(val) && val !== 0)) {
      // Destroy the existing chart if it exists
      if (this.chart) {
        this.chart.destroy();
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
      console.log('Veuillez remplir toutes les valeurs numériques.');
    }
  }
}