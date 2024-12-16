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


class Bilanbiologique(models.Model):
    bilanbiologiqueid = models.AutoField(db_column='bilanBiologiqueId', primary_key=True)  # Field name made lowercase.
    userid = models.ForeignKey('Tuser', models.DO_NOTHING, db_column='userId', blank=True, null=True)  # Field name made lowercase.
    typebilan = models.CharField(db_column='typeBilan', max_length=12)  # Field name made lowercase.
    graphimage = models.TextField(db_column='graphImage', blank=True, null=True)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'bilanbiologique'


class Bilanradiologique(models.Model):
    bilanradiologiqueid = models.AutoField(db_column='bilanRadiologiqueId', primary_key=True)  # Field name made lowercase.
    radiotype = models.CharField(db_column='RadioType', max_length=12)  # Field name made lowercase.
    userid = models.ForeignKey('Tuser', models.DO_NOTHING, db_column='userId', blank=True, null=True)  # Field name made lowercase.
    compterendu = models.CharField(db_column='compteRendu', max_length=500)  # Field name made lowercase.
    image = models.CharField(max_length=500, blank=True, null=True)
    description = models.CharField(max_length=255, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'bilanradiologique'


class Consultation(models.Model):
    patientid = models.OneToOneField('Patient', models.DO_NOTHING, db_column='patientId', primary_key=True)  # Field name made lowercase. The composite primary key (patientId, userId, consulationDate) found, that is not supported. The first column is selected.
    userid = models.ForeignKey('Tuser', models.DO_NOTHING, db_column='userId')  # Field name made lowercase.
    consulationdate = models.DateField(db_column='consulationDate')  # Field name made lowercase.
    resumeconsultation = models.CharField(db_column='resumeconsultation', max_length=1000) 
    bilanbiologiqueid = models.OneToOneField(Bilanbiologique, models.DO_NOTHING, db_column='bilanBiologiqueId', blank=True, null=True)  # Field name made lowercase.
    bilanradiologiqueid = models.OneToOneField(Bilanradiologique, models.DO_NOTHING, db_column='bilanRadiologiqueId', blank=True, null=True)  # Field name made lowercase.
    ordonnanceid = models.ForeignKey('Ordonnance', models.DO_NOTHING, db_column='ordonnanceId', blank=True, null=True)  # Field name made lowercase.

    class Meta:
        managed = True
        db_table = 'consultation'
        unique_together = (('patientid', 'userid', 'consulationdate'),)


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


class Demandebilan(models.Model):
    demandebilanid = models.AutoField(db_column='demandebilanid', primary_key=True)  # Field name made lowercase.
    etatdemande = models.BooleanField(db_column='etatdemande',default=False) # Field name made lowercase.
    docteurid = models.ForeignKey('Tuser', on_delete=models.SET_NULL, db_column='docteurId', blank=True, null=True)  # Field name made lowercase.
    patientid = models.ForeignKey('Patient', on_delete=models.SET_NULL, db_column='patientId', blank=True, null=True)  # Field name made lowercase.
    laborantinid = models.ForeignKey('Tuser',on_delete=models.SET_NULL, db_column='laborantinId', related_name='demandebilan_laborantinid_set', blank=True, null=True)  # Field name made lowercase.
    TYPE_BILAN_CHOICES = [
        ('glycemie', 'glycémie'),
        ('pression', 'pression'),
        ('cholesterol','cholestérol')
    ]
    typebilan = models.CharField(db_column='typebilan', max_length=50,choices=TYPE_BILAN_CHOICES)   # Field name made lowercase.

    class Meta:
        managed = True
        db_table = 'demandebilan'


class Demandecertaficat(models.Model):
    demandecertaficatid = models.AutoField(db_column='demandeCertaficatId', primary_key=True)  # Field name made lowercase.
    etatdemande = models.IntegerField(db_column='etatDemande')  # Field name made lowercase.
    docteurid = models.ForeignKey('Tuser', models.DO_NOTHING, db_column='docteurId', blank=True, null=True)  # Field name made lowercase.
    patientid = models.ForeignKey('Patient', models.DO_NOTHING, db_column='patientId', blank=True, null=True)  # Field name made lowercase.
    contenudemande = models.CharField(db_column='contenuDemande', max_length=100)  # Field name made lowercase.
    datedenvoi = models.DateField(db_column='dateDenvoi', blank=True, null=True)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'demandecertaficat'


class Demanderadio(models.Model):
    demanderadioid = models.AutoField(db_column='demanderadioid', primary_key=True)  # Field name made lowercase.
    etatdemande = models.BooleanField(db_column='etatdemande',default=False)  # Field name made lowercase.
    docteurid = models.ForeignKey('Tuser', on_delete=models.SET_NULL, db_column='docteurId', blank=True, null=True)  # Field name made lowercase.
    patientid = models.ForeignKey('Patient', on_delete=models.SET_NULL, db_column='patientId', blank=True, null=True)  # Field name made lowercase.
    radiologueid = models.ForeignKey('Tuser', on_delete=models.SET_NULL, db_column='radiologueId', related_name='demanderadio_radiologueid_set', blank=True, null=True)  # Field name made lowercase.
    TYPE_RADIO_CHOICES = [
        ('IRM', 'IRM'),
        ('echographie', 'Échographie'),
        ('radiographic', 'Radiographie'),
        ('autre', 'Autre')
    ]
    typeradio = models.CharField(db_column='typeRadio', max_length=50,choices=TYPE_RADIO_CHOICES)  # Field name made lowercase.

    class Meta:
        managed = True
        db_table = 'demanderadio'


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
    qr = models.CharField(db_column='qr', max_length=100)  # Field name made lowercase.

    class Meta:
        managed = True
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
        managed = True
        db_table = 'medicament'


class Ordonnance(models.Model):
    ordonnanceid = models.AutoField(db_column='ordonnanceId', primary_key=True)  # Field name made lowercase.

    class Meta:
        managed = True
        db_table = 'ordonnance'


class Ordonnancemedicament(models.Model):
    ordonnanceid = models.OneToOneField(Ordonnance, models.DO_NOTHING, db_column='OrdonnanceId', primary_key=True)  # Field name made lowercase. The composite primary key (OrdonnanceId, medicamentId) found, that is not supported. The first column is selected.
    medicamentid = models.ForeignKey(Medicament,on_delete=models.CASCADE, db_column='medicamentId')  # Field name made lowercase.
    dose = models.CharField(max_length=100)
    duree = models.CharField(max_length=100)

    class Meta:
        managed = True
        db_table = 'ordonnancemedicament'
        unique_together = (('ordonnanceid', 'medicamentid'),)


class Patient(models.Model):
    patientid = models.CharField(db_column='patientid', primary_key=True, max_length=100)  # Field name made lowercase.
    mutuelle = models.CharField(max_length=100, blank=True, null=True)
    etatpatient = models.IntegerField(db_column='etatpatient',null=True)  # Field name made lowercase.
    personneacontacter = models.CharField(db_column='personneacontacter', max_length=100, blank=True, null=True)  # Field name made lowercase.

    class Meta:
        managed = True
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
    userid = models.AutoField(db_column='userid', primary_key=True)  # Field name made lowercase.
    patientid = models.ForeignKey(Patient,  db_column='patientid', blank=True, null=True , on_delete=models.SET_NULL)  # Field name made lowercase.
    nomuser = models.CharField(db_column='nomuser', max_length=100)  # Field name made lowercase.
    prenomuser = models.CharField(db_column='prenomuser', max_length=100)  # Field name made lowercase.
    telephone = models.CharField(db_column='telephone',max_length=100)
    datedenaissance = models.DateField(db_column='datedenaissance')  # Field name made lowercase.
    adresse = models.CharField(db_column='adresse',max_length=100)
    emailuser = models.CharField(db_column='emailuser', max_length=100)  # Field name made lowercase.
    password = models.CharField(db_column='password', max_length=255)
    hopitalid = models.ForeignKey(Hopital,  db_column='hopitalid', blank=True, null=True , on_delete=models.SET_NULL)  # Field name made lowercase.
    role = models.CharField(max_length=13)

    class Meta:
        managed = True
        db_table = 'tuser'
