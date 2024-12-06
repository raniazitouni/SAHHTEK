from django.db import models

from django.db import models

class ExistingUser(models.Model):
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=255)

    class Meta:
        db_table = 'users'  

