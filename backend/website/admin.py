from django.contrib import admin
from .models import Client, Service, Quote, WebsiteForm

admin.site.register(WebsiteForm)
admin.site.register(Service)

@admin.register(Client)
class ClientAdmin(admin.ModelAdmin):
    list_display = ('name', 'email', 'phone')
    search_fields = ('name', 'email')
    ordering = ('name', 'created_on')

@admin.register(Quote)
class QuoteAdmin(admin.ModelAdmin):
    list_display = ('client_name', 'estimated_price', 'sent_on')
    search_fields = ('client__name', 'service__code')
    list_filter = ('sent_on',)
    ordering = ('-sent_on',)

    def client_name(self, obj):
        return obj.client.name
    client_name.short_description = 'Client Name'
    client_name.admin_order_field = 'client__name'
