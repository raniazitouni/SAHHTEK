from django.http import JsonResponse
from django.db import connection

def login_user(request):
    if request.method == 'POST':
        import json
        data = json.loads(request.body) 
        email = data.get('email')
        password = data.get('password')

        with connection.cursor() as cursor:
            # Query for user authentication and retrieve role
            cursor.execute("""
                SELECT id, email, role 
                FROM users 
                WHERE email = %s AND password = %s
            """, [email, password])
            user = cursor.fetchone()
        
        if user:
            user_id, email, role = user
            return JsonResponse({
                "message": "Login successful",
                "email": email,
                "role": role,
                "user_id": user_id,
            }, status=200)
        else:
            return JsonResponse({"error": "Invalid email or password"}, status=401)

    return JsonResponse({"error": "Invalid request method"}, status=405)
