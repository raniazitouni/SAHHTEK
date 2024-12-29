from django.urls import path
from . import views

urlpatterns = [
    path('login/', views.login_user, name='login_user'),  
    path("forgot-password/", views.forgot_password, name="forgot_password"),

]
