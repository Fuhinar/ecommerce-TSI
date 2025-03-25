from django.contrib.auth.models import AbstractUser
from django.db import models
import random

class User(AbstractUser):
    avatar = models.ImageField(
        upload_to='avatars/',
        null=True,
        blank=True,
        help_text="Profile picture of the user.",
        verbose_name="avatar"
    )
    email = models.EmailField(
        unique=True,
        help_text="Email address of the user.",
        verbose_name="email"
    )

    class Meta:
        verbose_name = "user"
        verbose_name_plural = "users"

    def __str__(self):
        return self.username

class EmailVerification(models.Model):
    email = models.EmailField()
    code = models.CharField(max_length=6)
    created_at = models.DateTimeField(auto_now_add=True)

    @staticmethod
    def generate_code():
        return str(random.randint(100000, 999999))

    def __str__(self):
        return f"{self.email} - {self.code}"
