import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Chart, BarElement, CategoryScale, LinearScale, BarController, Title, Tooltip, Legend } from 'chart.js';
import { FormsModule } from '@angular/forms';

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
  imports: [FormsModule,CommonModule],
  templateUrl: './popupbio.component.html',
  styleUrl: './popupbio.component.css'
})
export class PopupbioComponent {
  selectedDemande: any = null;
  inputValues: any = {
    glycemie: '12',
    pression: '12',
    cholesterol: '12',
  };


  isModalOpen = false;
  selectedNotification: any = null;
  chart: any;

  openModal(): void {
    this.isModalOpen = true;
    setTimeout(() => this.generateGraph(), 500); 
  }
 
  ngAfterViewInit() { this.generateGraph();}

  showGraph(): boolean {
    const { glycemie, pression, cholesterol } = this.inputValues;
    return !isNaN(parseFloat(glycemie)) && !isNaN(parseFloat(pression)) && !isNaN(parseFloat(cholesterol));
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

  closeModal(): void {
    this.isModalOpen = false;
    this.selectedNotification = null;
  }
}


