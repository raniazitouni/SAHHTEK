from django.urls import path
from . import views

urlpatterns = [
    path('login/', views.login_user, name='login_user'),  
    path("forgot-password/", views.forgot_password, name="forgot_password"),
    path('reset_password/<str:reset_token>/', views.reset_password, name='reset_password'),
]
