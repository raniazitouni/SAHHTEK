import csv
from django.contrib.auth.hashers import make_password
from django.core.management.base import BaseCommand
from bdd.models import Billanbiologique  # Replace 'bdd' with your app name

class Command(BaseCommand):
    help = "Import from a CSV file"

    def handle(self, *args, **kwargs):
        csv_file = 'bdd/data/BillanBiologique.csv'  # Path to your CSV file
        try:
            with open(csv_file, newline='', encoding='utf-8') as csvfile:
                reader = csv.DictReader(csvfile)  # Match CSV headers to model fields
                for row in reader:
                    Billanbiologique.objects.create(
                         billanbiologiqueid = int(row['billanbiologiqueId']),
                        #  userid =  int(row['userId']),
                        #  patientid= int(row['patientId']),
                        #  typebilan = row['typebilan'],
                         graphimage = row['graphImage'],
                    )
            self.stdout.write(self.style.SUCCESS(f"Successfully imported data from {csv_file}!"))
        except Exception as e:
            self.stderr.write(self.style.ERROR(f"Error: {e}"))
