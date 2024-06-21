from django.urls import path
from django.shortcuts import redirect

from .views import list_blogs, get_blog

# app_name = 'blog'

urlpatterns = [

    path('', lambda request: redirect('list-blogs'), name='blogs'),
        
    path('list/', list_blogs, name='list-blogs'),

    path('<str:blogid>/', get_blog, name='get-blog'),
    path('<str:blogid>/<slug:title>/', get_blog, name='get-blog'),
]
