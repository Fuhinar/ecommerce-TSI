# Используем образ Python 3.11.9-slim
FROM python:3.11.9-slim

WORKDIR /backend

# Копируем зависимости и устанавливаем их
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Копируем весь исходный код проекта
COPY . .

# Если у вас есть entrypoint, копируем его и делаем исполняемым
COPY entrypoint.sh .
RUN chmod +x entrypoint.sh

# Устанавливаем переменную окружения для настроек Django
ENV DJANGO_SETTINGS_MODULE=app.settings

# Запускаем приложение с помощью Gunicorn
CMD ["gunicorn", "app.wsgi:application", "--bind", "0.0.0.0:8000"]
