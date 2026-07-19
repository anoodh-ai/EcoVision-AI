from django.contrib import admin

from .models import WasteDetection


@admin.register(WasteDetection)
class WasteDetectionAdmin(admin.ModelAdmin):
    list_display = (
        "object_name",
        "waste_category",
        "confidence",
        "recyclable",
        "created_at",
    )

    list_filter = (
        "waste_category",
        "recyclable",
    )

    search_fields = (
        "object_name",
        "waste_category",
    )

    ordering = ("-created_at",)