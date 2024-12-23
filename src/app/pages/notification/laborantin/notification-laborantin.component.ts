import { Component, OnInit, AfterViewInit } from '@angular/core';
import { NotificationCardComponent } from "./card/notification-card/notification-card.component"; 
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {
  Chart,
  BarElement,
  CategoryScale,
  LinearScale,
  BarController,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';


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
  selector: 'app-laboratin-notifications',
  templateUrl: './notification-laborantin.component.html',
  styleUrls: ['./notification-laborantin.component.css'],
  imports: [NotificationCardComponent, FormsModule, CommonModule],
})
export class LaboratinNotificationsComponent implements OnInit, AfterViewInit {
  notifications = [
    {
      patient: 'az',
      doctor: 'Alouane',
      date: '7-12-2024',
      etatdemande: false,
      testResults: [],
    },
    {
      patient: 'zzzz',
      doctor: 'Karim',
      date: '6-12-2024',
      etatdemande: true,
      testResults: [
        { name: 'Cholesterol', value: 190 },
        { name: 'Blood Pressure', value: 125 },
        { name: 'Glucose', value: 95 },
      ],
    },
  ];

  isModalOpen = false;
  selectedNotification: any = null;
  inputValues: any = {
    glycemie: '',
    pression: '',
    cholesterol: ''
  };

 
  chart: any;

  constructor() {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {}

  onCardClick(notification: any): void {
    this.selectedNotification = notification;
    this.openModal();
  }

  openModal(): void {
    this.isModalOpen = true;
  }

  generateGraph(): void {
    const labels = ['Glycémie', 'Pression', 'Cholestérol'];
    const values = [
      this.inputValues.glycemie,
      this.inputValues.pression,
      this.inputValues.cholesterol,
    ];

    // Check if all input values are filled
    if (values.every((val) => val != null && val !== '')) {
      if (this.chart) {
        this.chart.destroy();  // Destroy the previous chart if exists
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
      console.log('Veuillez remplir toutes les valeurs.');
    }
  }

  closeModal(): void {
    this.isModalOpen = false;
    this.selectedNotification = null;
  }
}