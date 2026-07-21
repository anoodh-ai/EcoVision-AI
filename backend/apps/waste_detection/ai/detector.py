from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent
MODEL_PATH = BASE_DIR / "models" / "waste_yolo.pt"

# Debug prints
print("=" * 50)
print("MODEL PATH :", MODEL_PATH)
print("MODEL EXISTS :", MODEL_PATH.exists())
print("=" * 50)

_model = None


def get_model():
    global _model

    if _model is None:
        print("Loading YOLO model...")
        from ultralytics import YOLO
        _model = YOLO(str(MODEL_PATH))
        print("Model loaded successfully")
        print("Model Classes:", _model.names)

    return _model

