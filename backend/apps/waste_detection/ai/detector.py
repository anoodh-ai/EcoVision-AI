from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent
MODEL_PATH = BASE_DIR / "models" / "waste_yolo.pt"

_model = None


def get_model():
    global _model

    if _model is None:
        from ultralytics import YOLO
        _model = YOLO(str(MODEL_PATH))
        print("Model Classes:", _model.names)

    return _model