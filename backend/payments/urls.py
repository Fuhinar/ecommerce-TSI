from django.urls import path
from payments.views import direct_payment, payment_result

urlpatterns = [
    # Эндпоинт для проведения платежа (используйте при отправке реквизитов карты)
    path('payment/direct/', direct_payment, name='direct_payment'),

    # Эндпоинт для приёма callback-уведомления от FreedomPay
    path('payment/result/', payment_result, name='payment_result'),
]
