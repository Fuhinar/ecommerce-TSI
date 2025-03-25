from django.urls import path
from users.views import RegisterView, LoginView, ProfileView, SendVerificationCodeView

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', LoginView.as_view(), name='login'),
    path('profile/', ProfileView.as_view(), name='profile'),
    path('send-code/', SendVerificationCodeView.as_view(), name='send_code'),
]