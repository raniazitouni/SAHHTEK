from rest_framework import serializers
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
    Ordonnance,
    Ordonnancemedicament,
    Patient,
    Soinobservation,
    Tuser,
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


class BilanbiologiqueSerializer(serializers.ModelSerializer):
    class Meta:
        model = Bilanbiologique
        fields = '__all__'


class BilanradiologiqueSerializer(serializers.ModelSerializer):
    class Meta:
        model = Bilanradiologique
        fields = '__all__'


class ConsultationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Consultation
        fields = '__all__'


class DemandeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Demande
        fields = '__all__'

class DemandebilanSerializer(serializers.ModelSerializer):
    class Meta:
        model = Demandebilan
        fields = '__all__'

class DemandecertaficatSerializer(serializers.ModelSerializer):
    class Meta:
        model = Demandecertaficat
        fields = '__all__'

class DemanderadioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Demanderadio
        fields = '__all__'

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


class OrdonnanceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ordonnance
        fields = '__all__'


class OrdonnancemedicamentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ordonnancemedicament
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


class TuserUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tuser
        fields = ['nomuser' , 'prenomuser','datedenaissance','adresse']


class  PasswordResetSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tuser
        fields = ['password' , 'oldpassword']

