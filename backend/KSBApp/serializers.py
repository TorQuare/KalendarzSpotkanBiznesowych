__version__ = ''
__author__ = 'Patryk Bajgot'

from rest_framework import serializers
from .models import TimeSlot, Booking
from django.contrib.auth.models import User


class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = [
            'id',
            'username',
            'email',
            'password',
        ]

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password']
        )
        return user


class TimeSlotSerializer(serializers.ModelSerializer):
    class Meta:
        model = TimeSlot
        fields = [
            'id',
            'provider',
            'start_time',
            'end_time',
            'is_available',
        ]


class BookingSerializer(serializers.ModelSerializer):
    time_slot = TimeSlotSerializer(read_only=True)

    class Meta:
        model = Booking
        fields = [
            'id',
            'time_slot',
            'customer_name',
            'customer_mail',
            'created_at',
        ]
