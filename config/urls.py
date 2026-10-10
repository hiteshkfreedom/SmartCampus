
from django.contrib import admin
from django.urls import include, path
from django.http import JsonResponse

def home(request):
    return JsonResponse({
        "message": "Welcome to SmartCampus API!",
        "status": "running",
        "students_api": "/api/students/"
    })

urlpatterns = [
    path('', home, name='home'),
    path('admin/', admin.site.urls),
    path('api/', include('students.urls')),
]
