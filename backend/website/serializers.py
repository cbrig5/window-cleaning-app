from rest_framework import serializers
from .models.service import Service
from .models.client import Client
from .models.quote import Quote
from django.contrib.auth.models import User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'first_name', 'last_name' ,'username', 'email' ,'password']
        extra_kwargs = {'password': {'write_only': True}}
        
    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user

class ServiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Service
        fields = ['id', 'code', 'label']

class QuoteSerializer(serializers.ModelSerializer):
    service = serializers.PrimaryKeyRelatedField(queryset=Service.objects.all(), many=True)
    service_names = serializers.SerializerMethodField()
    client_name = serializers.SerializerMethodField()
    client_email = serializers.SerializerMethodField()
    
    client_phone = serializers.CharField(source='client.phone', read_only=True)
    client_address = serializers.CharField(source='client.address', read_only=True)

    class Meta:
        model = Quote
        fields = [
            'id', 'client', 'client_name', 'client_email', 'client_phone', 'client_address',
            'service', 'service_names', 'estimated_price', 'notes', 'sent_on'
        ]
        read_only_fields = ['client_name', 'client_email', 'client_phone', 'client_address','service_names']

    def get_service_names(self, obj):
        return [service.label for service in obj.service.all()]

    def get_client_name(self, obj):
        return obj.client.user.get_full_name() or obj.client.user.username

    def get_client_email(self, obj):
        return obj.client.user.email

class NestedUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'first_name', 'last_name', 'email']

class ClientSerializer(serializers.ModelSerializer):

    user = NestedUserSerializer()
    name = serializers.SerializerMethodField()
    email = serializers.SerializerMethodField()
    address = serializers.SerializerMethodField()
    created_on = serializers.SerializerMethodField()

    class Meta:
        model = Client
        fields = ['id', 'name', 'email', 'phone', 'address' ,'created_on']
        read_only_fields = ['created_on']

    def get_name(self, obj):
        return obj.user.get_full_name() or obj.user.username

    def get_email(self, obj):
        return obj.user.email

    def get_created_on(self, obj):
        return obj.user.date_joined

    def get_address(self, obj):
        return obj.full_address

    def update(self, instance, validated_data):
        user_data = validated_data.pop('user', None)
        if user_data:
            for attr, value in user_data.items():
                setattr(instance.user, attr, value)
            instance.user.save()
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()
        return instance