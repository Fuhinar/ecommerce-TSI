from django.db import models
from artists.models import Artist

class Product(models.Model):
    CATEGORY_CHOICES = [
        ('scarf', 'Платок'),
        ('hoodie', 'Толстовка'),
        ('sweatshirt', 'Свитшот'),
        ('painting', 'Картина'),
        ('t-shirt', 'Футболка'),
        ('pazzle', 'Пазл'),
        ('shopper', 'Шоппер'),
    ]

    category = models.CharField(max_length=50, choices=CATEGORY_CHOICES)
    artist = models.ForeignKey(Artist, on_delete=models.CASCADE, related_name='products')
    title = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    image = models.ImageField(upload_to='products/', blank=True)

    def __str__(self):
        return self.title
