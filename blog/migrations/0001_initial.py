# Generated by Django 4.2.11 on 2024-06-21 13:23

import blog.models
from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Blog',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('blog_id', models.CharField(blank=True, default=blog.models.generate_id, max_length=20, unique=True)),
                ('thumbnail', models.ImageField(blank=True, null=True, upload_to='blog/')),
                ('title', models.CharField(default='', max_length=200)),
                ('body', models.TextField()),
                ('datetime', models.DateTimeField(auto_now=True)),
                ('user', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
