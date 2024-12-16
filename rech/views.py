from django.http import JsonResponse
from django.db import connection
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods

@csrf_exempt
@require_http_methods(["GET"])
def search_patient_by_ssn(request):
    query = request.GET.get('query', '').strip()

    if len(query) >= 3:
        with connection.cursor() as cursor:
            cursor.execute("""
                SELECT * FROM Patient WHERE patientId LIKE %s OR nomPatient LIKE %s OR prenomPatient LIKE %s
            """, [f'%{query}%', f'%{query}%', f'%{query}%'])
            patients = cursor.fetchall()

        if patients:
            patient_list = [
                {
                    "patientId": patient[0],
                    "nomPatient": patient[1],
                    "prenomPatient": patient[2],
                    "adressePatient": patient[3],
                    "telephonePatient": patient[4],
                    "mutuelle": patient[5],
                    "etatPatient": patient[6],
                    "dateDeNaissancePatient": patient[7],
                    "personneAContacter": patient[8],
                } for patient in patients
            ]
            return JsonResponse({"patients": patient_list}, status=200)
        else:
            return JsonResponse({"error": "No patients found"}, status=404)

    return JsonResponse({"error": "Query too short, at least 3 characters required"}, status=400)


