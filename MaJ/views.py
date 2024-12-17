
from django.shortcuts import render
from django.http import JsonResponse
from bdd.models import Patient, Dpi , Tuser ,Demanderadio ,Demandebilan , Ordonnance, Medicament ,Ordonnancemedicament
from bdd.serializers import PatientSerializer, DpiSerializer , TuserSerializer,DemanderadioSerializer ,DemandebilanSerializer ,OrdonnanceSerializer ,OrdonnancemedicamentSerializer,MedicamentSerializer
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
            return Response({'message': 'DemandeRadio created successfully', 'demandeRadio': serializer_demandebilan.data}, status=status.HTTP_201_CREATED)
        else :
            return Response({'errors': {'demandeRadio': serializer_demandebilan.errors}}, status=status.HTTP_400_BAD_REQUEST)
        


class AjouterOrdonance(APIView):

    def post(self, request, *args, **kwargs):

        nomMed = request.data.get('', None)

        


      


        



         


                



