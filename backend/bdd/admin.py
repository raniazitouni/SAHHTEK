from django.contrib import admin
from .models import (
    AuthGroup,
    AuthGroupPermissions,
    AuthPermission,
    AuthUser,
    AuthUserGroups,
    AuthUserUserPermissions,
    Bilanbiologique,
    Bilanradiologique,
    Consultation,
    DjangoAdminLog,
    DjangoContentType,
    DjangoMigrations,
    DjangoSession,
    Dpi,
    Hopital,
    Medicament,
    Ordonnance,
    Ordonnancemedicament,
    Patient,
    Soinobservation,
    Tuser,
    Demandecertaficat,
    Demanderadio,
    Demandebilan
)

# Register your models here.

admin.site.register(AuthGroup)
admin.site.register(AuthGroupPermissions)
admin.site.register(AuthPermission)
admin.site.register(AuthUser)
admin.site.register(AuthUserGroups)
admin.site.register(AuthUserUserPermissions)
admin.site.register(Bilanbiologique)
admin.site.register(Bilanradiologique)
admin.site.register(Consultation)
admin.site.register(DjangoAdminLog)
admin.site.register(DjangoContentType)
admin.site.register(DjangoMigrations)
admin.site.register(DjangoSession)
admin.site.register(Dpi)
admin.site.register(Hopital)
admin.site.register(Medicament)
admin.site.register(Ordonnance)
admin.site.register(Ordonnancemedicament)
admin.site.register(Patient)
admin.site.register(Soinobservation)
admin.site.register(Tuser)
admin.site.register(Demandebilan)
admin.site.register(Demanderadio)
admin.site.register(Demandecertaficat)