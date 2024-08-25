from django.contrib import admin
from .models import MedicalRecord, Doctor, DoctorReview, Appointment

@admin.register(MedicalRecord)
class MedicalRecordAdmin(admin.ModelAdmin):
    list_display = ('patient_name', 'date_of_birth', 'doctor')
    search_fields = ('patient_name', 'doctor__username')
    list_filter = ('doctor', 'date_of_birth')


class AppointmentAdmin(admin.ModelAdmin):
    list_display = ('doctor', 'patient_name', 'date', 'time')
    list_filter = ('doctor', 'date')
    search_fields = ('doctor__name', 'patient_name')

admin.site.register(Doctor)
admin.site.register(DoctorReview)
admin.site.register(Appointment, AppointmentAdmin)
