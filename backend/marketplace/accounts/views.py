from django.shortcuts import render

# Create your views here.
from rest_framework import generics
from .serializers import RegisterSerializer, UserSerializer
from django.contrib.auth import get_user_model
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
import random

User = get_user_model()

class RegisterView(generics.CreateAPIView):
    serializer_class = RegisterSerializer


# --- USER PROFILE ---
class ProfileView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        return Response(UserSerializer(request.user).data)

    def put(self, request):
        user = request.user
        for key, value in request.data.items():
            setattr(user, key, value)
        user.save()
        return Response(UserSerializer(user).data)


# --- OTP SEND ---
class SendOTPView(APIView):
    def post(self, request):
        phone = request.data.get("phone")

        user = User.objects.filter(phone=phone).first()
        if not user:
            return Response({"error": "Phone number not registered"}, status=404)

        otp = str(random.randint(100000, 999999))
        user.otp = otp
        user.save()

        # Send OTP using SMS gateway (later integrate)
        print("OTP sent:", otp)

        return Response({"message": "OTP sent successfully"})


# --- OTP VERIFY ---
class VerifyOTPView(APIView):
    def post(self, request):
        phone = request.data.get("phone")
        otp = request.data.get("otp")

        user = User.objects.filter(phone=phone, otp=otp).first()
        if not user:
            return Response({"error": "Invalid OTP"}, status=400)

        user.otp_verified = True
        user.otp = None
        user.save()

        return Response({"message": "OTP verified"})
