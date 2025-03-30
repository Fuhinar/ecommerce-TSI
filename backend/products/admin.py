import openai
from django.contrib import admin
from django.utils.html import format_html
from django.urls import path
from django.shortcuts import redirect
from django.conf import settings
from django.contrib import messages
from django.http import HttpResponseRedirect
from .models import Product
from artists.models import Artist  # Импортируем модель художника

# Указываем API-ключ OpenAI
openai.api_key = settings.OPENAI_API_KEY

@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ('title', 'category', 'artist', 'price', 'image_preview', 'generate_description_button')
    list_filter = ('category', 'artist')
    search_fields = ('title', 'artist__name')
    readonly_fields = ('image_preview',)

    def image_preview(self, obj):
        """Отображает превью загруженного изображения в админке"""
        if obj.image:
            return format_html('<img src="{}" width="80" style="border-radius: 5px;" />', obj.image.url)
        return "No Image"
    
    image_preview.short_description = "Preview"

    def generate_description_button(self, obj):
        """Создаёт кнопку 'Сгенерировать описание' в админке Django"""
        return format_html(
            '<a class="button" href="{}">Сгенерировать описание</a>',
            f"generate_description/{obj.id}"
        )

    generate_description_button.allow_tags = True
    generate_description_button.short_description = "Генерация описания"

    def get_urls(self):
        """Добавляем кастомный URL для обработки генерации описания"""
        urls = super().get_urls()
        custom_urls = [
            path('generate_description/<int:product_id>/', self.admin_site.admin_view(self.generate_description)),
        ]
        return custom_urls + urls

    def generate_description(self, request, product_id):
        """Функция для генерации описания с помощью OpenAI"""
        product = Product.objects.get(id=product_id)

        if not product.image:
            self.message_user(request, "Ошибка: У товара нет изображения!", level=messages.ERROR)
            return HttpResponseRedirect(request.META.get('HTTP_REFERER'))

        artist_bio = product.artist.bio if product.artist and product.artist.bio else "Описание художника отсутствует."
        artist_secondName = product.artist.secondName if product.artist and product.artist.secondName else "Фамилия художника отсутствует."

        prompt = f"""
        Представь что ты невероятнейший продавец, который продаст что угодно кому угодно, и ты продаешь картины детей с аутизмом, но они рисуют супер красивые картины. 

        Создай трогательное и очень красивое художественное описание для продукта: {product.title}.
        Категория: {product.category}.
        Художник: {artist_secondName} {product.artist.name} .
        
        Художник известен благодаря следующему описанию:
        "{artist_bio}"

        Ты должен сделать такое описание этой картины по данному рисунку, чтобы человек читающий это сразу же захотел купить эту картину. 
        Прямо в лоб, нельзя говорить чтобы человек купил ее, нужно психологически это сделать, чтобы человек на подсознательном уровне очень пожелал купить эту картину.

        Примечание: Не пиши имя, категорию и художника, пропускай эту часть и сразу переходи к описанию.
        """

        try:
            client = openai.OpenAI(api_key=settings.OPENAI_API_KEY)
            response = client.chat.completions.create(
                model="gpt-4o-mini",
                messages=[{"role": "system", "content": prompt}],
            )
            generated_text = response.choices[0].message.content.strip()
            product.description = generated_text
            product.save()
            self.message_user(request, "Описание успешно сгенерировано!", level=messages.SUCCESS)

        except Exception as e:
            self.message_user(request, f"Ошибка генерации: {str(e)}", level=messages.ERROR)

        return HttpResponseRedirect(request.META.get('HTTP_REFERER'))
