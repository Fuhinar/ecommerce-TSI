from django.db import models

class Event(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    date = models.DateField()
    # Можно добавить место проведения, изображение и т.д.

    def __str__(self):
        return self.title