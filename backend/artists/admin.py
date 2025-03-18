from django.contrib import admin
from .models import Artist

@admin.register(Artist)
class ArtistAdmin(admin.ModelAdmin):
    list_display = ('name', 'secondName', 'bio', 'photo_preview')
    search_fields = ('name', 'secondName')
    list_filter = ('name',) 
    readonly_fields = ('photo_preview',)

    def photo_preview(self, obj):
        if obj.photo:
            return f'<img src="{obj.photo.url}" width="100" style="border-radius: 5px;" />'
        return "No Image"
    
    photo_preview.allow_tags = True
    photo_preview.short_description = "Photo Preview"

