from django.http import JsonResponse
from .models import ExistingUser  # Import the model

def login_user(request):
    if request.method == 'POST':
        import json
        data = json.loads(request.body)
        email = data.get('email')
        password = data.get('password')

        try:
            # Query the database for the user with the provided email
            user = ExistingUser.objects.get(email=email)
            
            if user.password == password:  # This assumes plain-text password storage
                return JsonResponse({"message": "Login successful", "email": email}, status=200)
            else:
                return JsonResponse({"error": "Invalid email or password"}, status=401)
        except ExistingUser.DoesNotExist:
            return JsonResponse({"error": "Invalid email or password"}, status=401)

    return JsonResponse({"error": "Invalid request method"}, status=405)
