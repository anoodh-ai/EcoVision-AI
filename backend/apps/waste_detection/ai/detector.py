from pathlib import Path

from ultralytics import YOLO

# Get the folder where this file (detector.py) is located
BASE_DIR = Path(__file__).resolve().parent

# Build the full path to the model file
MODEL_PATH = BASE_DIR / "models" / "waste_yolo.pt"

# Load the YOLO model
model = YOLO(str(MODEL_PATH))

# 👇 ഈ line മാത്രം add ചെയ്യൂ
print("Model Classes:", model.names)


def get_model():
    """
    Return the loaded YOLO model.
    """
    return model