from django.db import models
from django.contrib import admin
from .service import Service
from .client import Client


class Quote(models.Model):
    client = models.ForeignKey(Client, on_delete=models.CASCADE, related_name='quotes')
    service = models.ManyToManyField(Service, related_name='quotes')
    estimated_price = models.DecimalField(max_digits=6, decimal_places=2)
    notes = models.TextField(blank=True)
    sent_on = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Quote for {self.client_name} - on {self.sent_on.date()}"
