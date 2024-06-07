from rest_framework import serializers
from .models import Booking, Seat
from django.contrib.auth import get_user_model

User = get_user_model()

class SeatSerializer(serializers.ModelSerializer):
    class Meta:
        model = Seat
        fields = '__all__'

class BookingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Booking
        fields = ['name', 'email', 'date', 'seat']

    def validate(self, data):
        if not self.context['request'].user.is_authenticated:
            raise serializers.ValidationError("Authentication required")
        
        request = self.context.get('request')

        if request:
            data['user'] = request.user
        seat = data.get('seat')
        date = data.get('date')
        if Booking.objects.filter(date=date, seat=seat).exists():
            raise serializers.ValidationError("This seat is already booked for the selected date.")
        return data
class UserSignupSerializer(serializers.ModelSerializer):
    confirm_password = serializers.CharField(write_only=True, required=True)

    class Meta:
        model = User
        fields = ['username', 'email', 'password', 'confirm_password']
        extra_kwargs = {
            'password': {'write_only': True}
        }

    def validate(self, data):
        if data['password'] != data.pop('confirm_password'):
            raise serializers.ValidationError("Passwords do not match.")
        return data

    def create(self, validated_data):
        user = User.objects.create(
            username=validated_data['username'],
            email=validated_data['email']
        )
        user.set_password(validated_data['password'])
        user.save()
        return user

class UserLoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)

    def validate(self, data):
        email = data.get('email')
        password = data.get('password')

        if not email or not password:
            raise serializers.ValidationError("Must include 'email' and 'password'")

        try:
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            raise serializers.ValidationError("Invalid email or password")

        if not user.check_password(password):
            raise serializers.ValidationError("Invalid email or password")

        data['user'] = user
        return data
