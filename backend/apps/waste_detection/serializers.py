from rest_framework import serializers

from .models import WasteDetection


class WasteImageSerializer(serializers.Serializer):
    image = serializers.ImageField(required=True)

    def validate_image(self, image):
        allowed_extensions = (".jpg", ".jpeg", ".png")

        if not image.name.lower().endswith(allowed_extensions):
            raise serializers.ValidationError(
                "Only JPG, JPEG and PNG images are allowed."
            )

        return image


class WasteDetectionSerializer(serializers.ModelSerializer):
    class Meta:
        model = WasteDetection
        fields = [
            "id",
            "object_name",
            "waste_category",
            "confidence",
            "recyclable",
            "bin",
            "recycling_instructions",
            "reuse_ideas",
            "environmental_impact",
            "image",
            "created_at",
        ]