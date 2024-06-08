# models.py

from django.db import models
from django.contrib.auth.models import User
from datetime import date

class Seat(models.Model):
    seat_number = models.CharField(max_length=10, unique=True)

    def __str__(self):
        return self.seat_number

    def is_booked_on_date(self, selected_date):
        return self.booking_set.filter(date=selected_date).exists()

    def update_booked_status(self, selected_date):
        if self.is_booked_on_date(selected_date):
            self.is_booked = True
        else:
            self.is_booked = False
        self.save()

class Booking(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)  
    name = models.CharField(max_length=100)
    email = models.EmailField()
    date = models.DateField()
    seat = models.ForeignKey(Seat, on_delete=models.CASCADE)

    def __str__(self):
        return str(self.date)
