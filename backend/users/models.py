from django.contrib.auth.models import AbstractUser
from django.db import models

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