from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import DoctorViewSet, AppointmentViewSet, index, login_view, register, LogoutView, is_doctor, DoctorReviewViewSet
from . import views




router = DefaultRouter()
router.register(r'doctors', DoctorViewSet)
router.register(r'appointments', AppointmentViewSet)
router.register(r'medical-records', views.MedicalRecordViewSet)
router.register(r'messages', views.MessageViewSet)
router.register(r'reviews', DoctorReviewViewSet, basename='doctor-review')


urlpatterns = [
    path('', include(router.urls)),
    # path('api/', include(router.urls)),
    path('', index),
    path('register/', register, name='register'),
    path('login/', login_view, name='login'),
    path('logout/', LogoutView.as_view(), name='logout'),
    path('is-doctor/', is_doctor, name='is-doctor'),
]
