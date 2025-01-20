__version__ = ''
__author__ = 'Patryk Bajgot'

from django.urls import path, include
from .views import TimeSlotViewSet, BookingViewSet, CreateUserView
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'time-slots', TimeSlotViewSet, basename='time-slot')
router.register(r'bookings', BookingViewSet, basename='booking')

urlpatterns = [
    path('api/', include(router.urls)),
    path('create-user/', CreateUserView.as_view(), name='create_user')
]
