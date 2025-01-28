# This is an auto-generated Django model module.
# You'll have to do the following manually to clean this up:
#   * Rearrange models' order
#   * Make sure each model has one field with primary_key=True
#   * Make sure each ForeignKey and OneToOneField has `on_delete` set to the desired behavior
#   * Remove `managed = False` lines if you wish to allow Django to create, modify, and delete the table
# Feel free to rename the models, but don't rename db_table values or field names.
from django.db import models
from viewflow.fields import CompositeKey


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
    glycemievalue = models.FloatField(null=True, blank=True, default=None)
    pressionvalue = models.FloatField(null=True, blank=True, default=None)
    cholesterolvalue = models.FloatField(null=True, blank=True, default=None)
    resultdate = models.DateField(null=True, blank=True, default=None)  
   # etatbilan = models.BooleanField(db_column='etatbilan',default=False) # Field name made lowercase.
    # TYPE_BILAN_CHOICES = [
    #     ('glycemie', 'glycémie'),
    #     ('pression', 'pression'),
    #     ('cholesterol','cholestérol')
    # ]
    # typebilan = models.CharField(db_column='typebilan', max_length=50,choices=TYPE_BILAN_CHOICES,null=True)  

    class Meta:
        managed = False
        db_table = 'bilanbiologique'


class Bilanradiologique(models.Model):
    bilanradiologiqueid = models.AutoField(db_column='bilanRadiologiqueId', primary_key=True)  # Field name made lowercase.
    userid = models.ForeignKey('Tuser', models.DO_NOTHING, db_column='userId', blank=True, null=True)  # Field name made lowercase.
    compterendu = models.CharField(db_column='compteRendu', max_length=500)  # Field name made lowercase.
    image = models.ImageField(upload_to='uploads/images')
    TYPE_RADIO_CHOICES = [
        ('IRM', 'IRM'),
        ('echographie', 'Échographie'),
        ('radiographic', 'Radiographic'),
        ('autre', 'Autre')
    ]
    radiotype = models.CharField(db_column='Radiotype', max_length=50,choices=TYPE_RADIO_CHOICES)

    class Meta:
        managed = False
        db_table = 'bilanradiologique'


class Consultation(models.Model):
    patientid = models.ForeignKey('Patient', on_delete=models.CASCADE, db_column='patientid')  # Field name made lowercase. The composite primary key (patientId, userId, consulationDate) found, that is not supported. The first column is selected.
    userid = models.ForeignKey('Tuser', on_delete=models.CASCADE, db_column='userid',default="")  # Field name made lowercase.
    consulationdate = models.DateField(db_column='consulationdate' , default="0000-00-00")  # Field name made lowercase.
    resumeconsultation = models.CharField(db_column='resumeconsultation', max_length=1000 ,default="") 
    bilanbiologiqueid = models.OneToOneField(Bilanbiologique, on_delete=models.CASCADE, db_column='bilanBiologiqueId', blank=True, null=True)  # Field name made lowercase.
    bilanradiologiqueid = models.OneToOneField(Bilanradiologique,on_delete=models.CASCADE, db_column='bilanRadiologiqueId', blank=True, null=True)  # Field name made lowercase.
    ordonnanceid = models.ForeignKey('Ordonnance', on_delete=models.CASCADE, db_column='ordonnanceId', blank=True, null=True)  # Field name made lowercase.
    demanderadioid = models.ForeignKey('demanderadio', on_delete=models.CASCADE, db_column='demanderadioid', blank=True, null=True) 
    demandebilanid = models.ForeignKey('demandebilan', on_delete=models.CASCADE, db_column='demandebilanid', blank=True, null=True) 
    id = CompositeKey(columns=['patientid','userid','consulationdate'])
    
    class Meta:
        managed = True
        db_table = 'consultation'




class Demandebilan(models.Model):
    demandebilanid = models.AutoField(db_column='demandebilanid', primary_key=True)  # Field name made lowercase.
    etatdemande = models.BooleanField(db_column='etatdemande',default=False) # Field name made lowercase.
    docteurid = models.ForeignKey('Tuser', on_delete=models.SET_NULL, db_column='docteurId', blank=True, null=True)  # Field name made lowercase.
    patientid = models.ForeignKey('Patient', on_delete=models.SET_NULL, db_column='patientId', blank=True, null=True)  # Field name made lowercase.
    laborantinid = models.ForeignKey('Tuser',on_delete=models.SET_NULL, db_column='laborantinId', related_name='demandebilan_laborantinid_set', blank=True, null=True)  # Field name made lowercase.
    # TYPE_BILAN_CHOICES = [
    #     ('glycemie', 'glycémie'),
    #     ('pression', 'pression'),
    #     ('cholesterol','cholestérol')
    # ]
    # typebilan = models.CharField(db_column='typebilan', max_length=50,choices=TYPE_BILAN_CHOICES ,null=True)   # Field name made lowercase.
    datedenvoi = models.DateField(db_column='datedenvoi', blank=True, null=True)
    
    class Meta:
        managed = True
        db_table = 'demandebilan'


class Demandecertaficat(models.Model):
    demandecertaficatid = models.AutoField(db_column='demandecertaficatid', primary_key=True)
    etatdemande = models.BooleanField(db_column='etatdemande',default=False) # Field name made lowercase.
    docteurid = models.ForeignKey('Tuser', on_delete=models.CASCADE, db_column='docteurid', blank=True, null=True)
    patientid = models.ForeignKey('Patient', on_delete=models.CASCADE, db_column='patientid', blank=True, null=True)
    contenudemande = models.TextField(db_column='contenudemande',null=True)
    datedenvoi = models.DateField(db_column='datedenvoi', blank=True, null=True)
    certificatpdf = models.FileField(upload_to='uploads/certificats/', null=True, blank=True)

    def generate_certificat(self):
        # Extract relevant data from the 'Tuser' (for the patient) and 'Tuser' (for the doctor) models
        if self.patientid and self.docteurid:

            patient_user = Tuser.objects.filter(patientid=self.patientid).first()
            if patient_user:
                # Patient's data
                patient_name = f"{patient_user.nomuser} {patient_user.prenomuser}"  # Assuming patient info is in Tuser model
                patient_birthdate = patient_user.datedenaissance  # You may need to use another field in Patient for the birthdate

                # Doctor's name
                doctor_name = f"Dr. {self.docteurid.nomuser} {self.docteurid.prenomuser}"

                # Date of certificate issue
                current_date = self.datedenvoi

                # Constructing the certificate content
                certificat_text = f"""
                CERTIFICAT MÉDICAL

                Je soussigné(e), {doctor_name}, médecin traitant, certifie avoir examiné ce jour,
                Mme/M. {patient_name}, né(e) le {patient_birthdate},
                et atteste que cette personne est dans l'incapacité de travailler pour des raisons médicales.

                Je recommande un repos complet pour permettre une guérison optimale.

                Signature et cachet du médecin
                {current_date}
                """

                return certificat_text
            else:
                return "Patient non trouvé dans le système."
        else:
            return "Les informations nécessaires pour générer le certificat sont manquantes."
   

    def save(self, *args, **kwargs):
        # Automatically generate the content when saving the record
        self.contenudemande = self.generate_certificat()
        super(Demandecertaficat, self).save(*args, **kwargs)

    class Meta:
        managed = True
        db_table = 'demandecertaficat'



class Demanderadio(models.Model):
    demanderadioid = models.AutoField(db_column='demanderadioid', primary_key=True)  # Field name made lowercase.
    etatdemande = models.BooleanField(db_column='etatdemande',default=False)  # Field name made lowercase.
    docteurid = models.ForeignKey('Tuser', on_delete=models.SET_NULL, db_column='docteurId', blank=True, null=True)  # Field name made lowercase.
    patientid = models.ForeignKey('Patient', on_delete=models.SET_NULL, db_column='patientId', blank=True, null=True)  # Field name made lowercase.
    radiologueid = models.ForeignKey('Tuser', on_delete=models.SET_NULL, db_column='radiologueId', related_name='demanderadio_radiologueid_set', blank=True, null=True)  # Field name made lowercase.
    TYPE_RADIO_CHOICES = [
        ('IRM', 'IRM'),
        ('echographie', 'Echographie'),
        ('radiographic', 'Radiographic'),
        ('autre', 'Autre')
    ]
    typeradio = models.CharField(db_column='typeRadio', max_length=50,choices=TYPE_RADIO_CHOICES)  # Field name made lowercase.
    datedenvoi = models.DateField(db_column='datedenvoi', blank=True, null=True)
    
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
    demandecertaficatid = models.ForeignKey('Demandecertaficat',on_delete=models.CASCADE, db_column='demandecertaficatid' , null=True)  # Field name made lowercase.

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
    nommedicament = models.CharField(db_column='nommedicament', max_length=100)  # Field name made lowercase.

    class Meta:
        managed = True
        db_table = 'medicament'


class Ordonnance(models.Model):
    ordonnanceid = models.AutoField(db_column='ordonnanceId', primary_key=True)  # Field name made lowercase.
    validated = models.BooleanField(db_column='validated',default=False)  # Field name made lowercase.

    class Meta:
        managed = True
        db_table = 'ordonnance'


class Ordonnancemedicament(models.Model):
    Ordonnanceid = models.ForeignKey('Ordonnance',on_delete=models.CASCADE, db_column='Ordonnanceid',default="")  # Field name made lowercase.
    medicamentid = models.ForeignKey('Medicament',on_delete=models.CASCADE, db_column='medicamentid',default="")  # Field name made lowercase.
    dose = models.CharField(max_length=100)
    duree = models.CharField(max_length=100)
    id = CompositeKey(columns=['Ordonnanceid','medicamentid'])

    class Meta:
        managed = True
        db_table = 'ordonnancemedicament'
        # unique_together = (('Ordonnanceid', 'medicamentid'),)


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
    patientid = models.ForeignKey(Patient,  on_delete=models.CASCADE, db_column='patientid', blank=True, null=True)  # Field name made lowercase.
    userid = models.ForeignKey('Tuser',  on_delete=models.CASCADE, db_column='userid', blank=True, null=True)  # Field name made lowercase.
    consultationdate = models.DateField(db_column='consultationdate', blank=True, null=True)  # Field name made lowercase.
    descriptionsoin = models.CharField(db_column='descriptionsoin', max_length=200, blank=True, null=True)  # Field name made lowercase.
    observation = models.CharField(max_length=200, blank=True, null=True)
    id = CompositeKey(columns=['patientid','userid','consultationdate'])

    class Meta:
        managed = True
        db_table = 'soinobservation'
       


class Tuser(models.Model):
    userid = models.AutoField(db_column='userid', primary_key=True)  # Field name made lowercase.
    patientid = models.ForeignKey(Patient,  db_column='patientid', blank=True, null=True , on_delete=models.SET_NULL)  # Field name made lowercase.
    nomuser = models.CharField(db_column='nomuser', max_length=100)  # Field name made lowercase.
    prenomuser = models.CharField(db_column='prenomuser', max_length=100)  # Field name made lowercase.
    telephone = models.CharField(db_column='telephone',max_length=100,default="")
    datedenaissance = models.DateField(db_column='datedenaissance',default="0000-00-00")  # Field name made lowercase.
    adresse = models.CharField(db_column='adresse',max_length=100,default="")
    emailuser = models.CharField(db_column='emailuser', max_length=100)  # Field name made lowercase.
    password = models.CharField(db_column='password', max_length=255)
    oldpassword = models.CharField(db_column='oldpassword', max_length=255 , null = True)
    hopitalid = models.ForeignKey(Hopital,  db_column='hopitalid', blank=True, null=True , on_delete=models.SET_NULL)  # Field name made lowercase.
    role = models.CharField(max_length=13)

    class Meta:
        managed = True
        db_table = 'tuser'
