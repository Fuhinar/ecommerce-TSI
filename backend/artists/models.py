from django.db import models

class Artist(models.Model):
    name = models.CharField(max_length=255)
    bio = models.TextField(blank=True)
    photo = models.URLField(blank=True)

    def __str__(self):
        return self.name
