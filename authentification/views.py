from django.http import JsonResponse
from django.db import connection
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import random
import string
import json
from APIS.settings import EMAIL_HOST_USER
from django.core.mail import send_mail
import hashlib
from datetime import datetime



def send_reset_email(email, reset_token):
    from_email = "salimhasnaoui903@gmail.com"  # Replace with your actual email
    to_email = email
    subject = "Password Reset Request"
    body = f"LOGIN WITH THIS PASSWORD : "

    # Set up the email server and send email (example using Gmail)
    msg = MIMEMultipart()
    msg['From'] = from_email
    msg['To'] = to_email
    msg['Subject'] = subject
    msg.attach(MIMEText(body, 'plain'))

    server = smtplib.SMTP('smtp.gmail.com', 587)
    server.starttls()
    server.login(from_email, "hgkawlwngzkeleoo")  # Use your app password here if 2FA is enabled
    text = msg.as_string()
    server.sendmail(from_email, to_email, text)
    server.quit()


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

@csrf_exempt
@require_http_methods(["POST"])
def forgot_password(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        email = data.get('email')

        # Check if the email exists
        with connection.cursor() as cursor:
            cursor.execute("SELECT userId FROM Tuser WHERE emailUser = %s", [email])
            user = cursor.fetchone()

        if user:
            user_id = user[0]

            # Generate a random reset token
            reset_token = ''.join(random.choices(string.ascii_letters + string.digits, k=32))

            # Store the reset token with an expiry
            with connection.cursor() as cursor:
                cursor.execute("""
                    INSERT INTO PasswordResetTokens (userId, token, expiresAt)
                    VALUES (%s, %s, NOW() + INTERVAL 1 HOUR)
                """, [user_id, reset_token])

            # Send the reset email
            send_reset_email(email, reset_token)

            return JsonResponse({"message": "Reset link sent to your email!"}, status=200)

        return JsonResponse({"error": "Email not found"}, status=404)

    return JsonResponse({"error": "Invalid request method"}, status=405)




