from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .models import Order
from .serializers import OrderSerializer
from rest_framework import status, viewsets


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_order(request):
    items = request.data.get("items", [])
    total_price = request.data.get("total_price", 0)

    if not items:
        return Response({"error": "Нет товаров в заказе."}, status=status.HTTP_400_BAD_REQUEST)

    order = Order.objects.create(
        user=request.user,
        total_price=total_price,
        status="processing"
    )

    serializer = OrderSerializer(order)
    return Response(serializer.data, status=status.HTTP_201_CREATED)


class OrderViewSet(viewsets.ModelViewSet):
    serializer_class = OrderSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Order.objects.filter(user=self.request.user).order_by('-created_at')
