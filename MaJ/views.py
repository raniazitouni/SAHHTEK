
from django.shortcuts import render
from django.http import JsonResponse
from bdd.models import Patient, Dpi , Tuser ,Demanderadio ,Demandebilan , Ordonnance, Medicament ,Ordonnancemedicament ,Consultation ,Bilanradiologique
from bdd.serializers import PatientSerializer, DpiSerializer , TuserSerializer,DemanderadioSerializer ,DemandebilanSerializer ,OrdonnanceSerializer ,OrdonnancemedicamentSerializer,MedicamentSerializer,ConsultationSerializer,BilanradiologiqueSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth.models import  User
import secrets
import string
from django.db import transaction
from django.contrib.auth.hashers import make_password
# Create your views here.


#this one will go in the create dpi functionnality 
def generate_password(length=10):
    alphabet = string.ascii_letters + string.digits  # Letters (upper & lower) and digits
    return ''.join(secrets.choice(alphabet) for _ in range(length))

class CreateDpi(APIView):

    def post(self, request, *args, **kwargs):
        # Extract the patient id 
        userid = request.data.get('patientid', None)
        if userid :
             personneacontacter = request.data.get('personneacontacter', None)
             mutuelle = request.data.get('mutuelle', None)
             etatpatient = request.data.get('etatpatient', None)

            #  if not personneacontacter : 
            #    personneacontacter = request.data.pop('personneAContacter')
            #  if not mutuelle : 
            #    mutuelle = request.data.pop('mutuelle')
            #  if not etatpatient  : 
            #    etatpatient  = request.data.pop('etatPatient')

             # Check if a patient with the same details already exists
             patient = Patient.objects.filter( patientid = userid ).first()
             if not patient:
                request.data['role'] = 'patient'
                request.data['qr'] = userid
                
                # Generate a random password
                plain_password = generate_password()
                request.data['password'] = make_password(plain_password)

                #if one of the serializers is not valid , the transation would roollback
                with transaction.atomic():

                  serializer_patient = PatientSerializer(data=request.data)
                  if serializer_patient.is_valid() : 
                      serializer_patient.save()
                      serializer_user = TuserSerializer(data=request.data)
                      if not serializer_user.is_valid():
                           # If user is invalid, rollback the transaction
                           raise transaction.TransactionManagementError(serializer_user.errors)
                      serializer_user.save()
                      serializer_dpi = DpiSerializer(data=request.data)
                      if not serializer_dpi.is_valid():
                            # If Dpi is invalid, rollback the transaction
                            raise transaction.TransactionManagementError(serializer_dpi.errors)
                      serializer_dpi.save()
                      return Response({'message': 'Object created successfully'}, status=status.HTTP_201_CREATED)
                  else:
                        # Return errors for patient serializer
                        return Response({'errors': {'patient': serializer_patient.errors}}, status=status.HTTP_400_BAD_REQUEST)
             else : 
               return Response({'message': 'Patient with given NSS already exists'}) 
        else : 
               return Response({'message': 'Patient with no NSS'}) 


class AjouterDemandeRadio(APIView):

    def post(self, request, *args, **kwargs):

        request.user = Tuser.objects.get(userid=4) #remove that when u add auth 
        docteur = request.user  # Assuming authentication is handled and the user is a doctor
        if not isinstance(docteur, Tuser):
            return Response({'error': 'Invalid doctor'}, status=status.HTTP_403_FORBIDDEN)
        
        patient_id = kwargs.get('patientid')  # Extract patient_id from the URL AjouterDemandeRadio/<str:patient_id>/
        try:
            patient = Patient.objects.get(patientid=patient_id)
        except Patient.DoesNotExist:
            return Response({'error': 'Patient not found'}, status=status.HTTP_404_NOT_FOUND)
        
        request.data['etatdemande'] = False
        request.data['patientid'] = patient.patientid
        request.data['docteurid'] = docteur.userid

        serializer_demanderadio = DemanderadioSerializer(data=request.data)
        if serializer_demanderadio.is_valid() : 
            serializer_demanderadio.save()
            return Response({'message': 'DemandeRadio created successfully', 'demandeRadio': serializer_demanderadio.data}, status=status.HTTP_201_CREATED)
        else :
            return Response({'errors': {'demandeRadio': serializer_demanderadio.errors}}, status=status.HTTP_400_BAD_REQUEST)


class AjouterDemandeBilan(APIView):

    def post(self, request, *args, **kwargs):

        request.user = Tuser.objects.get(userid=4) #remove that when u add auth 
        docteur = request.user  # Assuming authentication is handled and the user is a doctor
        if not isinstance(docteur, Tuser):
            return Response({'error': 'Invalid doctor'}, status=status.HTTP_403_FORBIDDEN)
        
        patient_id = kwargs.get('patientid')  # Extract patient_id from the URL AjouterDemandeRadio/<str:patient_id>/
        try:
            patient = Patient.objects.get(patientid=patient_id)
        except Patient.DoesNotExist:
            return Response({'error': 'Patient not found'}, status=status.HTTP_404_NOT_FOUND)
        
        request.data['etatdemande'] = False
        request.data['patientid'] = patient.patientid
        request.data['docteurid'] = docteur.userid

        serializer_demandebilan = DemandebilanSerializer(data=request.data)
        if serializer_demandebilan.is_valid() : 
            serializer_demandebilan.save()
            return Response({'message': 'Demandbillan created successfully', 'demandeBillan': serializer_demandebilan.data}, status=status.HTTP_201_CREATED)
        else :
            return Response({'errors': {'demandeBillan': serializer_demandebilan.errors}}, status=status.HTTP_400_BAD_REQUEST)
        


class AjouterOrdonance(APIView):

    def post(self, request, *args, **kwargs):
        
        with transaction.atomic():
            #create ordonance
            serializer_ordonnance = OrdonnanceSerializer(data={})
            if serializer_ordonnance.is_valid() : 
                ordonnance = serializer_ordonnance.save()
                for med_data in request.data:
                    #recuperer id 
                    med_data['Ordonnanceid'] = ordonnance.ordonnanceid
                    #extract nom de med 
                    nomMed = med_data.get('nommedicament', None)
                    med = Medicament.objects.filter( nommedicament = nomMed ).first()
                    if not med:
                        #create medicament
                        serializer_med = MedicamentSerializer(data=med_data)
                        if serializer_med.is_valid() : 
                            serializer_med.save()
                            med_data['medicamentid'] = serializer_med.data.get('medicamentid')
                        else : 
                            #rolldown transaction
                            raise transaction.TransactionManagementError(serializer_med.errors)
                    else :
                        med_data['medicamentid'] = med.medicamentid
                    #testing if the ordonance and med already exist 
                    existing_ordonnance_med = Ordonnancemedicament.objects.filter(
                        Ordonnanceid=med_data['Ordonnanceid'],
                        medicamentid=med_data['medicamentid']
                    ).exists()
                    #create ordonnance medicament
                    if not existing_ordonnance_med : 
                        serializer_ordonnancemed = OrdonnancemedicamentSerializer(data=med_data)
                        if serializer_ordonnancemed.is_valid() : 
                            serializer_ordonnancemed.save()
                        else : 
                            #rolldown transaction
                            raise transaction.TransactionManagementError(serializer_ordonnancemed.errors)
                    else : 
                        raise transaction.TransactionManagementError({'message' : 'combination already exist'})
                return Response({'message': 'ordonnance created successfully', 'ordonance' : serializer_ordonnance.data}, status=status.HTTP_201_CREATED)
            else : 
               return Response({'errors': {'ordonnance': serializer_ordonnance.errors}}, status=status.HTTP_400_BAD_REQUEST)



class AjouterConsultation(APIView):

    def post(self, request, *args, **kwargs):

        request.user = Tuser.objects.get(userid=4) #remove that when u add auth 
        docteur = request.user  # Assuming authentication is handled and the user is a doctor
        if not isinstance(docteur, Tuser):
            return Response({'error': 'Invalid doctor'}, status=status.HTTP_403_FORBIDDEN)
        
        patient_id = kwargs.get('patientid')  # Extract patient_id from the URL AjouterDemandeRadio/<str:patient_id>/
        try:
            patient = Patient.objects.get(patientid=patient_id)
        except Patient.DoesNotExist:
            return Response({'error': 'Patient not found'}, status=status.HTTP_404_NOT_FOUND)
        
        request.data['patientid'] = patient.patientid
        request.data['userid'] = docteur.userid
        
        serializer_consultation = ConsultationSerializer(data=request.data)
        if serializer_consultation.is_valid() : 
            serializer_consultation.save()
            return Response({'message': 'Consultation created successfully'}, status=status.HTTP_201_CREATED)
        else :
            return Response({'errors': {'consultation': serializer_consultation.errors}}, status=status.HTTP_400_BAD_REQUEST)
        

class AjouterRadio(APIView):

    def post(self, request, *args, **kwargs):

        request.user = Tuser.objects.get(userid=4) #remove that when u add auth 
        radiologue= request.user  # Assuming authentication is handled and the user is a doctor
        if not isinstance(radiologue, Tuser):
            return Response({'error': 'Invalid doctor'}, status=status.HTTP_403_FORBIDDEN)
        request.data['userid'] = radiologue.userid
        serializer_radio = BilanradiologiqueSerializer(data=request.data)
        if serializer_radio.is_valid() : 
            serializer_radio.save()
            return Response({'message': 'Radio created successfully'}, status=status.HTTP_201_CREATED)
        else :
            return Response({'errors': {'Radio': serializer_radio.errors}}, status=status.HTTP_400_BAD_REQUEST)

        
        


       


       





        

               







       





        


      


        



         


                



