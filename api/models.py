from django.db import models
from django.contrib.auth.models import User
from datetime import datetime


class Doctor(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    specialty = models.CharField(max_length=100)

    def __str__(self):
        return f'{self.user.username} - {self.specialty}'


class DoctorReview(models.Model):
    doctor = models.ForeignKey('Doctor', on_delete=models.CASCADE)
    patient_name = models.CharField(max_length=100)
    review = models.TextField()
    rating = models.PositiveIntegerField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Review by {self.patient_name} for {self.doctor} - Rating: {self.rating}"

class Appointment(models.Model):
    doctor = models.ForeignKey('Doctor', on_delete=models.CASCADE, blank=True, null=True)
    date = models.DateField(default=datetime.now)
    time = models.TimeField(default=datetime.now)
    patient_name = models.CharField(max_length=100, blank=True, null=True)

    def __str__(self):
        return f'{self.patient_name} - {self.date} {self.time}'


class MedicalRecord(models.Model):
    doctor = models.ForeignKey(User, on_delete=models.CASCADE, related_name='medical_records', blank=True, null=True)
    patient_name = models.CharField(max_length=255, blank=True, null=True)
    date_of_birth = models.DateField(default=datetime.now)
    complaints = models.TextField(blank=True, null=True)
    prescribed_medications = models.TextField(blank=True, null=True)
    current_condition = models.TextField(blank=True, null=True)

    def __str__(self):
        return self.patient_name or "No Patient Name"


class Message(models.Model):
    patient_name = models.CharField(max_length=100, blank=True, null=True)
    doctor = models.ForeignKey(Doctor, on_delete=models.CASCADE, blank=True, null=True)
    message = models.TextField()

    def __str__(self):
        return f'{self.patient_name} - {self.message[:20]}'
