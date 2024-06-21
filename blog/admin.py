from django.contrib import admin

from .models import Blog

from .widgets import TrixEditorWidget


@admin.register(Blog)
class BlogAdmin(admin.ModelAdmin):
    
    search_fields = ['title']
    list_display = ['title', 'datetime',]

    list_filter_submit = True
    list_filter = ['datetime']

    readonly_fields = ['blog_id', 'datetime', 'id', ]

    autocomplete_fields = ['user']
    
    
    def get_sub_title(self, obj):
        return obj.title[:30]

    get_sub_title.short_description = 'title'

    def get_form(self, request, obj=None, change=False, **kwargs):
        form = super().get_form(request, obj=obj, change=change, **kwargs)
        # print("forms: ", form.base_fields)
        form.base_fields["body"].widget = TrixEditorWidget()
        return form

 