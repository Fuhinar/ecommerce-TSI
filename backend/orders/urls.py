from django.urls import path
from .views import create_order, OrderViewSet
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'', OrderViewSet, basename='orders')

urlpatterns = [
    path('make-order/', create_order, name='create-order'),
]

urlpatterns += router.urls
