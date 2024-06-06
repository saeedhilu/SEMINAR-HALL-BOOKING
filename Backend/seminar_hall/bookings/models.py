from django.db import models
from django.contrib.auth.models import User 

class Seat(models.Model):
    seat_number = models.CharField(max_length=10,unique=True)
    is_booked = models.BooleanField(default=False)
    def __str__(self):
        return self.seat_number

class Booking(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)  
    name = models.CharField(max_length=100)
    email = models.EmailField()
    date = models.DateField()
    seat = models.ForeignKey(Seat, on_delete=models.CASCADE)

    def __str__(self):
        return str(self.date) + " "
    