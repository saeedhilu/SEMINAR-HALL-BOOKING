# Generated by Django 4.2.11 on 2024-06-08 02:05

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('bookings', '0002_alter_seat_seat_number'),
    ]

    operations = [
        migrations.AlterField(
            model_name='seat',
            name='seat_number',
            field=models.CharField(max_length=10, unique=True),
        ),
    ]