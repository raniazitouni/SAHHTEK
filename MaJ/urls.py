from django.urls import path
from . import views 

urlpatterns = [
      path('CreateDpi/', views.CreateDpi.as_view(), name='CreateDpi'),
      path('AjouterDemandeRadio/<str:patientid>/', views.AjouterDemandeRadio.as_view(), name='AjouterDemandeRadio'),
      path('AjouterDemandeBilan/<str:patientid>/', views.AjouterDemandeBilan.as_view(), name='AjouterDemandeBilan'),
      path('AjouterOrdonance/', views.AjouterOrdonance.as_view(), name='AjouterOrdonance'),
      path('AjouterConsultation/<str:patientid>/', views.AjouterConsultation.as_view(), name='AjouterConsultation'),
      path('AjouterRadio/', views.AjouterRadio.as_view(), name='AjouterRadio'),
      path('AjouterBillan/<str:patientid>/', views.AjouterBillan.as_view(), name='AjouterBillan'),
      path('AjouterDemandeCertaficat/<str:patientid>/', views.AjouterDemandeCertaficat.as_view(), name='AjouterDemandeCertaficat'),
      path('AjouterSoin/', views.AjouterSoin.as_view(), name='AjouterSoin'),
      path('AjouterObservation/', views.AjouterObservation.as_view(), name='AjouterObservation'),
      path('UpdateUserInfo/', views.UpdateUserInfo.as_view(), name='UpdateUserInfo'),
      path('ResetPassword/', views.ResetPassword.as_view(), name='ResetPassword'),
]