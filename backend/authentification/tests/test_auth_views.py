import pytest
from django.urls import reverse
from django.test import Client
from django.db import connection
import os
import django
import json
from cryptography.fernet import Fernet
from decouple import config
import base64

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
    Pré-remplit la base de données avec des données de test, incluant Patient et Tuser.
    """
    with connection.cursor() as cursor:
        # Disable foreign key checks to avoid IntegrityError during deletion

        plain_password = "password"
        # key = config('ENCRYPTION_KEY')
        # cipher_suite = Fernet(key)
        # psw = plain_password.encode()
        # encrypted = cipher_suite.encrypt(psw)
        # psw_tostore = base64.b64encode(encrypted).decode('utf-8')
        
        cursor.execute('SET FOREIGN_KEY_CHECKS = 0;')

        # Clear the relevant tables before inserting test data
        cursor.execute("DELETE FROM Tuser WHERE patientId = '122255'")
        cursor.execute("DELETE FROM Patient WHERE patientId = '122255'")

        # Insert test data
        cursor.execute(""" 
            INSERT INTO Patient (patientId, mutuelle, etatPatient, personneAContacter)
            VALUES ('122255', 'Mutuelle1', TRUE, 'Personne1')
        """)
        cursor.execute(""" 
            INSERT INTO Tuser (
                patientId, nomUser, prenomUser, telephone, dateDeNaissance, adresse,
                emailUser, password, oldPassword, role, hopitalId
            ) VALUES (
                '122255', 'nom1', 'prenom2', '052424453', '2030-11-02', '123 Street',
                'raniazitouni48@gmail.com', %s, %s, 'patient', 1
            )
        """,[plain_password , plain_password])

        # Re-enable foreign key checks after insertion
        cursor.execute('SET FOREIGN_KEY_CHECKS = 1;')
    yield

    # Clean up after tests
    with connection.cursor() as cursor:
        # Disable foreign key checks again for cleanup
        cursor.execute('SET FOREIGN_KEY_CHECKS = 0;')

        # Clean up the data after tests
        cursor.execute("DELETE FROM Patient WHERE patientId = '122255'")
        cursor.execute("DELETE FROM Tuser WHERE patientId = '122255'")

        # Re-enable foreign key checks
        cursor.execute('SET FOREIGN_KEY_CHECKS = 1;')

def test_login_successful(client, setup_database):
    """
    Teste un login avec des identifiants valides.
    """
    login_data = {
        "email": "raniazitouni48@gmail.com",
        "password": "password"  # Ensure this matches the hashed password in your test data
    }
    response = client.post(reverse('login_user'), json.dumps(login_data), content_type="application/json")

    assert response.status_code == 200
    response_data = response.json()

    # Ensure the response contains basic login success info like message, patientId, and role
    assert response_data["message"] == "Login successful"
    assert response_data["email"] == "raniazitouni48@gmail.com"
    assert response_data["role"] == "patient"
    # assert response_data["patientid"] == "122255"  # Check patientId as per the response


def test_login_invalid_password(client, setup_database):
    """
    Teste un login avec un mot de passe incorrect.
    """
    login_data = {
        "email": "raniazitouni48@gmail.com",
        "password": "wrong_password"
    }
    response = client.post(reverse('login_user'), json.dumps(login_data), content_type="application/json")

    assert response.status_code == 401  # Unauthorized status code
    assert "error" in response.json()
    assert response.json()["error"] == "Invalid email or password"
