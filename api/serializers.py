from rest_framework import serializers
from .models import Doctor, Appointment, MedicalRecord, Message, DoctorReview
from django.contrib.auth.models import User


class DoctorSerializer(serializers.ModelSerializer):
    user = serializers.SlugRelatedField(queryset=User.objects.all(), slug_field='username')

    class Meta:
        model = Doctor
        fields = ['id', 'user', 'specialty']

    def create(self, validated_data):
        user = validated_data.pop('user')
        doctor = Doctor.objects.create(user=user, **validated_data)
        return doctor

class DoctorReviewSerializer(serializers.ModelSerializer):
    doctor_name = serializers.CharField(source='doctor.user.username', read_only=True)

    class Meta:
        model = DoctorReview
        fields = ['id', 'doctor', 'doctor_name', 'patient_name', 'review', 'rating']
        # fields = '__all__'


class AppointmentSerializer(serializers.ModelSerializer):
    doctor = serializers.PrimaryKeyRelatedField(queryset=Doctor.objects.all())

    class Meta:
        model = Appointment
        fields = ['id', 'doctor', 'date', 'time', 'patient_name']

    def create(self, validated_data):
        doctor = validated_data.pop('doctor')
        appointment = Appointment.objects.create(doctor=doctor, **validated_data)
        return appointment

class MedicalRecordSerializer(serializers.ModelSerializer):
    doctor = serializers.ReadOnlyField(source='doctor.username')

    class Meta:
        model = MedicalRecord
        fields = '__all__'


class MessageSerializer(serializers.ModelSerializer):
    doctor_name = serializers.CharField(source='doctor.user.username', read_only=True)

    class Meta:
        model = Message
        fields = ['id', 'patient_name', 'doctor', 'doctor_name', 'message']
