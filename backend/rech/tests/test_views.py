import pytest
from django.urls import reverse
from django.test import Client
from django.db import connection
import os
import django

# Set the path to your settings module
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'APIS.settings')
django.setup()

# Configure un client Django pour les tests
@pytest.fixture
def client():
    return Client()

@pytest.fixture
def setup_database():
    """
    Pré-remplit la base de données avec des données de test, incluant Tuser et Patient.
    """
    with connection.cursor() as cursor:
        cursor.execute('SET FOREIGN_KEY_CHECKS = 0;')

        # Clear the relevant tables before inserting test data
        cursor.execute("DELETE FROM Tuser WHERE patientId = '12345'")
        cursor.execute("DELETE FROM Patient WHERE patientId = '12345'")
        # Insérer un patient dans la table Patient

        cursor.execute("""
            INSERT INTO Patient (patientId, mutuelle, etatPatient, personneAContacter)
            VALUES ('12345', 'Mutuelle1', TRUE, 'Personne1')
        """)

        # Insérer un utilisateur dans la table Tuser
        cursor.execute("""
            INSERT INTO Tuser (patientId, nomUser, prenomUser, telephone, dateDeNaissance, adresse, emailUser, 
            password, oldPassword, role, hopitalId)
            VALUES ('12345', 'Doe', 'John', '1234567890', '1990-01-01', '123 Street', 'john.doe@example.com',
            'hashed_password', 'hashed_old_password', 'admin', 1)
        """)

        # Re-enable foreign key checks after insertion
        cursor.execute('SET FOREIGN_KEY_CHECKS = 1;')

    yield

    # Clean up after tests
    with connection.cursor() as cursor:
        # Disable foreign key checks again for cleanup
        cursor.execute('SET FOREIGN_KEY_CHECKS = 0;')

        # Clean up the data after tests
        cursor.execute("DELETE FROM Patient WHERE patientId = '12345'")
        cursor.execute("DELETE FROM Tuser WHERE patientId = '12345'")

        # Re-enable foreign key checks
        cursor.execute('SET FOREIGN_KEY_CHECKS = 1;')


def test_search_patient_by_ssn_valid(client, setup_database):
    """
    Teste une recherche valide avec un SSN existant, incluant tous les champs.
    """
    response = client.get(reverse('search_user_by_ssn'), {'query': '123'})

    assert response.status_code == 200
    assert 'patients' in response.json()
    
    # Vérifie que les données retournées sont correctes
    patient = response.json()['patients'][0]
    assert patient['nomUser'] == 'Doe'
    assert patient['prenomUser'] == 'John'
    assert patient['telephone'] == '1234567890'
    assert patient['dateDeNaissance'] == '1990-01-01'
    assert patient['adresse'] == '123 Street'
    assert patient['emailUser'] == 'john.doe@example.com'
    assert patient['mutuelle'] == 'Mutuelle1'
    assert patient['etatPatient'] == 1 
    assert patient['personneAContacter'] == 'Personne1'


def test_search_patient_by_ssn_no_results(client, setup_database):
    """
    Teste une recherche avec un SSN inexistant.
    """
    response = client.get(reverse('search_user_by_ssn'), {'query': '999'})
    assert response.status_code == 404
    assert 'error' in response.json()
    assert response.json()['error'] == 'No matching patient found'
