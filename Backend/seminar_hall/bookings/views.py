from django.contrib.auth import get_user_model
from django.db.models import BooleanField, Case, Value, When
from rest_framework import generics, permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework_simplejwt.tokens import RefreshToken
from .models import Booking, Seat
from .serializers import BookingSerializer, SeatSerializer, UserSignupSerializer, UserLoginSerializer
from datetime import datetime, date

User = get_user_model()


class JWTAuthenticationMixin:
    permission_classes = [permissions.IsAuthenticated]
    authentication_classes = [JWTAuthentication]

class SeatListCreate(generics.ListCreateAPIView):
    queryset = Seat.objects.all()
    serializer_class = SeatSerializer

class SeatListByDate(APIView):
    def get(self, request):
        date_str = request.query_params.get('date')
        
        if date_str:
            try:
                selected_date = datetime.strptime(date_str, '%Y-%m-%d').date()
                print('date is :', selected_date)

                # Get the seats that are booked on the selected date
                booked_seats = Booking.objects.filter(date=selected_date).values_list('seat_id', flat=True)
                print(booked_seats)
                if booked_seats:
                    for seat in booked_seats:
                        print('data is:', seat)
                else:
                    print('2')

                seats = Seat.objects.all()

                seats_with_status = [
                    {
                        'id': seat.id,
                        'seat_number': seat.seat_number,
                        'is_booked_on_date': seat.id in booked_seats
                    }
                    for seat in seats
                ]

                return Response(seats_with_status)
            except ValueError as e:
                return Response({"detail": "Invalid date format. Please use YYYY-MM-DD format."}, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response({"detail": "Date parameter is required."}, status=status.HTTP_400_BAD_REQUEST)

       
class BookingListCreate(APIView):
    def post(self, request):
        seat_id = request.data.get('seat')
        date = request.data.get('date')

        try:
            selected_date = datetime.strptime(date, '%Y-%m-%d').date()
        except ValueError:
            return Response({"detail": "Invalid date format. Please use YYYY-MM-DD format."}, status=status.HTTP_400_BAD_REQUEST)

        seat = Seat.objects.get(pk=seat_id)
        if seat.is_booked_on_date(selected_date):
            return Response(
                {"non_field_errors": ["This seat is already booked for the selected date."]},
                status=status.HTTP_400_BAD_REQUEST,
            )

        

    

        serializer = BookingSerializer(data=request.data, context={'request': request})
        serializer.is_valid(raise_exception=True)
        serializer.save()

        seat.update_booked_status(selected_date)
        
        return Response(serializer.data, status=status.HTTP_201_CREATED)
class UserSignupView(generics.CreateAPIView):
    print('ehhkbsrg')
    serializer_class = UserSignupSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        print('serialiguodsb eeeghe ',serializer)
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
        print(user)
        refresh = RefreshToken.for_user(user)
        return Response({
            'refresh': str(refresh),
            'access': str(refresh.access_token),
        })