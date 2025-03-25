# payments/views.py

import uuid
import hashlib
import os
import requests
import xml.etree.ElementTree as ET

from django.http import JsonResponse, HttpResponse
from django.views.decorators.csrf import csrf_exempt
from django.conf import settings
from decouple import config


def generate_signature(script_name, params, secret_key):
    """
    Генерирует цифровую подпись, используя алгоритм:
      - Сортировка параметров по ключу
      - Объединение: script_name + значения параметров (в отсортированном порядке) + secret_key,
      - Вычисление MD5-хэша итоговой строки.
    """
    sorted_params = sorted(params.items())
    signature_string = ";".join([script_name] + [str(value) for _, value in sorted_params] + [secret_key])
    return hashlib.md5(signature_string.encode('utf-8')).hexdigest()


@csrf_exempt
def direct_payment(request):
    """
    Эндпоинт для проведения платежа по данным карты.
    Ожидается POST-запрос с обязательными параметрами:
      - order_id         — Идентификатор заказа (строка)
      - amount           — Сумма платежа (например, 10 или 500)
      - description      — Описание платежа (например, "Покупка товара X")
      - card_name        — Имя держателя карты
      - card_pan         — Номер карты
      - card_cvc         — CVC/CVV код
      - card_year        — Год окончания срока карты (2 цифры, например, "24")
      - card_month       — Месяц окончания срока карты (2 цифры, например, "12")
      - auto_clearing    — (необязательно) Тип списания (по умолчанию "1" – автоматическое списание)
      
    Остальные параметры (например, pg_currency, pg_testing_mode, pg_result_url) берутся из настроек.
    """
    if request.method != "POST":
        return JsonResponse({"error": "Метод должен быть POST."}, status=405)

    # Извлечение обязательных параметров из запроса
    order_id    = request.POST.get("order_id")
    amount      = request.POST.get("amount")
    description = request.POST.get("description")
    card_name   = request.POST.get("card_name")
    card_pan    = request.POST.get("card_pan")
    card_cvc    = request.POST.get("card_cvc")
    card_year   = request.POST.get("card_year")
    card_month  = request.POST.get("card_month")
    auto_clearing = request.POST.get("auto_clearing", "1")

    if not all([order_id, amount, description, card_name, card_pan, card_cvc, card_year, card_month]):
        return JsonResponse({"error": "Не переданы все обязательные параметры."}, status=400)

    # Генерация случайной строки (salt)
    salt = uuid.uuid4().hex

    # Получаем параметры из .env или настроек Django
    merchant_id  = config("FREEDOMPAY_MERCHANT_ID")
    secret_key   = config("FREEDOMPAY_SECRET_KEY")
    result_url   = config("FREEDOMPAY_RESULT_URL")
    testing_mode = config("FREEDOMPAY_TEST_MODE", default="1")

    # Формируем словарь параметров согласно документации FreedomPay (для метода "Проведение платежей")
    params = {
        "pg_amount": amount,
        "pg_currency": "KZT",  # В Казахстане принимается только KZT
        "pg_description": description,
        "pg_merchant_id": merchant_id,
        "pg_order_id": order_id,
        "pg_card_name": card_name,
        "pg_card_pan": card_pan,
        "pg_card_cvc": card_cvc,
        "pg_card_year": card_year,
        "pg_card_month": card_month,
        "pg_auto_clearing": auto_clearing,
        "pg_testing_mode": testing_mode,
        "pg_result_url": result_url,
        "pg_3ds_challenge": "0",  # По умолчанию – без принудительного 3DSecure
        "pg_salt": salt,
        "pg_idempotency_key": salt,
    }

    # Вычисляем цифровую подпись для запроса (используем script_name = "payment")
    signature = generate_signature("payment", params, secret_key)
    params["pg_sig"] = signature

    # Определяем URL для запроса: тестовый или боевой
    if testing_mode == "1":
        payment_url = "https://test-api.freedompay.kg/g2g/payment"
    else:
        payment_url = "https://api.freedompay.kg/g2g/payment"

    # Отправляем POST-запрос в FreedomPay
    try:
        response = requests.post(payment_url, data=params, timeout=30)
    except requests.RequestException as e:
        return JsonResponse({"error": "Ошибка подключения к платежному шлюзу", "details": str(e)}, status=500)

    # Парсинг XML-ответа от FreedomPay
    try:
        root = ET.fromstring(response.content)
        result_data = {child.tag: child.text for child in root}
    except ET.ParseError:
        result_data = {"raw_response": response.text}

    return JsonResponse(result_data)


@csrf_exempt
def payment_result(request):
    """
    Эндпоинт, который вызывается FreedomPay после проведения платежа.
    Здесь вы можете:
      - Обновить статус заказа в своей системе
      - Принять решение об откате платежа (если pg_can_reject == 1)
    
    В ответ необходимо вернуть XML с полями:
      - pg_status
      - pg_description
      - pg_salt
      - pg_sig
    В данном примере мы всегда подтверждаем платеж (pg_status = ok).
    """
    # Получаем данные, переданные FreedomPay (метод POST)
    received_data = request.POST.dict()
    print("Получен результат платежа от FreedomPay:", received_data)

    # Здесь можно реализовать бизнес-логику:
    # например, проверить received_data["pg_result"] и обновить статус заказа.
    #
    # Если платеж может быть откатан (pg_can_reject == "1") и вы хотите откатить его,
    # вместо "ok" можно вернуть "rejected" и указать причину в pg_description.

    # Генерируем новый salt для ответа (или используем полученный, если требуется)
    pg_salt = received_data.get("pg_salt", uuid.uuid4().hex)

    # Для подписи ответа можно использовать те же алгоритмы, например:
    secret_key = config("FREEDOMPAY_SECRET_KEY")
    response_params = {
        "pg_status": "ok",
        "pg_description": "Платеж принят",
        "pg_salt": pg_salt,
    }
    response_sig = generate_signature("result", response_params, secret_key)

    response_xml = f"""<?xml version="1.0" encoding="utf-8"?>
<response>
    <pg_status>ok</pg_status>
    <pg_description>Платеж принят</pg_description>
    <pg_salt>{pg_salt}</pg_salt>
    <pg_sig>{response_sig}</pg_sig>
</response>"""
    return HttpResponse(response_xml, content_type="application/xml")
