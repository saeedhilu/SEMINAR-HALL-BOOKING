from django.contrib.auth import get_user_model

from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import generics, permissions, status
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from rest_framework.exceptions import ValidationError



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

class BookingListCreate(generics.GenericAPIView  , JWTAuthenticationMixin):
    print('hey  ')
    queryset = Booking.objects.all()
    print("queryset for boooiuibng",queryset)
    serializer_class = BookingSerializer

    def post(self,request):
        print(request.data)
        serializer = BookingSerializer(data=request.data,context={'request':request})
        print(serializer)
        serializer.is_valid(raise_exception=True)
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