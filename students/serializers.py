from rest_framework import serializers

from .models import Student, Mark, Attendance


class StudentSerializer(serializers.ModelSerializer):

    class Meta:
        model = Student
        fields = "__all__"

    def validate_phone(self, value):

        if not value.isdigit():
            raise serializers.ValidationError(
                "Phone number must contain only digits."
            )

        if len(value) != 10:
            raise serializers.ValidationError(
                "Phone number must contain exactly 10 digits."
            )

        return value


class MarkSerializer(serializers.ModelSerializer):

    student_name = serializers.CharField(
        source="student.name",
        read_only=True
    )

    class Meta:
        model = Mark
        fields = [
            "id",
            "student",
            "student_name",
            "subject",
            "marks",
            "total_marks",
        ]

    def validate(self, data):

        marks = data.get("marks")
        total_marks = data.get("total_marks")

        if marks < 0:
            raise serializers.ValidationError(
                "Marks cannot be negative."
            )

        if total_marks <= 0:
            raise serializers.ValidationError(
                "Total marks must be greater than 0."
            )

        if marks > total_marks:
            raise serializers.ValidationError(
                "Marks cannot be greater than total marks."
            )

        return data


class AttendanceSerializer(serializers.ModelSerializer):

    student_name = serializers.CharField(
        source="student.name",
        read_only=True
    )

    class Meta:
        model = Attendance
        fields = [
            "id",
            "student",
            "student_name",
            "total_classes",
            "attended_classes",
        ]

    def validate(self, data):

        total_classes = data.get("total_classes")
        attended_classes = data.get("attended_classes")

        if total_classes <= 0:
            raise serializers.ValidationError(
                "Total classes must be greater than 0."
            )

        if attended_classes < 0:
            raise serializers.ValidationError(
                "Attended classes cannot be negative."
            )

        if attended_classes > total_classes:
            raise serializers.ValidationError(
                "Attended classes cannot be greater than total classes."
            )

        return data