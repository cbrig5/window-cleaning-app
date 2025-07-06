from rest_framework.permissions import AllowAny
from rest_framework.views import APIView
from rest_framework.response import Response
from website.models import Service
from website.serializers import ServiceSerializer

class ServiceListView(APIView):
    permission_classes = [AllowAny]
    def get(self, request):
        services = Service.objects.all()
        serializer = ServiceSerializer(services, many=True)
        return Response(serializer.data)