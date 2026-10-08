from rest_framework import viewsets
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from rest_framework.authtoken.models import Token
from django.contrib.auth import authenticate
from rest_framework.permissions import IsAuthenticated

from .models import Student, Mark, Attendance
from .serializers import (
    StudentSerializer,
    MarkSerializer,
    AttendanceSerializer,
)


class StudentViewSet(viewsets.ModelViewSet):
    queryset = Student.objects.all()
    serializer_class = StudentSerializer
    permission_classes = [IsAuthenticated]


class MarkViewSet(viewsets.ModelViewSet):
    queryset = Mark.objects.all()
    serializer_class = MarkSerializer
    permission_classes = [IsAuthenticated]


class AttendanceViewSet(viewsets.ModelViewSet):
    queryset = Attendance.objects.all()
    serializer_class = AttendanceSerializer
    permission_classes = [IsAuthenticated]


@api_view(["POST"])
def login_user(request):

    username = request.data.get("username")
    password = request.data.get("password")

    user = authenticate(
        username=username,
        password=password
    )

    if user is not None:

        token, created = Token.objects.get_or_create(
            user=user
        )

        return Response({
            "message": "Login successful",
            "username": user.username,
            "token": token.key
        })

    return Response(
        {
            "message": "Invalid username or password"
        },
        status=status.HTTP_401_UNAUTHORIZED
    )