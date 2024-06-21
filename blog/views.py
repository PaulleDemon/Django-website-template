from django.db.models import Q
from django.core.paginator import Paginator
from django.shortcuts import render
from django.views.decorators.http import require_http_methods

from .models import Blog


@require_http_methods(['GET'])
def get_blog(request, blogid, title=None):
    try:
        
        blog = Blog.objects.filter(blog_id=blogid)


        return render(request, 'blog-view.html', {
                                            'blog': blog,
                                            'page_title': blog.title
                                        })

    except Blog.DoesNotExist:
        return render(request, '404.html', status=404)


@require_http_methods(['GET'])
def list_blogs(request):

    my = request.GET.get('my')
    search = request.GET.get('search', '')

    page_number = request.GET.get("page", 1)
    blogs = Blog.objects.all().order_by('-datetime')

    paginator = Paginator(blogs, per_page=15)
    page = paginator.get_page(page_number)
    
    return render(request, 'html/blog/blog-list.html', {
                                                'blogs': page,
                                                'search': search
                                            })


