import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from "./pages/profile/profile.component";
import { PatientsComponent } from "./pages/patients/patients.component";
import {NotificationComponent} from "./pages/notification/notification.component";
import {RechercheComponent} from "./pages/recherche/recherche.component";
import {SoinsComponent} from "./pages/soins/soins.component";
import { ConsultationComponent } from './components/consultation/consultation.component';
import { DPIComponent } from './components/dpi/dpi.component';
import { PersonalInfoComponent } from './components/personal-info/personal-info.component';
import { LoginInfoComponent } from './components/login-info/login-info.component';
import { ResetComponent } from './components/reset/reset.component';
import { PopupRadioComponent } from './components/popup-radio/popup-radio.component'; 
import { LoginPageComponent } from "./pages/login/login.component";
import { provideHttpClient } from '@angular/common/http';
import { AuthGuard } from './Services/auth.guard';

export const routes: Routes = [
  { 
    path: 'Profile',
    component: ProfileComponent , canActivate: [AuthGuard] ,
    children: [
      { path: '', redirectTo: 'personnel-info', pathMatch: 'full' }, // Default child
      { path: 'personnel-info', component: PersonalInfoComponent },
      { path: 'login', component: LoginInfoComponent },
      { path: 'reset-password', component: ResetComponent },
    ],
  },
  { path: 'login', component: LoginPageComponent }, 
  { path: 'Patients', component: PatientsComponent , canActivate: [AuthGuard]  },
  { path: 'Notification', component: NotificationComponent , canActivate: [AuthGuard] },
  { path: 'Recherche', component: RechercheComponent , canActivate: [AuthGuard] },
  { path: 'Soins', component: SoinsComponent , canActivate: [AuthGuard] },
  { path: 'consultation', component: ConsultationComponent , canActivate: [AuthGuard]},
  { path: 'dpi', component: DPIComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: 'login' }, // Default fallback*/
];

@NgModule({
  providers: [provideHttpClient()],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
