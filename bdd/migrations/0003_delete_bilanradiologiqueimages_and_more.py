# Generated by Django 5.1.4 on 2024-12-16 04:00

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('bdd', '0002_bilanbiologique_bilanradiologique_and_more'),
    ]

    operations = [
        migrations.DeleteModel(
            name='Bilanradiologiqueimages',
        ),
        migrations.DeleteModel(
            name='Billanbiologique',
        ),
        migrations.DeleteModel(
            name='Billanradiologique',
        ),
        migrations.DeleteModel(
            name='Billanradiologiqueimages',
        ),
        migrations.RemoveField(
            model_name='ordononcemedicament',
            name='ordononceid',
        ),
        migrations.DeleteModel(
            name='Ordononce',
        ),
        migrations.DeleteModel(
            name='Ordononcemedicament',
        ),
    ]
