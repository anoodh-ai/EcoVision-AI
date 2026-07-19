from django.db import models


class WasteDetection(models.Model):
    object_name = models.CharField(max_length=100)

    waste_category = models.CharField(max_length=100)

    confidence = models.FloatField()

    recyclable = models.BooleanField()

    bin = models.CharField(max_length=100)

    recycling_instructions = models.TextField()

    reuse_ideas = models.TextField()

    environmental_impact = models.TextField()

    image = models.ImageField(upload_to="detections/")

    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-created_at"]

    def __str__(self):
        return self.object_name