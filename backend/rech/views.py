from django.http import JsonResponse
from django.db import connection
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods

@csrf_exempt
@require_http_methods(["GET"])
def search_patient_by_ssn(request):
    query = request.GET.get('query', '').strip()

    # Ensure the query is long enough
    if len(query) >= 3:
        with connection.cursor() as cursor:
            # First, search for the patientId in the Patient table based on the query
            cursor.execute("""
                SELECT patientId
                FROM Patient
                WHERE patientId LIKE %s
            """, [f'%{query}%'])
            patient_ids = cursor.fetchall()

            # If no matching patientId is found, return an error
            if not patient_ids:
                return JsonResponse({"error": "No matching patient found"}, status=404)

            patient_id_list = [patient_id[0] for patient_id in patient_ids]

            # Now, use the patientId to fetch the associated details from the Tuser table
            cursor.execute("""
                SELECT u.patientid, u.nomuser, u.prenomuser, u.telephone, u.datedenaissance,
                       u.adresse, u.emailuser, p.mutuelle, p.etatPatient, p.personneAContacter,u.userid
                FROM Tuser u
                JOIN Patient p ON u.patientid = p.patientid
                WHERE u.patientId IN (%s)
            """ % ','.join(['%s'] * len(patient_id_list)), patient_id_list)
            
            # Fetch the results
            patients = cursor.fetchall()

        # If patients are found, return their details as JSON
        if patients:
            patient_list = [
                { 
                    "userid" :patient[10],
                    "patientId": patient[0],
                    "nomUser": patient[1],
                    "prenomUser": patient[2],
                    "telephone": patient[3],
                    "dateDeNaissance": patient[4],
                    "adresse": patient[5],
                    "emailUser": patient[6],
                    "mutuelle": patient[7],
                    "etatPatient": patient[8],
                    "personneAContacter": patient[9],
                } for patient in patients
            ]
            return JsonResponse({"patients": patient_list}, status=200)
        else:
            return JsonResponse({"error": "No patients found"}, status=404)

    # If the query is too short, return an error
    return JsonResponse({"error": "Query too short, at least 3 characters required"}, status=400)