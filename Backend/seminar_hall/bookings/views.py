from rest_framework import generics, permissions
from rest_framework.exceptions import ValidationError
from .models import Booking, Seat
from .serializers import BookingSerializer, SeatSerializer

class SeatListCreate(generics.ListCreateAPIView):
    queryset = Seat.objects.all()
    print('query set is ',queryset)
    serializer_class = SeatSerializer

class BookingListCreate(generics.ListCreateAPIView):
    queryset = Booking.objects.all()
    serializer_class = BookingSerializer
    
    def perform_create(self, serializer):
        if not self.request.user.is_authenticated:
            raise ValidationError("You need to log in to book a seat.")
        
        if Booking.objects.filter(date=serializer.validated_data['date'], seat=serializer.validated_data['seat']).exists():
            raise ValidationError("This seat is already booked for the selected date.")
        
        seat = serializer.validated_data['seat']
        seat.is_booked = True
        seat.save()
        serializer.save(user=self.request.user)
from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.views import APIView
from .serializers import UserSignupSerializer, UserLoginSerializer
from django.contrib.auth import get_user_model

User = get_user_model()

class UserSignupView(generics.CreateAPIView):
    serializer_class = UserSignupSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)

class UserLoginView(APIView):
    def post(self, request):
        serializer = UserLoginSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        user = serializer.validated_data['user']

        return Response({"message": "Login successful!"}, status=status.HTTP_200_OK)