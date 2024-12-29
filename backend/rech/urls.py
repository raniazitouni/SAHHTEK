from django.urls import path
from . import views 

urlpatterns = [
    path('ssn/', views.search_patient_by_ssn, name='search_user_by_ssn'),  
    
    
]