from django.urls import path
from rest_framework.routers import DefaultRouter

from .views import (
    StudentViewSet,
    MarkViewSet,
    AttendanceViewSet,
    login_user,
)

router = DefaultRouter()

router.register(r"students", StudentViewSet)
router.register(r"marks", MarkViewSet)
router.register(r"attendance", AttendanceViewSet)


urlpatterns = [
    path("login/", login_user),
]

urlpatterns += router.urls