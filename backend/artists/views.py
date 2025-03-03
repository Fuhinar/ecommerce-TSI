from rest_framework import viewsets
from rest_framework.permissions import AllowAny
from .models import Artist
from .serializers import ArtistSerializer

class ArtistViewSet(viewsets.ModelViewSet):
    queryset = Artist.objects.all()
    serializer_class = ArtistSerializer
    permission_classes = [AllowAny]