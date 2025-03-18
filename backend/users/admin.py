from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import User

@admin.register(User)
class CustomUserAdmin(UserAdmin):
    model = User
    list_display = ('username', 'email', 'first_name', 'last_name', 'avatar_preview', 'is_staff', 'is_active')
    search_fields = ('username', 'email')
    list_filter = ('is_staff', 'is_active')
    readonly_fields = ('avatar_preview',)

    fieldsets = (
        (None, {'fields': ('username', 'password')}),
        ('Personal Info', {'fields': ('first_name', 'last_name', 'email', 'avatar')}),
        ('Permissions', {'fields': ('is_active', 'is_staff', 'is_superuser', 'groups', 'user_permissions')}),
        ('Important Dates', {'fields': ('last_login', 'date_joined')}),
    )

    def avatar_preview(self, obj):
        """Отображает превью аватара в админке"""
        if obj.avatar:
            return f'<img src="{obj.avatar.url}" width="60" style="border-radius: 5px;" />'
        return "No Avatar"

    avatar_preview.allow_tags = True
    avatar_preview.short_description = "Avatar Preview"
