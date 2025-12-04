from django.db import models

# Create your models here.
from django.contrib.auth.models import AbstractUser
from django.db import models

class User(AbstractUser):

    ROLE_CHOICES = (
        ('customer', 'Customer'),
        ('merchant_admin', 'Merchant Admin'),
        ('platform_admin', 'Platform Admin'),
        ('rider', 'Rider'),
    )

    role = models.CharField(max_length=20, choices=ROLE_CHOICES, default='customer')
    phone = models.CharField(max_length=20, blank=True)
    address = models.TextField(blank=True)
    otp = models.CharField(max_length=6, blank=True, null=True)
    otp_verified = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.username} ({self.role})"
