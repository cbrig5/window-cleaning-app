from django.urls import path
from website.views.service_view import ServiceListView

urlpatterns = [
    path('services/', ServiceListView.as_view(), name='service-list'),
]