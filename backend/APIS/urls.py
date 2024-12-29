from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),
    path('maj/', include('MaJ.urls')),
    path('recherche/', include('rech.urls')),
    path('profil/', include('profil.urls')),
    path('', include('authentification.urls')), 
    path('authentification/', include('django.contrib.auth.urls')) #to use django's authentif system
]



if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

