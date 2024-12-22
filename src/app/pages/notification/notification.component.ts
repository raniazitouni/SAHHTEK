import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // Importer CommonModule pour les directives Angular
import { NotificationRadiologueComponent } from './radiologue/notification-radiologue.component';
import { LaboratinNotificationsComponent } from './laborantin/notification-laborantin.component';
import { CanvasJSAngularChartsModule } from '@canvasjs/angular-charts'; 


@Component({
  selector: 'app-notification',
  standalone: true,
  imports: [
    CommonModule, 
    NotificationRadiologueComponent,
    LaboratinNotificationsComponent,
  ],
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css'], 
})
export class NotificationComponent {}
