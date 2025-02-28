from django.db import models
from django.conf import settings  # для связи с пользователями

class Order(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    total_price = models.DecimalField(max_digits=10, decimal_places=2)
    # Другие поля заказа (статус, адрес доставки и т.д.)

    def __str__(self):
        return f"Order #{self.id} by {self.user}"