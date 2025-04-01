from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, permissions, viewsets
from .models import Order
from .serializers import OrderSerializer

class CreateOrderView(APIView):
    """
    Эндпоинт для создания заказа.
    Ожидается, что в request.data будут переданы:
      - items: список товаров (если нужен, для логики заказа)
      - total_price: общая сумма заказа
    """
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        items = request.data.get("items", [])
        total_price = request.data.get("total_price", 0)

        if not items:
            return Response({"error": "Нет товаров в заказе."},
                            status=status.HTTP_400_BAD_REQUEST)

        # Создаем заказ для текущего пользователя
        order = Order.objects.create(
            user=request.user,
            total_price=total_price,
            status="pending"  # можно изменить логику статуса по необходимости
        )

        # Если нужно, можно добавить логику для сохранения данных о товарах заказа
        serializer = OrderSerializer(order)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

class OrderViewSet(viewsets.ModelViewSet):
    """
    ViewSet для работы с заказами.
    Возвращает только заказы текущего пользователя.
    """
    serializer_class = OrderSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Order.objects.filter(user=self.request.user).order_by('-created_at')