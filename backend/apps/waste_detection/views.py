from rest_framework.decorators import api_view

from apps.common.exceptions import WasteDetectionError
from apps.common.views import error_response, success_response

from .serializers import (
    WasteDetectionSerializer,
    WasteImageSerializer,
)
from .services import WasteDetectionService


@api_view(["GET"])
def test_prediction(request):
    try:
        prediction = WasteDetectionService.detect("test_images/test.jpg")
        return success_response(prediction, "AI prediction completed successfully.")
    except WasteDetectionError as error:
        return error_response({"prediction": [str(error)]}, "Prediction failed.")


@api_view(["POST"])
def detect_waste(request):
    serializer = WasteImageSerializer(data=request.data)

    if not serializer.is_valid():
        print(serializer.errors)
        return error_response(serializer.errors, "Validation failed.")

    try:
        prediction = WasteDetectionService.detect(serializer.validated_data["image"])
        return success_response(prediction, "Waste detected successfully.")
    except WasteDetectionError as error:
        return error_response({"prediction": [str(error)]}, "Prediction failed.")


@api_view(["GET"])
def detection_history(request):
    detections = WasteDetectionService.get_all_detections()
    serializer = WasteDetectionSerializer(detections, many=True)
    return success_response(serializer.data, "Detection history fetched successfully.")


@api_view(["GET"])
def detection_detail(request, pk):
    detection = WasteDetectionService.get_detection(pk)
    serializer = WasteDetectionSerializer(detection)
    return success_response(serializer.data, "Detection fetched successfully.")


@api_view(["DELETE"])
def delete_detection(request, pk):
    WasteDetectionService.delete_detection(pk)

    return success_response(
        data={},
        message="Detection deleted successfully."
    )