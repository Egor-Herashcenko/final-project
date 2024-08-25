# Generated by Django 5.1 on 2024-08-23 05:41

import datetime
import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0005_message_doctor_message_patient_name'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.RemoveField(
            model_name='medicalrecord',
            name='record',
        ),
        migrations.AddField(
            model_name='medicalrecord',
            name='complaints',
            field=models.TextField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='medicalrecord',
            name='current_condition',
            field=models.TextField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='medicalrecord',
            name='date_of_birth',
            field=models.DateField(default=datetime.datetime.now),
        ),
        migrations.AddField(
            model_name='medicalrecord',
            name='doctor',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='medical_records', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='medicalrecord',
            name='patient_name',
            field=models.CharField(blank=True, max_length=255, null=True),
        ),
        migrations.AddField(
            model_name='medicalrecord',
            name='prescribed_medications',
            field=models.TextField(blank=True, null=True),
        ),
    ]