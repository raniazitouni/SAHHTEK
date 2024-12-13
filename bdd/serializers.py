from rest_framework import serializers
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
    Demandebilan,
    Demanderadio,
    Demandecertaficat,
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

class AuthGroupSerializer(serializers.ModelSerializer):
    class Meta:
        model = AuthGroup
        fields = '__all__'


class AuthGroupPermissionsSerializer(serializers.ModelSerializer):
    class Meta:
        model = AuthGroupPermissions
        fields = '__all__'


class AuthPermissionSerializer(serializers.ModelSerializer):
    class Meta:
        model = AuthPermission
        fields = '__all__'


class AuthUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = AuthUser
        fields = '__all__'


class AuthUserGroupsSerializer(serializers.ModelSerializer):
    class Meta:
        model = AuthUserGroups
        fields = '__all__'


class AuthUserUserPermissionsSerializer(serializers.ModelSerializer):
    class Meta:
        model = AuthUserUserPermissions
        fields = '__all__'


class BillanbiologiqueSerializer(serializers.ModelSerializer):
    class Meta:
        model = Billanbiologique
        fields = '__all__'


class BillanradiologiqueSerializer(serializers.ModelSerializer):
    class Meta:
        model = Billanradiologique
        fields = '__all__'


class BillanradiologiqueimagesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Billanradiologiqueimages
        fields = '__all__'


class ConsultationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Consultation
        fields = '__all__'


class DemandeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Demande
        fields = ['demandeid', 'etatdemande', 'userid', 'typedemande', 'contenudemande', 'datedenvoi']

class DemandebilanSerializer(serializers.ModelSerializer):
    class Meta:
        model = Demandebilan
        fields = ['demandebilanid', 'etatdemande', 'docteurid', 'patientid', 'laborantinid', 'typebilan']

class DemandecertaficatSerializer(serializers.ModelSerializer):
    class Meta:
        model = Demandecertaficat
        fields = ['demandecertaficatid', 'etatdemande', 'docteurid', 'patientid', 'contenudemande', 'datedenvoi']

class DemanderadioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Demanderadio
        fields = ['demanderadioid', 'etatdemande', 'docteurid', 'patientid', 'radiologueid', 'typeradio']

class DjangoAdminLogSerializer(serializers.ModelSerializer):
    class Meta:
        model = DjangoAdminLog
        fields = '__all__'


class DjangoContentTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = DjangoContentType
        fields = '__all__'


class DjangoMigrationsSerializer(serializers.ModelSerializer):
    class Meta:
        model = DjangoMigrations
        fields = '__all__'


class DjangoSessionSerializer(serializers.ModelSerializer):
    class Meta:
        model = DjangoSession
        fields = '__all__'


class DpiSerializer(serializers.ModelSerializer):
    class Meta:
        model = Dpi
        fields = '__all__'


class HopitalSerializer(serializers.ModelSerializer):
    class Meta:
        model = Hopital
        fields = '__all__'


class MedicamentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Medicament
        fields = '__all__'


class OrdononceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ordononce
        fields = '__all__'


class OrdononcemedicamentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ordononcemedicament
        fields = '__all__'


class PatientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Patient
        fields = '__all__'


class SoinobservationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Soinobservation
        fields = '__all__'


class TuserSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tuser
        fields = '__all__'

