from django.db import models
from .service import Service
from django.contrib import admin

class WebsiteForm(models.Model):

    name = models.CharField(max_length=100)
    email = models.EmailField()
    date = models.DateField()
    services = models.ManyToManyField(Service)
    other_info = models.TextField(blank=True, null=True)

    def __str__(self):
        return self.title
