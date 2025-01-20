from .models import TimeSlot, Booking
from rest_framework import viewsets, permissions, status
from .serializers import TimeSlotSerializer, BookingSerializer, UserSerializer
from rest_framework.response import Response
from rest_framework.views import APIView


class CreateUserView(APIView):

    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class TimeSlotViewSet(viewsets.ModelViewSet):
    queryset = TimeSlot.objects.all()
    serializer_class = TimeSlotSerializer
    permission_classes = [permissions.AllowAny]

    def get_queryset(self):
        queryset = super().get_queryset()
        is_available = self.request.query_params.get('is_available')
        if is_available:
            queryset = queryset.filter(is_available=is_available == 'true')
        return queryset


class BookingViewSet(viewsets.ModelViewSet):
    queryset = Booking.objects.all()
    serializer_class = BookingSerializer
    permission_classes = [permissions.AllowAny]

    def perform_create(self, serializer):
        serializer.save(booked_by=self.request.user if self.request.user.is_authenticated else None)
