from django.core.management.base import BaseCommand
from bdd.models import AuthUser
from faker import Faker # type: ignore
import random
from datetime import timedelta

class Command(BaseCommand):
    help = 'Populate the database with fake AuthUser data'

    def handle(self, *args, **kwargs):
        fake = Faker()

        # Generate 10 fake AuthUser entries
        for _ in range(10):
            password = fake.password(length=12)
            last_login = fake.date_this_year()
            is_superuser = random.randint(0, 1)  # 0 or 1
            username = fake.unique.user_name()
            first_name = fake.first_name()
            last_name = fake.last_name()
            email = fake.email()
            is_staff = random.randint(0, 1)  # 0 or 1
            is_active = random.randint(0, 1)  # 0 or 1
            date_joined = fake.date_this_year()

            # Create and save the fake AuthUser
            AuthUser.objects.create(
                password=password,
                last_login=last_login,
                is_superuser=is_superuser,
                username=username,
                first_name=first_name,
                last_name=last_name,
                email=email,
                is_staff=is_staff,
                is_active=is_active,
                date_joined=date_joined,
            )

        self.stdout.write(self.style.SUCCESS('Successfully populated the database with fake users'))
