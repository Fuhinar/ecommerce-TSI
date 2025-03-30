from django.contrib import admin
from django.urls import path, include
from rest_framework import routers

from artists.views import ArtistViewSet
from events.views import EventViewSet
from products.views import ProductViewSet
from users.views import UserViewSet, RegisterView, LoginView
from django.conf import settings
from django.conf.urls.static import static
from django.views.generic import TemplateView

router = routers.DefaultRouter()
router.register(r'artists', ArtistViewSet)
router.register(r'events', EventViewSet)
router.register(r'products', ProductViewSet)
router.register(r'users', UserViewSet)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    path('auth/', include('users.urls')),
    path('', TemplateView.as_view(template_name='index.html'), name='home'),
    path('api/orders/', include('orders.urls')),
]

from django.conf import settings
from django.conf.urls.static import static
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
