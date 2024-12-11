from django.contrib import admin
from .models import (
    AuthGroup,
    AuthGroupPermissions,
    AuthPermission,
    AuthUser,
    AuthUserGroups,
    AuthUserUserPermissions,
    Billanbiologique,
    Billanradiologique,
    Billanradiologiqueimages,
    Consultation,
    Demande,
    DjangoAdminLog,
    DjangoContentType,
    DjangoMigrations,
    DjangoSession,
    Dpi,
    Hopital,
    Medicament,
    Ordononce,
    Ordononcemedicament,
    Patient,
    Soinobservation,
    Tuser
)

# Register your models here.

admin.site.register(AuthGroup)
admin.site.register(AuthGroupPermissions)
admin.site.register(AuthPermission)
admin.site.register(AuthUser)
admin.site.register(AuthUserGroups)
admin.site.register(AuthUserUserPermissions)
admin.site.register(Billanbiologique)
admin.site.register(Billanradiologique)
admin.site.register(Billanradiologiqueimages)
admin.site.register(Consultation)
admin.site.register(Demande)
admin.site.register(DjangoAdminLog)
admin.site.register(DjangoContentType)
admin.site.register(DjangoMigrations)
admin.site.register(DjangoSession)
admin.site.register(Dpi)
admin.site.register(Hopital)
admin.site.register(Medicament)
admin.site.register(Ordononce)
admin.site.register(Ordononcemedicament)
admin.site.register(Patient)
admin.site.register(Soinobservation)
admin.site.register(Tuser)