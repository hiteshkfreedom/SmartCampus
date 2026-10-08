from django.db import models


class Student(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    phone = models.CharField(max_length=15)
    course = models.CharField(max_length=100)
    date_joined = models.DateField(auto_now_add=True)

    def __str__(self):
        return self.name


class Mark(models.Model):
    student = models.ForeignKey(
        Student,
        on_delete=models.CASCADE
    )
    subject = models.CharField(max_length=100)
    marks = models.IntegerField()
    total_marks = models.IntegerField(default=100)

    def __str__(self):
        return f"{self.student.name} - {self.subject}"

class Attendance(models.Model):
    student = models.ForeignKey(
        Student,
        on_delete=models.CASCADE
    )
    total_classes = models.IntegerField()
    attended_classes = models.IntegerField()

    def __str__(self):
        return f"{self.student.name} - Attendance"