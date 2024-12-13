# This is an auto-generated Django model module.
# You'll have to do the following manually to clean this up:
#   * Rearrange models' order
#   * Make sure each model has one field with primary_key=True
#   * Make sure each ForeignKey and OneToOneField has `on_delete` set to the desired behavior
#   * Remove `managed = False` lines if you wish to allow Django to create, modify, and delete the table
# Feel free to rename the models, but don't rename db_table values or field names.
from django.db import models


class AuthGroup(models.Model):
    name = models.CharField(unique=True, max_length=150)

    class Meta:
        managed = False
        db_table = 'auth_group'


class AuthGroupPermissions(models.Model):
    id = models.BigAutoField(primary_key=True)
    group = models.ForeignKey(AuthGroup, models.DO_NOTHING)
    permission = models.ForeignKey('AuthPermission', models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'auth_group_permissions'
        unique_together = (('group', 'permission'),)


class AuthPermission(models.Model):
    name = models.CharField(max_length=255)
    content_type = models.ForeignKey('DjangoContentType', models.DO_NOTHING)
    codename = models.CharField(max_length=100)

    class Meta:
        managed = False
        db_table = 'auth_permission'
        unique_together = (('content_type', 'codename'),)


class AuthUser(models.Model):
    password = models.CharField(max_length=128)
    last_login = models.DateTimeField(blank=True, null=True)
    is_superuser = models.IntegerField()
    username = models.CharField(unique=True, max_length=150)
    first_name = models.CharField(max_length=150)
    last_name = models.CharField(max_length=150)
    email = models.CharField(max_length=254)
    is_staff = models.IntegerField()
    is_active = models.IntegerField()
    date_joined = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'auth_user'


class AuthUserGroups(models.Model):
    id = models.BigAutoField(primary_key=True)
    user = models.ForeignKey(AuthUser, models.DO_NOTHING)
    group = models.ForeignKey(AuthGroup, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'auth_user_groups'
        unique_together = (('user', 'group'),)


class AuthUserUserPermissions(models.Model):
    id = models.BigAutoField(primary_key=True)
    user = models.ForeignKey(AuthUser, models.DO_NOTHING)
    permission = models.ForeignKey(AuthPermission, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'auth_user_user_permissions'
        unique_together = (('user', 'permission'),)


class Billanbiologique(models.Model):
    billanbiologiqueid = models.AutoField(db_column='billanBiologiqueId', primary_key=True)  # Field name made lowercase.
    userid = models.ForeignKey('Tuser', models.DO_NOTHING, db_column='userId', blank=True, null=True)  # Field name made lowercase.
    typebilan = models.CharField(db_column='typeBilan', max_length=12)  # Field name made lowercase.
    graphimage = models.TextField(db_column='graphImage', blank=True, null=True)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'billanbiologique'


class Billanradiologique(models.Model):
    billanradiologiqueid = models.AutoField(db_column='billanRadiologiqueId', primary_key=True)  # Field name made lowercase.
    radiotype = models.CharField(db_column='RadioType', max_length=12)  # Field name made lowercase.
    userid = models.ForeignKey('Tuser', models.DO_NOTHING, db_column='userId', blank=True, null=True)  # Field name made lowercase.
    compterendu = models.CharField(db_column='compteRendu', max_length=500)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'billanradiologique'


class Billanradiologiqueimages(models.Model):
    imageid = models.AutoField(db_column='imageId', primary_key=True)  # Field name made lowercase.
    billanradiologiqueid = models.ForeignKey(Billanradiologique, models.DO_NOTHING, db_column='billanRadiologiqueId', blank=True, null=True)  # Field name made lowercase.
    imagedata = models.TextField(db_column='imageData')  # Field name made lowercase.
    description = models.CharField(max_length=255, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'billanradiologiqueimages'


class Consultation(models.Model):
    patientid = models.OneToOneField('Patient', models.DO_NOTHING, db_column='patientId', primary_key=True)  # Field name made lowercase. The composite primary key (patientId, userId, consultationDate) found, that is not supported. The first column is selected.
    userid = models.ForeignKey('Tuser', models.DO_NOTHING, db_column='userId')  # Field name made lowercase.
    consultationdate = models.DateField(db_column='consultationDate')  # Field name made lowercase.
    billanbiologiqueid = models.ForeignKey(Billanbiologique, models.DO_NOTHING, db_column='billanBiologiqueId', blank=True, null=True)  # Field name made lowercase.
    billanradiologiqueid = models.ForeignKey(Billanradiologique, models.DO_NOTHING, db_column='billanRadiologiqueId', blank=True, null=True)  # Field name made lowercase.
    ordononceid = models.ForeignKey('Ordononce', models.DO_NOTHING, db_column='ordononceId', blank=True, null=True)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'consultation'
        unique_together = (('patientid', 'userid', 'consultationdate'),)


class Demande(models.Model):
    demandeid = models.AutoField(db_column='demandeId', primary_key=True)  # Field name made lowercase.
    etatdemande = models.IntegerField(db_column='etatDemande')  # Field name made lowercase.
    userid = models.ForeignKey('Tuser', models.DO_NOTHING, db_column='userId', blank=True, null=True)  # Field name made lowercase.
    typedemande = models.CharField(db_column='typeDemande', max_length=17)  # Field name made lowercase.
    contenudemande = models.CharField(db_column='contenuDemande', max_length=100)  # Field name made lowercase.
    datedenvoi = models.DateField(db_column='dateDenvoi', blank=True, null=True)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'demande'


class DjangoAdminLog(models.Model):
    action_time = models.DateTimeField()
    object_id = models.TextField(blank=True, null=True)
    object_repr = models.CharField(max_length=200)
    action_flag = models.PositiveSmallIntegerField()
    change_message = models.TextField()
    content_type = models.ForeignKey('DjangoContentType', models.DO_NOTHING, blank=True, null=True)
    user = models.ForeignKey(AuthUser, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'django_admin_log'


class DjangoContentType(models.Model):
    app_label = models.CharField(max_length=100)
    model = models.CharField(max_length=100)

    class Meta:
        managed = False
        db_table = 'django_content_type'
        unique_together = (('app_label', 'model'),)


class DjangoMigrations(models.Model):
    id = models.BigAutoField(primary_key=True)
    app = models.CharField(max_length=255)
    name = models.CharField(max_length=255)
    applied = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'django_migrations'


class DjangoSession(models.Model):
    session_key = models.CharField(primary_key=True, max_length=40)
    session_data = models.TextField()
    expire_date = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'django_session'


class Dpi(models.Model):
    patientid = models.OneToOneField('Patient', models.DO_NOTHING, db_column='patientId', primary_key=True)  # Field name made lowercase.
    qr = models.CharField(db_column='QR', max_length=100)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'dpi'


class Hopital(models.Model):
    hopitalid = models.AutoField(db_column='hopitalId', primary_key=True)  # Field name made lowercase.
    nomhopital = models.CharField(db_column='nomHopital', max_length=100)  # Field name made lowercase.
    localisation = models.CharField(max_length=100)

    class Meta:
        managed = False
        db_table = 'hopital'


class Medicament(models.Model):
    medicamentid = models.AutoField(db_column='medicamentId', primary_key=True)  # Field name made lowercase.
    nommedicament = models.CharField(db_column='nomMedicament', max_length=100)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'medicament'


class Ordononce(models.Model):
    ordononceid = models.AutoField(db_column='ordononceId', primary_key=True)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'ordononce'


class Ordononcemedicament(models.Model):
    ordononceid = models.OneToOneField(Ordononce, models.DO_NOTHING, db_column='ordononceId', primary_key=True)  # Field name made lowercase. The composite primary key (ordononceId, medicamentId) found, that is not supported. The first column is selected.
    medicamentid = models.ForeignKey(Medicament, models.DO_NOTHING, db_column='medicamentId')  # Field name made lowercase.
    dose = models.CharField(max_length=100)
    duree = models.CharField(max_length=100)

    class Meta:
        managed = False
        db_table = 'ordononcemedicament'
        unique_together = (('ordononceid', 'medicamentid'),)


class Patient(models.Model):
    patientid = models.CharField(db_column='patientId', primary_key=True, max_length=100)  # Field name made lowercase.
    userid = models.ForeignKey('Tuser', models.DO_NOTHING, db_column='userId', blank=True, null=True)  # Field name made lowercase.
    nompatient = models.CharField(db_column='nomPatient', max_length=100)  # Field name made lowercase.
    prenompatient = models.CharField(db_column='prenomPatient', max_length=100)  # Field name made lowercase.
    adressepatient = models.CharField(db_column='adressePatient', max_length=100)  # Field name made lowercase.
    telephonepatient = models.CharField(db_column='telephonePatient', max_length=15)  # Field name made lowercase.
    mutuelle = models.IntegerField(blank=True, null=True)
    etatpatient = models.IntegerField(db_column='etatPatient')  # Field name made lowercase.
    datedenaissancepatient = models.DateField(db_column='dateDeNaissancePatient', blank=True, null=True)  # Field name made lowercase.
    personneacontacter = models.CharField(db_column='personneAContacter', max_length=100, blank=True, null=True)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'patient'


class Soinobservation(models.Model):
    compteur = models.AutoField(primary_key=True)
    patientid = models.ForeignKey(Patient, models.DO_NOTHING, db_column='patientId', blank=True, null=True)  # Field name made lowercase.
    userid = models.ForeignKey('Tuser', models.DO_NOTHING, db_column='userId', blank=True, null=True)  # Field name made lowercase.
    consultationdate = models.DateField(db_column='consultationDate', blank=True, null=True)  # Field name made lowercase.
    descriptionsoin = models.CharField(db_column='descriptionSoin', max_length=200, blank=True, null=True)  # Field name made lowercase.
    observation = models.CharField(max_length=200, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'soinobservation'
        unique_together = (('patientid', 'userid', 'consultationdate'),)


class Tuser(models.Model):
    userid = models.AutoField(db_column='userId', primary_key=True)  # Field name made lowercase.
    patientid = models.ForeignKey(Patient, models.DO_NOTHING, db_column='patientId', blank=True, null=True)  # Field name made lowercase.
    nomuser = models.CharField(db_column='nomUser', max_length=100)  # Field name made lowercase.
    prenomuser = models.CharField(db_column='prenomUser', max_length=100)  # Field name made lowercase.
    emailuser = models.CharField(db_column='emailUser', max_length=100)  # Field name made lowercase.
    password = models.CharField(max_length=255)
    hopitalid = models.ForeignKey(Hopital, models.DO_NOTHING, db_column='hopitalId', blank=True, null=True)  # Field name made lowercase.
    role = models.CharField(max_length=13)

    class Meta:
        managed = False
        db_table = 'tuser'
