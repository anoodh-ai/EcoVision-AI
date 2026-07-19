from pathlib import Path

from django.core.files import File
from django.shortcuts import get_object_or_404

from apps.common.exceptions import WasteDetectionError

from .ai.predictor import predict_image
from .models import WasteDetection


class WasteDetectionService:
    @staticmethod
    def detect(image_source):
        temporary_file = None

        if hasattr(image_source, "chunks"):
            media_folder = Path("media")
            media_folder.mkdir(exist_ok=True)

            temporary_file = media_folder / image_source.name

            with open(temporary_file, "wb+") as destination:
                for chunk in image_source.chunks():
                    destination.write(chunk)

            prediction = predict_image(temporary_file)
            print("Prediction =", prediction)

            if isinstance(prediction, dict) and prediction.get("status") == "error":
                temporary_file.unlink(missing_ok=True)
                raise WasteDetectionError(prediction["message"])

            if not prediction:
                temporary_file.unlink(missing_ok=True)
                raise WasteDetectionError("No waste detected.")

            with open(temporary_file, "rb") as image_file:
                detection = WasteDetection.objects.create(
                    object_name=prediction["object_name"],
                    waste_category=prediction["waste_category"],
                    confidence=prediction["confidence"],
                    recyclable=prediction["recyclable"],
                    bin=prediction["bin"],
                    recycling_instructions=prediction["recycling_instructions"],
                    reuse_ideas=prediction["reuse_ideas"],
                    environmental_impact=prediction["environmental_impact"],
                )

                detection.image.save(
                    image_source.name,
                    File(image_file),
                    save=True,
                )

            temporary_file.unlink(missing_ok=True)
            return prediction

        prediction = predict_image(image_source)

        if isinstance(prediction, dict) and prediction.get("status") == "error":
            raise WasteDetectionError(prediction["message"])

        if not prediction:
            raise WasteDetectionError("No waste detected.")

        return prediction

    @staticmethod
    def get_all_detections():
        return WasteDetection.objects.all()

    @staticmethod
    def get_detection(pk):
        return get_object_or_404(WasteDetection, pk=pk)

    @staticmethod
    def delete_detection(pk):
        detection = get_object_or_404(WasteDetection, pk=pk)

        if detection.image:
            detection.image.delete(save=False)

        detection.delete()


