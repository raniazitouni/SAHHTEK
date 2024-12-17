from django.urls import path
from . import views 

urlpatterns = [
      path('CreateDpi/', views.CreateDpi.as_view(), name='Create-Dpi'),
      path('AjouterDemandeRadio/<str:patientid>/', views.AjouterDemandeRadio.as_view(), name='AjouterDemandeRadio'),
      path('AjouterDemandeBilan/<str:patientid>/', views.AjouterDemandeBilan.as_view(), name='AjouterDemandeBilan'),

    
]