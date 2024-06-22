from django.contrib import admin

from .models import Blog, BlogImage

from .widgets import TrixEditorWidget


class InlineBlogImgAdmin(admin.StackedInline):

    model = BlogImage
    extra = 0


@admin.register(Blog)
class BlogAdmin(admin.ModelAdmin):
    
    search_fields = ['title']
    list_display = ['title', 'datetime', 'draft']

    list_filter_submit = True
    list_filter = ['datetime']

    readonly_fields = ['blog_id', 'datetime',  'id', ]

    autocomplete_fields = ['user']
    
    
    def get_sub_title(self, obj):
        return obj.title[:60]

    get_sub_title.short_description = 'title'

    def get_form(self, request, obj=None, change=False, **kwargs):
        form = super().get_form(request, obj=obj, change=change, **kwargs)
        form.base_fields["body"].widget = TrixEditorWidget()
        form.base_fields["body"].help_text = "To upload files you must save your blog first"
        return form

 