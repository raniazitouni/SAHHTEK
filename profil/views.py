from django.db import connection
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

class UserPersonalInfo(APIView):
    '''
    API pour obtenir les informations personnelles d'un chercheur.
    '''
    def get_User_info(self, userId):
        """
        Obtenir les informations de l'utilisateur à partir de son userId.
        Utilisation directe d'une requête SQL.
        """
        try:
            # Créer une requête SQL pour chercher un utilisateur par userId
            query = """
                SELECT userId,patientId , nomUser, prenomUser, telephone, dateDeNaissance, adresse, emailUser
                FROM Tuser
                WHERE userId = %s
            """
            # Exécuter la requête avec userId comme paramètre
            with connection.cursor() as cursor:
                cursor.execute(query, [userId])
                user_info = cursor.fetchone()  # Nous récupérons le premier résultat

            if user_info:
                # Créer une réponse avec les informations utilisateurs
                data = {
                    'userId': user_info[0],
                    'patientId': user_info[1],
                    'nomUser': user_info[2],
                    'prenomUser': user_info[3],
                    'telephone': user_info[4],
                    'dateDeNaissance': str(user_info[5]),
                    'adresse': user_info[6],
                    'emailUser': user_info[7]
                }
                return data
            else:
                return {'error': 'Utilisateur non trouvé'}

        except Exception as e:
            return {'error': str(e)}

    def post(self, request):
        """
        Endpoint POST pour obtenir les informations personnelles d'un utilisateur.
        """
        userId = request.data.get('userId', None)
        
        if userId:
            data = self.get_User_info(userId)
            if 'error' in data:
                return Response(data, status=status.HTTP_404_NOT_FOUND)
            return Response(data, status=status.HTTP_200_OK)
        else:
            return Response({'error': 'userId non fourni'}, status=status.HTTP_400_BAD_REQUEST)

#################################################################################################################

class PatientSoins(APIView):
    def get_soins_for_patient(self, patientId):
        """
        Récupérer les soins d'un patient : date, userId, nom, prénom, description et observation.
        """
        try:
            query = """
                SELECT 
                    so.consultationDate,
                    so.userId,
                    t.nomUser,
                    t.prenomUser,
                    so.descriptionSoin,
                    so.observation

                FROM 
                    SoinObservation so
                LEFT JOIN Tuser t ON so.userId = t.userId
                WHERE 
                    so.patientId = %s
                ORDER BY so.consultationDate DESC;
            """
            
            with connection.cursor() as cursor:
                cursor.execute(query, [patientId])
                soins = cursor.fetchall()
            
            # Structurer les données en JSON
            result = {
                "patientId": patientId,
                "soins": [
                    {
                        "consultationDate": soin[0],
                        "userId": soin[1],
                        "nomUser": soin[2],
                        "prenomUser": soin[3],
                        "descriptionSoin": soin[4],
                        "observation": soin[5],  
                    }
                    for soin in soins
                ]
            }
            return result

        except Exception as e:
            return {"error": str(e)}

    def post(self, request):
        """
        Récupérer les soins d'un patient via une requête POST.
        """
        patientId = request.data.get("patientId", None)

        if not patientId:
            return Response(
                {"error": "patientId non fourni"},
                status=status.HTTP_400_BAD_REQUEST
            )

        soins = self.get_soins_for_patient(patientId)
        if "error" in soins:
            return Response({"error": soins["error"]}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        if not soins["soins"]:
            return Response({"message": "Aucun soin trouvé pour ce patient."}, status=status.HTTP_404_NOT_FOUND)

        return Response(soins, status=status.HTTP_200_OK)

#####################################################################################################################################
class PatientConsultations(APIView):
    """
    API pour récupérer la liste des consultations d'un patient, incluant les informations des ordonnances,
    des bilans radiologiques et biologiques associées.
    """

    def get_ordonnance_details(self, ordonnanceId):
        """
        Récupérer les détails de l'ordonnance (médicaments, dose, durée) à partir de l'ordonnanceId.
        """
        try:
            query = """
                SELECT 
                    m.nomMedicament, 
                    om.dose, 
                    om.duree
                FROM 
                    OrdonnanceMedicament om
                JOIN 
                    Medicament m ON m.medicamentId = om.medicamentId
                WHERE 
                    om.OrdonnanceId = %s
            """
            with connection.cursor() as cursor:
                cursor.execute(query, [ordonnanceId])
                medicaments = cursor.fetchall()

            if medicaments:
                return [
                    {
                        "nomMedicament": medicament[0],
                        "dose": medicament[1],
                        "duree": medicament[2]
                    } for medicament in medicaments
                ]
            else:
                return []

        except Exception as e:
            return {"error": str(e)}

    def get_bilan_radiologique_details(self, bilanRadiologiqueId):
        """
        Récupérer les détails du bilan radiologique (type, compte rendu, image et utilisateur associé).
        """
        try:
            query = """
                SELECT 
                    b.RadioType, 
                    b.compteRendu, 
                    b.image, 
                    u.userId,
                    u.nomUser, 
                    u.prenomUser
                FROM 
                    BilanRadiologique b
                JOIN 
                    Tuser u ON b.userId = u.userId
                WHERE 
                    b.bilanRadiologiqueId = %s
            """

            with connection.cursor() as cursor:
                cursor.execute(query, [bilanRadiologiqueId])
                bilan_details = cursor.fetchone()

            if bilan_details:
                return {
                    "type": bilan_details[0],
                    "compteRendu": bilan_details[1],
                    "image": bilan_details[2],
                    "userId": bilan_details[3],
                    "nomUser": bilan_details[4],
                    "prenomUser": bilan_details[5]
                }
            else:
                return None

        except Exception as e:
            return {"error": str(e)}

    def get_bilan_biologique_details(self, bilanBiologiqueId):
        """
        Récupérer les détails du bilan biologique (glycémie, pression, cholestérol et utilisateur associé).
        """
        try:
            query = """
                SELECT 
                    b.glycemieValue,
                    b.pressionValue,
                    b.cholesterolValue,
                    b.resultDate,
                    u.userId,
                    u.nomUser, 
                    u.prenomUser
                FROM 
                    BilanBiologique b
                JOIN 
                    Tuser u ON b.userId = u.userId
                WHERE 
                    b.bilanBiologiqueId = %s
            """

            with connection.cursor() as cursor:
                cursor.execute(query, [bilanBiologiqueId])
                bilan_bio_details = cursor.fetchone()

            if bilan_bio_details:
                return {
                    "glycemieValue": bilan_bio_details[0],
                    "pressionValue": bilan_bio_details[1],
                    "cholesterolValue": bilan_bio_details[2],
                    "resultDate": str(bilan_bio_details[3]),  # Conversion en string de la date
                    "userId": bilan_bio_details[4],
                    "nomUser": bilan_bio_details[5],
                    "prenomUser": bilan_bio_details[6]
                }
            else:
                return None

        except Exception as e:
            return {"error": str(e)}

    def get_patient_consultations(self, patientId):
        """
        Récupérer les consultations d'un patient, y compris les informations liées aux ordonnances,
        bilans radiologiques et biologiques.
        """
        try:
            query = """
                SELECT 
                    c.consulationDate,
                    c.userId,
                    u.nomUser,
                    u.prenomUser,
                    c.resumeconsultation,
                    c.bilanBiologiqueId,
                    c.bilanRadiologiqueId,
                    c.ordonnanceId
                FROM 
                    Consultation c
                JOIN 
                    Tuser u ON c.userId = u.userId
                LEFT JOIN 
                    Ordonnance o ON c.ordonnanceId = o.ordonnanceId
                WHERE 
                    c.patientId = %s;
            """

            with connection.cursor() as cursor:
                cursor.execute(query, [patientId])
                consultations = cursor.fetchall()

            if consultations:
                result = []
                for consultation in consultations:
                    ordonnance_details = []
                    bilan_radiologique_details = None
                    bilan_biologique_details = None
                    ordonnanceId = consultation[7]
                    bilanRadiologiqueId = consultation[6]
                    bilanBiologiqueId = consultation[5]
                    
                    # Ajouter les détails de l'ordonnance si elle existe
                    if ordonnanceId:
                        ordonnance_details = self.get_ordonnance_details(ordonnanceId)
                    
                    # Ajouter les détails du bilan radiologique si disponible
                    if bilanRadiologiqueId:
                        bilan_radiologique_details = self.get_bilan_radiologique_details(bilanRadiologiqueId)

                    # Ajouter les détails du bilan biologique si disponible
                    if bilanBiologiqueId:
                        bilan_biologique_details = self.get_bilan_biologique_details(bilanBiologiqueId)

                    result.append({
                        "consultationDate": str(consultation[0]),  # Conversion en string
                        "userId": consultation[1],
                        "nomUser": consultation[2],
                        "prenomUser": consultation[3],
                        "resumeConsultation": consultation[4],
                        "bilanBiologiqueId": bilanBiologiqueId,
                        "bilanRadiologiqueId": bilanRadiologiqueId,
                        "ordonnanceId": ordonnanceId,
                        "ordonnanceDetails": ordonnance_details,  # Informations sur les médicaments
                        "bilanRadiologiqueDetails": bilan_radiologique_details,  # Détails du bilan radiologique
                        "bilanBiologiqueDetails": bilan_biologique_details  # Détails du bilan biologique
                    })
                return result
            else:
                return {"error": "Aucune consultation trouvée pour ce patient"}

        except Exception as e:
            return {"error": str(e)}

    def post(self, request):
        """
        Récupérer la liste des consultations d'un patient via une requête POST.
        """
        patientId = request.data.get("patientId", None)

        if not patientId:
            return Response({"error": "patientId non fourni"}, status=status.HTTP_400_BAD_REQUEST)

        consultations = self.get_patient_consultations(patientId)

        if isinstance(consultations, dict) and "error" in consultations:
            return Response({"error": consultations["error"]}, status=status.HTTP_404_NOT_FOUND)

        return Response(consultations, status=status.HTTP_200_OK)

################################################################################################################################################

class PatientPersonalInfo(APIView):
    """
    API pour récupérer les informations spécifiques d'un patient.
    """

    def get_patient_info(self, patientId):
        """
        Récupérer les informations spécifiques d'un patient à partir de son patientId.
        """
        try:
            query = """
                SELECT 
                    patientId,
                    mutuelle,
                    etatPatient,
                    personneAContacter
                FROM 
                    Patient
                WHERE 
                    patientId = %s;
            """

            with connection.cursor() as cursor:
                cursor.execute(query, [patientId])
                patient = cursor.fetchone()

            if patient:
                data = {
                    "patientId": patient[0],
                    "mutuelle": patient[1],
                    "etatPatient": bool(patient[2]),
                    "personneAContacter": patient[3],
                }
                return data
            else:
                return {"error": "Patient non trouvé"}

        except Exception as e:
            return {"error": str(e)}

    def post(self, request):
        """
        Récupérer les informations d'un patient via une requête POST.
        """
        patientId = request.data.get("patientId", None)

        if not patientId:
            return Response({"error": "patientId non fourni"}, status=status.HTTP_400_BAD_REQUEST)

        patient_info = self.get_patient_info(patientId)

        if "error" in patient_info:
            return Response({"error": patient_info["error"]}, status=status.HTTP_404_NOT_FOUND)

        return Response(patient_info, status=status.HTTP_200_OK)


####################################################################################################################################
class ListeMedecins(APIView):
    """
    API pour récupérer la liste des médecins d'un hôpital donné.
    """

    def get_list_medecins(self, hopitalId):
        """
        Récupérer la liste des médecins d'un hôpital à partir de l'hopitalId.
        """
        try:
            # Récupérer les informations des médecins associés à un hôpital donné
            query = """
                SELECT 
                    u.userId,
                    u.nomUser,
                    u.prenomUser,
                    u.telephone,
                    u.dateDeNaissance,
                    u.adresse,
                    u.emailUser,
                    h.nomHopital,
                    h.localisation
                FROM 
                    Tuser u
                JOIN 
                    Hopital h ON u.hopitalId = h.hopitalId
                WHERE 
                    u.role = 'docteur' AND u.hopitalId = %s;
            """
            with connection.cursor() as cursor:
                cursor.execute(query, [hopitalId])
                medecins = cursor.fetchall()

            if medecins:
                result = []
                for medecin in medecins:
                    result.append({
                        "userId": medecin[0],
                        "nomUser": medecin[1],
                        "prenomUser": medecin[2],
                        "telephone": medecin[3],
                        "dateDeNaissance": str(medecin[4]),
                        "adresse": medecin[5],
                        "emailUser": medecin[6],
                        "hopitalNom": medecin[7],
                        "hopitalLocalisation": medecin[8]
                    })
                return result
            else:
                return {"error": "Aucun médecin trouvé pour cet hôpital"}

        except Exception as e:
            return {"error": str(e)}

    def post(self, request):
        """
        Récupérer la liste des médecins par hôpital via une requête POST.
        """
        hopitalId = request.data.get("hopitalId", None)

        if not hopitalId:
            return Response({"error": "hopitalId non fourni"}, status=status.HTTP_400_BAD_REQUEST)

        medecins = self.get_list_medecins(hopitalId)

        if isinstance(medecins, dict) and "error" in medecins:
            return Response({"error": medecins["error"]}, status=status.HTTP_404_NOT_FOUND)

        return Response(medecins, status=status.HTTP_200_OK)


##################################################################################################################################


class PatientsByHospital(APIView):
    """
    API pour récupérer la liste des patients d'un hopital donné, 
    incluant les informations de Tuser pour chaque patient.
    """

    def get_patients_by_hopital(self, hopitalId):
        """
        Récupérer les patients d'un hôpital, ainsi que leurs informations de la table Tuser.
        """
        try:
            query = """
                SELECT 
                    p.patientId,
                    p.mutuelle,
                    p.etatPatient,
                    p.personneAContacter,
                    u.userId,
                    u.nomUser,
                    u.prenomUser,
                    u.telephone,
                    u.dateDeNaissance,
                    u.adresse,
                    u.emailUser
                FROM 
                    Patient p
                JOIN 
                    Tuser u ON p.patientId = u.patientId
                WHERE 
                    u.hopitalId = %s;
            """

            with connection.cursor() as cursor:
                cursor.execute(query, [hopitalId])
                patients = cursor.fetchall()

            if patients:
                result = []
                for patient in patients:
                    result.append({
                        "patientId": patient[0],
                        "mutuelle": patient[1],
                        "etatPatient": patient[2],
                        "personneAContacter": patient[3],
                        "userId": patient[4],
                        "nomUser": patient[5],
                        "prenomUser": patient[6],
                        "telephone": patient[7],
                        "dateDeNaissance": str(patient[8]),
                        "adresse": patient[9],
                        "emailUser": patient[10]
                    })
                return result
            else:
                return {"error": "Aucun patient trouvé pour cet hôpital."}

        except Exception as e:
            return {"error": str(e)}

    def post(self, request):
        """
        Récupérer la liste des patients d'un hôpital via une requête POST.
        """
        hopitalId = request.data.get("hopitalId", None)

        if not hopitalId:
            return Response({"error": "hopitalId non fourni"}, status=status.HTTP_400_BAD_REQUEST)

        patients = self.get_patients_by_hopital(hopitalId)

        if isinstance(patients, dict) and "error" in patients:
            return Response({"error": patients["error"]}, status=status.HTTP_404_NOT_FOUND)

        return Response(patients, status=status.HTTP_200_OK)



############################################################################################################################

class DemandesBilanByLaborantin(APIView):
    """
    API pour récupérer les demandes de bilan biologique par laborantin.
    """

    def get_demandes_bilan(self, laborantinId):
        """
        Récupérer les demandes de bilans biologiques par laborantin, 
        incluant les informations des docteurs, des patients et l'état de la demande.
        """
        try:
            query = """
                SELECT 
                    db.demandeBilanId,  -- ID de la demande
                    docteur.nomUser AS docteurNom,
                    docteur.prenomUser AS docteurPrenom,
                    patientUser.nomUser AS patientNom,
                    patientUser.prenomUser AS patientPrenom,
                    db.etatDemande  -- État de la demande
                FROM 
                    demandeBilan db
                JOIN 
                    Tuser docteur ON db.docteurId = docteur.userId
                JOIN 
                    Patient p ON db.patientId = p.patientId
                JOIN 
                    Tuser patientUser ON p.patientId = patientUser.patientId
                WHERE 
                    db.laborantinId = %s;
            """

            with connection.cursor() as cursor:
                cursor.execute(query, [laborantinId])
                demandes = cursor.fetchall()

            if demandes:
                result = []
                for demande in demandes:
                    result.append({
                        "demandeId": demande[0],  # ID de la demande
                        "docteur": {
                            "nom": demande[1],
                            "prenom": demande[2]
                        },
                        "patient": {
                            "nom": demande[3],
                            "prenom": demande[4]
                        },
                        "etatDemande": "Validée" if demande[5] else "En attente"  # Conversion de l'état
                    })
                return result
            else:
                return {"error": "Aucune demande de bilan trouvée pour ce laborantin"}

        except Exception as e:
            return {"error": str(e)}

    def post(self, request):
        """
        Récupérer la liste des demandes via une requête POST.
        """
        laborantinId = request.data.get("laborantinId", None)

        if not laborantinId:
            return Response({"error": "laborantinId non fourni"}, status=status.HTTP_400_BAD_REQUEST)

        demandes = self.get_demandes_bilan(laborantinId)

        if isinstance(demandes, dict) and "error" in demandes:
            return Response({"error": demandes["error"]}, status=status.HTTP_404_NOT_FOUND)

        return Response(demandes, status=status.HTTP_200_OK)

###############################################################################################################################
class DemandesRadiosByRadiologue(APIView):
    """
    API pour récupérer la liste des demandes de radios d'un radiologue donné.
    """

    def get_demandes_radios(self, radiologueId):
        """
        Récupérer les demandes de radios pour un radiologue spécifique,
        incluant les informations des patients, des docteurs et l'état de la demande.
        """
        try:
            query = """
                SELECT 
                    dr.demandeRadioId,  -- ID de la demande
                    p.nomUser AS patientNom,
                    p.prenomUser AS patientPrenom,
                    d.nomUser AS docteurNom,
                    d.prenomUser AS docteurPrenom,
                    dr.typeRadio,
                    dr.etatDemande  -- État de la demande
                FROM 
                    demandeRadio dr
                JOIN 
                    Tuser p ON dr.patientId = p.patientId
                JOIN 
                    Tuser d ON dr.docteurId = d.userId
                WHERE 
                    dr.radiologueId = %s;
            """

            with connection.cursor() as cursor:
                cursor.execute(query, [radiologueId])
                demandes = cursor.fetchall()

            if demandes:
                result = []
                for demande in demandes:
                    result.append({
                        "demandeId": demande[0],  # ID de la demande
                        "patient": {
                            "nom": demande[1],
                            "prenom": demande[2]
                        },
                        "docteur": {
                            "nom": demande[3],
                            "prenom": demande[4]
                        },
                        "typeRadio": demande[5],
                        "etatDemande": "Validée" if demande[6] else "En attente"  # Convertir état booléen en texte
                    })
                return result
            else:
                return {"error": "Aucune demande de radio trouvée pour ce radiologue"}

        except Exception as e:
            return {"error": str(e)}

    def post(self, request):
        """
        Récupérer les demandes de radios via une requête POST.
        """
        radiologueId = request.data.get("radiologueId", None)

        if not radiologueId:
            return Response({"error": "radiologueId non fourni"}, status=status.HTTP_400_BAD_REQUEST)

        demandes = self.get_demandes_radios(radiologueId)

        if isinstance(demandes, dict) and "error" in demandes:
            return Response({"error": demandes["error"]}, status=status.HTTP_404_NOT_FOUND)

        return Response(demandes, status=status.HTTP_200_OK)


#####################################################################################################################################
class BilanRadiologiqueDetail(APIView):
    """
    API pour récupérer les détails d'un bilan radiologique par son ID.
    """

    def get_bilan_radiologique_details(self, bilanRadiologiqueId):
        """
        Récupérer les détails d'un bilan radiologique par son ID.
        """
        try:
            query = """
                SELECT 
                    br.RadioType, 
                    br.compteRendu, 
                    br.image, 
                    u.nomUser AS radiologueNom,
                    u.prenomUser AS radiologuePrenom
                FROM 
                    BilanRadiologique br
                JOIN 
                    Tuser u ON br.userId = u.userId
                WHERE 
                    br.bilanRadiologiqueId = %s;
            """

            with connection.cursor() as cursor:
                cursor.execute(query, [bilanRadiologiqueId])
                bilan_details = cursor.fetchone()

            if bilan_details:
                result = {
                    "radioType": bilan_details[0],
                    "compteRendu": bilan_details[1],
                    "image": bilan_details[2],
                    "radiologue": {
                        "nom": bilan_details[3],
                        "prenom": bilan_details[4]
                    }
                }
                return result
            else:
                return {"error": "Bilan radiologique non trouvé"}

        except Exception as e:
            return {"error": str(e)}

    def post(self, request):
        """
        Récupérer les détails d'un bilan radiologique via une requête POST.
        """
        bilanRadiologiqueId = request.data.get("bilanRadiologiqueId", None)

        if not bilanRadiologiqueId:
            return Response({"error": "bilanRadiologiqueId non fourni"}, status=status.HTTP_400_BAD_REQUEST)

        bilan_details = self.get_bilan_radiologique_details(bilanRadiologiqueId)

        if isinstance(bilan_details, dict) and "error" in bilan_details:
            return Response({"error": bilan_details["error"]}, status=status.HTTP_404_NOT_FOUND)

        return Response(bilan_details, status=status.HTTP_200_OK)

###################################################################################################################################

class BilanBiologiqueDetail(APIView):
    """
    API pour récupérer les détails d'un bilan biologique par son ID.
    """

    def get_bilan_biologique_details(self, bilanBiologiqueId):
        """
        Récupérer les détails d'un bilan biologique par son ID.
        """
        try:
            query = """
                SELECT 
                    bb.glycemieValue, 
                    bb.pressionValue, 
                    bb.cholesterolValue, 
                    bb.resultDate, 
                    u.nomUser AS userNom, 
                    u.prenomUser AS userPrenom
                FROM 
                    BilanBiologique bb
                JOIN 
                    Tuser u ON bb.userId = u.userId
                WHERE 
                    bb.bilanBiologiqueId = %s;
            """

            with connection.cursor() as cursor:
                cursor.execute(query, [bilanBiologiqueId])
                bilan_details = cursor.fetchone()

            if bilan_details:
                result = {
                    "glycemieValue": bilan_details[0],
                    "pressionValue": bilan_details[1],
                    "cholesterolValue": bilan_details[2],
                    "resultDate": str(bilan_details[3]),  # Convertir la date en format string
                    "laborantin": {
                        "nom": bilan_details[4],
                        "prenom": bilan_details[5]
                    }
                }
                return result
            else:
                return {"error": "Bilan biologique non trouvé"}

        except Exception as e:
            return {"error": str(e)}

    def post(self, request):
        """
        Récupérer les détails d'un bilan biologique via une requête POST.
        """
        bilanBiologiqueId = request.data.get("bilanBiologiqueId", None)

        if not bilanBiologiqueId:
            return Response({"error": "bilanBiologiqueId non fourni"}, status=status.HTTP_400_BAD_REQUEST)

        bilan_details = self.get_bilan_biologique_details(bilanBiologiqueId)

        if isinstance(bilan_details, dict) and "error" in bilan_details:
            return Response({"error": bilan_details["error"]}, status=status.HTTP_404_NOT_FOUND)

        return Response(bilan_details, status=status.HTTP_200_OK)

############################################################################################################################
class DoctorPatients(APIView):
    def get_patients_for_doctor(self, doctorId):
        """
        Récupérer les patients pour un docteur spécifique via la table des consultations, 
        incluant leurs noms et prénoms.
        """
        try:
            query = """
                SELECT DISTINCT
                    p.patientId,
                    p.mutuelle,
                    p.etatPatient,
                    p.personneAContacter,
                    t.nomUser,
                    t.prenomUser
                FROM 
                    Consultation c
                INNER JOIN Patient p ON c.patientId = p.patientId
                INNER JOIN Tuser t ON t.patientId = p.patientId
                WHERE 
                    c.userId = %s
                ORDER BY t.nomUser, t.prenomUser;
            """
            
            with connection.cursor() as cursor:
                cursor.execute(query, [doctorId])
                patients = cursor.fetchall()
            
            # Structurer les données en JSON
            result = {
                "doctorId": doctorId,
                "patients": [
                    {
                        "patientId": patient[0],
                        "mutuelle": patient[1],
                        "etatPatient": patient[2],
                        "personneAContacter": patient[3],
                        "nom": patient[4],
                        "prenom": patient[5],
                    }
                    for patient in patients
                ]
            }
            return result

        except Exception as e:
            return {"error": str(e)}

    def post(self, request):
        """
        Récupérer les patients d'un docteur via une requête POST.
        """
        doctorId = request.data.get("doctorId", None)

        if not doctorId:
            return Response(
                {"error": "doctorId non fourni"},
                status=status.HTTP_400_BAD_REQUEST
            )

        patients = self.get_patients_for_doctor(doctorId)
        if "error" in patients:
            return Response({"error": patients["error"]}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        if not patients["patients"]:
            return Response({"message": "Aucun patient trouvé pour ce docteur."}, status=status.HTTP_404_NOT_FOUND)

        return Response(patients, status=status.HTTP_200_OK)
