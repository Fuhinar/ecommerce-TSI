# Generated by Django 5.1.6 on 2025-03-26 07:40

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('orders', '0003_order_status_alter_order_user'),
    ]

    operations = [
        migrations.AlterField(
            model_name='order',
            name='status',
            field=models.CharField(choices=[('pending', 'Ожидание оплаты'), ('in_progress', 'В процессе'), ('ready', 'Готово'), ('cancelled', 'Отменён')], default='pending', max_length=20),
        ),
    ]
