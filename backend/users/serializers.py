from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import EmailVerification

User = get_user_model()

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'first_name', 'last_name', 'avatar')

class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    password2 = serializers.CharField(write_only=True)
    verificationCode = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ('username', 'email', 'password', 'password2', 'verificationCode', 'first_name', 'last_name')

    def validate(self, attrs):
        if attrs['password'] != attrs['password2']:
            raise serializers.ValidationError({"password": "Пароли не совпадают."})
        email = attrs.get('email')
        verification_code = attrs.get('verificationCode')
        try:
            EmailVerification.objects.get(email=email, code=verification_code)
        except EmailVerification.DoesNotExist:
            raise serializers.ValidationError({"verificationCode": "Неверный или просроченный код подтверждения."})
        return attrs

    def create(self, validated_data):
        validated_data.pop('password2')
        validated_data.pop('verificationCode')
        user = User.objects.create_user(**validated_data)
        return user

class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()

class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username', 'email', 'first_name', 'last_name', 'avatar')

class EmailVerificationSerializer(serializers.Serializer):
    email = serializers.EmailField(required=True)
