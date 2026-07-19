from pathlib import Path

from .detector import get_model
from .waste_mapper import map_prediction


def predict_image(image_path):
    image_path = Path(image_path)

    print("IMAGE PATH:", image_path)
    print("IMAGE EXISTS:", image_path.exists())

    model = get_model()

    results = model.predict(
        source=str(image_path),
        verbose=False
    )

    print(results)

    result = results[0]

    print(result.boxes)

    if len(result.boxes) == 0:
        return {
            "status": "error",
            "message": "No waste detected."
        }

    best_box = max(result.boxes, key=lambda box: float(box.conf[0]))

    class_id = int(best_box.cls[0])
    confidence = float(best_box.conf[0])

    class_name = result.names[class_id]

    print("CLASS :", class_name)
    print("CONF :", confidence)

    return map_prediction(
        class_name=class_name,
        confidence=confidence
    )