from django.urls import path
from . import views

urlpatterns = [
    # Chemin pour obtenir les informations personnelles d'un chercheur
    path('user_personal_info/', views.UserPersonalInfo.as_view(), name='user_personal_info'),


    path('patient-soins/', views.PatientSoins.as_view(), name='patient-soins'),
    path('patient-consultations/', views.PatientConsultations.as_view(), name='patient-consultations'),
    path('patient-personal_info/', views.PatientPersonalInfo.as_view(), name='patient-personal_info'),
    path('medecins_list/', views.ListeMedecins.as_view(), name='medecins_list'),
    path('patients_by_hospital/', views.PatientsByHospital.as_view(), name='patients_by_hospital'),
    path('demandes_bilan/', views.DemandesBilanByLaborantin.as_view(), name='demandes_bilan'),
    path('demandes_radio/', views.DemandesRadiosByRadiologue.as_view(), name='demandes_radio'),
    path('detail_bilan_radio/', views.BilanRadiologiqueDetail.as_view(), name='detail_bilan_radio'),
    path('detail_bilan_bio/', views.BilanBiologiqueDetail.as_view(), name='detail_bilan_bio'),
    path('docteur_patients/', views.DoctorPatients.as_view(), name='docteur_patients'),
    path('soins_infermier/', views.SoinsParInfirmier.as_view(), name='soins_infermier'),







]