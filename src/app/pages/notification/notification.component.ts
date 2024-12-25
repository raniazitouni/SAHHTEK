import { Component , OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // Importer CommonModule pour les directives Angular
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NotificationRadiologueComponent } from './radiologue/notification-radiologue.component';
import { LaboratinNotificationsComponent } from './laborantin/notification-laborantin.component';



@Component({
  selector: 'app-notification',
  standalone: true,
  imports: [
    CommonModule,
    NotificationRadiologueComponent,
    HttpClientModule ,
    LaboratinNotificationsComponent
],
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css'], 
})

export class NotificationComponent implements OnInit {
  role: string | null = null;

  constructor(private http: HttpClient) {}
  ngOnInit(): void {
    this.role = localStorage.getItem('role');
  }
}