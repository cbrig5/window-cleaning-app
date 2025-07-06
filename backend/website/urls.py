from django.urls import path
from website.views.service_view import ServiceListView
from website.views.user_view import  user_info

urlpatterns = [
    path('services/', ServiceListView.as_view(), name='service-list'),
    path('user-info/', user_info, name='user-info'),
]