from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import CreateOrderView, OrderViewSet

router = DefaultRouter()
router.register(r'', OrderViewSet, basename='order')

urlpatterns = [
    # Эндпоинт для создания заказа
    path('make-order/', CreateOrderView.as_view(), name='make_order'),
    # Стандартные маршруты для OrderViewSet:
    path('', include(router.urls)),
]

urlpatterns += router.urls
