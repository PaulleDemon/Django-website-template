
from django.db import models
from django.core.exceptions import ValidationError


from user.models import User
from utils.common import generate_uniqueid


def generate_id():
    # table =  apps.get_model('blog', 'Blog')
    return generate_uniqueid(Blog, 'blog_id')


class Blog(models.Model):

    blog_id = models.CharField(max_length=20, unique=True, blank=True, default=generate_id)

    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)

    thumbnail = models.ImageField(null=True, blank=True, upload_to='blog/')

    title = models.CharField(max_length=200, default="")  
    body = models.TextField()

    datetime = models.DateTimeField(auto_now=True) # stays at last updated

    def __str__(self):
        return self.title

