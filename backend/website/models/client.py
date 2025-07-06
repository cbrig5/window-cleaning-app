from django.db import models
from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.contrib import admin
from django.dispatch import receiver


class Client(models.Model):
    user = models.OneToOneField('auth.User', on_delete=models.CASCADE, null=True)
    phone = models.CharField(max_length=15, blank=True)
    street = models.CharField(max_length=255, blank=True)
    city = models.CharField(max_length=100, blank=True)
    state = models.CharField(max_length=100, blank=True)
    zip_code = models.CharField(max_length=20, blank=True)

    def __str__(self):
        return f"Client: {self.user.first_name} {self.user.last_name}"

    @property
    def full_name(self):
        return self.user.get_full_name() or self.user.username
    
    @property
    def email(self):
        return self.user.email
    
    @property
    def created_on(self):
        return self.user.date_joined

    @property
    def full_address(self):
        parts = [self.street, self.city, self.state, self.zip_code]
        return ', '.join(part for part in parts if part)
 


@receiver(post_save, sender=User)
def create_client_from_user(sender, instance, created, **kwargs):
    if created and not instance.is_staff:
        Client.objects.create(user=instance)
