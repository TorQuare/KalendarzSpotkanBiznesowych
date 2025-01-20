from django.db import models
from django.conf import settings


class TimeSlot(models.Model):
    provider = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='time_slots')
    start_time = models.DateTimeField()
    end_time = models.DateTimeField()
    is_available = models.BooleanField(default=True)

    def __str__(self):
        return f'{self.provider.username}: {self.start_time} - {self.end_time}'


class Booking(models.Model):
    time_slot = models.OneToOneField('TimeSlot', on_delete=models.CASCADE, related_name='booking')
    customer_name = models.CharField(max_length=255)
    customer_mail = models.EmailField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'Booking for {self.time_slot} by {self.customer_name}'
