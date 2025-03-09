from django.db import models

class Artist(models.Model):
    name = models.CharField(max_length=255)
    secondName = models.CharField(max_length=255)
    bio = models.TextField(blank=True)
    photo = models.ImageField(upload_to='artists/', blank=True)
    secondaryPhoto = models.ImageField(upload_to='artists/', blank=True)

    def __str__(self):
        return self.name
