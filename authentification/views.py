from django.http import JsonResponse
from django.db import connection
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import json
from APIS.settings import EMAIL_HOST_USER
from django.core.mail import send_mail
import hashlib
from datetime import datetime
import secrets
import string
from django.shortcuts import render
from cryptography.fernet import Fernet
from decouple import config
import base64

def send_reset_email(email, password):
    from_email = "salimhasnaoui903@gmail.com"  # Replace with your actual email
    to_email = email
    subject = "Password Reset Request"
    body = f"LOGIN WITH THIS PASSWORD: {password}"

    # Set up the email server and send email (example using Gmail)
    msg = MIMEMultipart()
    msg['From'] = from_email
    msg['To'] = to_email
    msg['Subject'] = subject
    msg.attach(MIMEText(body, 'plain'))

    try:
        server = smtplib.SMTP('smtp.gmail.com', 587)
        server.starttls()
        server.login(from_email, "hgkawlwngzkeleoo")  # Use your app password here if 2FA is enabled
        text = msg.as_string()
        server.sendmail(from_email, to_email, text)
        server.quit()
        return True
    except Exception as e:
        print(f"Error sending email: {e}")
        return False

@csrf_exempt
@require_http_methods(["POST"])
def forgot_password(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        email = data.get('email')

        # Check if the email exists
        with connection.cursor() as cursor:
            cursor.execute("SELECT userId, oldPassword FROM Tuser WHERE emailUser = %s", [email])
            user = cursor.fetchone()

        if user:
            user_id, encrypted_password = user

            # Decrypt the password
            key = config('ENCRYPTION_KEY')  # Get the key from the environment variable
            cipher_suite = Fernet(key)

            # Decode the encrypted password from base64
            encrypted_password_bytes = base64.b64decode(encrypted_password.encode('utf-8'))

            # Decrypt the password
            decrypted_password = cipher_suite.decrypt(encrypted_password_bytes).decode('utf-8')

            # Send the decrypted password to the user via email
            email_sent = send_reset_email(email, decrypted_password)

            if email_sent:
                return JsonResponse({
                    "message": "Password reset email sent successfully."
                }, status=200)
            else:
                return JsonResponse({
                    "error": "Failed to send the reset email."
                }, status=500)

        return JsonResponse({"error": "Email not found"}, status=404)

    return JsonResponse({"error": "Invalid request method"}, status=405)

# Login function
@csrf_exempt
@require_http_methods(["POST"])
def login_user(request):
    if request.method == 'POST':
        data = json.loads(request.body) 
        email = data.get('email')
        password = data.get('password')

        with connection.cursor() as cursor:
            # Query for user authentication and retrieve role
            cursor.execute("""
                SELECT userId, emailUser, password, role 
                FROM Tuser 
                WHERE emailUser = %s
            """, [email])
            user = cursor.fetchone()

        if user:
            user_id, email_db, password_db, role = user

            # Compare plain passwords
            if password == password_db:
                return JsonResponse({
                    "message": "Login successful",
                    "email": email_db,
                    "role": role,
                    "user_id": user_id,
                }, status=200)
            else:
                return JsonResponse({"error": "Invalid email or password"}, status=401)
        else:
            return JsonResponse({"error": "Invalid email or password"}, status=401)

    return JsonResponse({"error": "Invalid request method"}, status=405)