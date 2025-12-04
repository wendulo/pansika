from django.urls import path
from .views import RegisterView, ProfileView, SendOTPView, VerifyOTPView
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    path('register/', RegisterView.as_view()),
    path('login/', TokenObtainPairView.as_view()),       # JWT login
    path('token/refresh/', TokenRefreshView.as_view()),  # refresh token

    path('profile/', ProfileView.as_view()),
    path('send-otp/', SendOTPView.as_view()),
    path('verify-otp/', VerifyOTPView.as_view()),
]
