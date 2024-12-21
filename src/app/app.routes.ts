import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from "./pages/profile/profile.component";
import { PatientsComponent } from "./pages/patients/patients.component";
import {NotificationComponent} from "./pages/notification/notification.component";
import {RechercheComponent} from "./pages/recherche/recherche.component";
import {SoinsComponent} from "./pages/soins/soins.component";
import { PersonalInfoComponent } from './components/personal-info/personal-info.component';
import { LoginInfoComponent } from './components/login-info/login-info.component';
import { ResetComponent } from './components/reset/reset.component';
import { PopupRadioComponent } from './components/popup-radio/popup-radio.component'; 


export const routes: Routes = [
  { 
    path: 'Profile',
    component: ProfileComponent,
    children: [
      { path: '', redirectTo: 'personnel-info', pathMatch: 'full' }, // Default child
      { path: 'personnel-info', component: PersonalInfoComponent },
      { path: 'login', component: LoginInfoComponent },
      { path: 'reset-password', component: ResetComponent },
    ],
  },
  { path: 'Patients', component: PatientsComponent },
  { path: 'Notification', component: NotificationComponent },
  { path: 'Recherche', component: RechercheComponent },
  { path: 'Soins', component: SoinsComponent },
  { path: '**', redirectTo: 'Profile' }, // Default fallback
];



