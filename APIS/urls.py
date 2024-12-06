from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('maj/', include('MaJ.urls')),
    path('recherche/', include('rech.urls')),
    path('profil/', include('profil.urls')),
    path('', include('authentification.urls')), 
    path('authentification/', include('django.contrib.auth.urls')) #to use django's authentif system
]
