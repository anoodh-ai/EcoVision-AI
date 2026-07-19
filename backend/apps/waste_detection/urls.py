from django.urls import path

from .views import (
    delete_detection,
    detect_waste,
    detection_detail,
    detection_history,
    test_prediction,
)

urlpatterns = [
    path("test/", test_prediction, name="test-prediction"),
    path("detect/", detect_waste, name="detect-waste"),
    path("history/", detection_history, name="detection-history"),
    path("history/<int:pk>/", detection_detail, name="detection-detail"),
    path("history/<int:pk>/delete/", delete_detection, name="delete-detection"),
]