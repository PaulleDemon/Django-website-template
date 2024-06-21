from django.contrib import admin

from django.contrib.sites import models
from unfold.admin import ModelAdmin

# contains 3rd party models to be integrated to unfold admin

class UnfoldSiteAdmin(ModelAdmin):
    list_display = ['domain', 'name']



admin.site.unregister(models.Site)
admin.site.register(models.Site, UnfoldSiteAdmin)