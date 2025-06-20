from rest_framework import serializers
from .models.service import Service
from .models.client import Client
from .models.quote import Quote

class ServiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Service
        fields = ['id', 'code', 'label']

class QuoteSerializer(serializers.ModelSerializer):
    service = serializers.PrimaryKeyRelatedField(queryset=Service.objects.all(), many=True)
    service_names = serializers.SerializerMethodField()
    client_name = serializers.CharField(source='client.name', read_only=True)
    class Meta:
        model = Quote
        fields = ['id', 'client', 'client_name', 'service', 'service_names', 'estimated_price', 'notes', 'sent_on']

    def get_service_names(self, obj):
        return [service.label for service in obj.service.all()]

class ClientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Client
        fields = ['id', 'name', 'email', 'phone', 'address' ,'created_on']
        read_only_fields = ['created_on']
