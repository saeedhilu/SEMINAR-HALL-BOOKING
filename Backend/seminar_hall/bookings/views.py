from django.contrib.auth import get_user_model

from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import generics, permissions, status
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from rest_framework.exceptions import ValidationError

from datetime import datetime


from .models import Booking, Seat
from .serializers import BookingSerializer, SeatSerializer, UserSignupSerializer, UserLoginSerializer


User = get_user_model()

class JWTAuthenticationMixin:

    permission_classes = [permissions.IsAuthenticated]
    authentication_classes = [JWTAuthentication]

class SeatListCreate(generics.ListCreateAPIView):
    print('hello')
    queryset = Seat.objects.all()
    print('query sets is :',queryset)
    serializer_class = SeatSerializer

class BookingListCreate(APIView):
    def post(self, request):
        seat_id = request.data.get('seat')
        date = request.data.get('date')
        
        try:
            date_obj = datetime.strptime(date, '%Y-%m-%d')
        except ValueError:
            raise ValidationError('Invalid date format. Please provide date in YYYY-MM-DD format.')

        seat = Seat.objects.get(pk=seat_id)  # Retrieve the seat object
        if seat.is_booked:
            return Response(
                {"non_field_errors": ["This seat is already booked for the selected date."]},
                status=status.HTTP_400_BAD_REQUEST,
            )

        serializer = BookingSerializer(data=request.data, context={'request': request})

        print('serjbsbgsb',serializer)
        serializer.is_valid(raise_exception=True)
        
        # Update the is_booked field of the seat
        seat.is_booked = True
        seat.save()

        # Save the booking
        serializer.save()
        
        return Response(serializer.data, status=status.HTTP_201_CREATED)

class UserSignupView(generics.CreateAPIView):
    serializer_class = UserSignupSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)

class UserLoginView(APIView):
    def post(self, request):
        print('statrt')
        serializer = UserLoginSerializer(data=request.data)
        print('serialziser is :',serializer)
        serializer.is_valid(raise_exception=True)

        user = serializer.validated_data['user']
        refresh = RefreshToken.for_user(user)
        return Response({
            'refresh': str(refresh),
            'access': str(refresh.access_token),
        })