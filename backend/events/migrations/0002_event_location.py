# Generated by Django 5.1.6 on 2025-03-02 20:45

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('events', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='event',
            name='location',
            field=models.CharField(default=1, max_length=255),
            preserve_default=False,
        ),
    ]
