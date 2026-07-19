import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

import { detectWaste } from "../../services/wasteService";
import DetectionModal from "./DetectionModal";

export default function ImageUpload() {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [message, setMessage] = useState("");

  const [isDragging, setIsDragging] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [detectionMethod, setDetectionMethod] = useState("upload");

  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const streamRef = useRef(null);

  const [cameraActive, setCameraActive] = useState(false);

  const clearImage = () => {
    if (preview) {
      URL.revokeObjectURL(preview);
    }

    setImage(null);
    setPreview(null);
    setResult(null);
    setMessage("");
    setShowModal(false);

    if (detectionMethod === "camera") {
      startCamera();
    }
  };
  const handleUpload = async () => {
    if (!image) {
      setMessage("Please select an image.");
      return;
    }

      try {
        setLoading(true);
        setMessage("");

        console.log("Image object:", image);
        console.log("Image name:", image?.name);
        console.log("Image type:", image?.type);
        console.log("Image size:", image?.size);

        const response = await detectWaste(image);

        console.log(response);

        setResult(response.data);
        setMessage(response.message);
        setShowModal(true);

      } catch (error) {
        console.error("Axios Error:", error);

        console.log("Status:", error.response?.status);
        console.log("Full Response:", error.response?.data);
        console.log("Errors:", error.response?.data?.errors);

        setResult(null);

        setMessage(
          error.response?.data?.message || "Detection failed."
        );
      } finally {
        setLoading(false);
      }
    };


  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: "environment",
        },
      });

      streamRef.current = stream;

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }

      setCameraActive(true);
      setMessage("");
    } catch (error) {
      console.error(error);

      setMessage(
        "Unable to access the camera. Please allow camera permission."
      );

      setCameraActive(false);
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }

    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }

    setCameraActive(false);
  };

  const capturePhoto = () => {
    if (!videoRef.current || !canvasRef.current) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const context = canvas.getContext("2d");

    if (!context) return;

    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    canvas.toBlob(
      (blob) => {
        if (!blob) return;

        if (preview) {
          URL.revokeObjectURL(preview);
        }

        const file = new File([blob], "camera-capture.jpg", {
          type: "image/jpeg",
        });

        console.log(file);
        console.log(file.size);
        console.log(file.type);

        setImage(file);
        setPreview(URL.createObjectURL(file));

        stopCamera();
      },
      "image/jpeg",
      0.95
    );
  };

  const retakePhoto = () => {
    if (preview) {
      URL.revokeObjectURL(preview);
    }

    setImage(null);
    setPreview(null);
    setResult(null);
    setMessage("");

    startCamera();
  };

  useEffect(() => {
    return () => {
      if (preview) {
        URL.revokeObjectURL(preview);
      }

      stopCamera();
    };
  }, [preview]);

  useEffect(() => {
    if (detectionMethod === "camera") {
      startCamera();
    } else {
      stopCamera();

      if (preview) {
        URL.revokeObjectURL(preview);
      }

      setPreview(null);
      setImage(null);
    }

    return () => {
      stopCamera();
    };
  }, [detectionMethod]);

  return (
    <div className="mt-10">
      <div className="mb-8 grid gap-4 md:grid-cols-2">
        <button
          type="button"
          onClick={() => setDetectionMethod("upload")}
          className={`rounded-2xl border p-6 text-left transition ${
            detectionMethod === "upload"
              ? "border-emerald-500 bg-emerald-50"
              : "border-slate-200 bg-white hover:border-emerald-300"
          }`}
        >
          <div className="text-3xl">📁</div>

          <h3 className="mt-3 font-semibold">
            Upload Image
          </h3>

          <p className="mt-2 text-sm text-slate-600">
            Detect waste using an existing image.
          </p>
        </button>

        <button
          type="button"
          onClick={() => setDetectionMethod("camera")}
          className={`rounded-2xl border p-6 text-left transition ${
            detectionMethod === "camera"
              ? "border-blue-500 bg-blue-50"
              : "border-slate-200 bg-white hover:border-blue-300"
          }`}
        >
          <div className="text-3xl">📷</div>

          <h3 className="mt-3 font-semibold">
            Live Camera
          </h3>

          <p className="mt-2 text-sm text-slate-600">
            Detect waste using your webcam.
          </p>
        </button>
      </div>

      {detectionMethod === "upload" && (
        <label
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={() => {
            setIsDragging(false);
          }}
          onDrop={(e) => {
            e.preventDefault();
            setIsDragging(false);

            const file = e.dataTransfer.files[0];

            if (!file) return;

            setImage(file);
            setPreview(URL.createObjectURL(file));
          }}
          style={{
            pointerEvents: loading ? "none" : "auto",
          }}
          className={`
            flex min-h-[420px] cursor-pointer flex-col items-center justify-center
            rounded-[32px] border-2 border-dashed p-8 shadow-lg transition-all duration-300
            ${
              isDragging
                ? "border-emerald-600 bg-emerald-100"
                : "border-emerald-400 bg-emerald-50 hover:bg-emerald-100"
            }
            ${loading ? "opacity-60" : ""}
          `}
        >
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files[0];

              if (!file) return;

              setImage(file);
              setPreview(URL.createObjectURL(file));
            }}
          />
          {preview ? (
            <div className="relative w-full">
              <img
                src={preview}
                alt="Preview"
                className="mx-auto h-80 w-full rounded-2xl object-cover shadow-xl"
              />

              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();

                  if (detectionMethod === "camera") {
                    retakePhoto();
                  } else {
                    clearImage();
                  }
                }}
                className="absolute right-4 top-4 rounded-full bg-red-500 px-4 py-2 text-sm font-semibold text-white shadow-lg transition hover:bg-red-600"
              >
                {detectionMethod === "camera"
                  ? "📷 Retake"
                  : "✕ Remove"}
              </button>

              <div className="absolute bottom-4 left-4 rounded-xl bg-black/60 px-4 py-2 text-sm text-white backdrop-blur">
                {image?.name}
              </div>
            </div>
          ) : (
            <>
              <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-emerald-100 text-5xl">
                📷
              </div>

              <h3 className="text-center text-2xl font-bold text-slate-800">
                Drag & Drop your waste image
              </h3>

              <p className="mt-3 text-center text-slate-500">
                or click to browse from your computer
              </p>

              <p className="mt-5 rounded-full bg-slate-100 px-5 py-2 text-sm text-slate-500">
                JPG • JPEG • PNG
              </p>
            </>
          )}
        </label>
      )}
      {detectionMethod === "camera" && (
        <div className="flex min-h-[420px] items-center justify-center rounded-[32px] border-2 border-dashed border-slate-300 bg-slate-50">
          <div className="w-full p-6">
            {preview ? (
              <div className="relative">
                <img
                  src={preview}
                  alt="Captured"
                  className="h-[420px] w-full rounded-3xl object-cover"
                />

                <button
                  type="button"
                  onClick={retakePhoto}
                  className="absolute right-4 top-4 rounded-xl bg-emerald-500 px-4 py-2 text-white transition hover:bg-emerald-600"
                >
                  📷 Retake
                </button>
              </div>
            ) : (
              <>
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  muted
                  className="h-[420px] w-full rounded-3xl object-cover"
                />

                <canvas ref={canvasRef} className="hidden" />

                <div className="mt-4 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div
                      className={`h-3 w-3 rounded-full ${
                        cameraActive
                          ? "animate-pulse bg-green-500"
                          : "bg-red-500"
                      }`}
                    />

                    <span
                      className={`text-sm font-medium ${
                        cameraActive
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {cameraActive
                        ? "Camera Active"
                        : "Camera Inactive"}
                    </span>
                  </div>

                  {cameraActive ? (
                    <button
                      type="button"
                      onClick={stopCamera}
                      className="rounded-xl bg-red-500 px-4 py-2 text-white transition hover:bg-red-600"
                    >
                      Close Camera
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={startCamera}
                      className="rounded-xl bg-emerald-500 px-4 py-2 text-white transition hover:bg-emerald-600"
                    >
                      Start Camera
                    </button>
                  )}
                </div>

                <div className="mt-5 text-center">
                  <h2 className="text-2xl font-bold">
                    Live Camera Detection
                  </h2>

                  <p className="mt-2 text-slate-500">
                    Camera preview is now active.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={capturePhoto}
                  disabled={!cameraActive}
                  className="mt-6 w-full rounded-2xl bg-gradient-to-r from-blue-500 to-cyan-600 px-6 py-4 text-lg font-bold text-white shadow-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl disabled:cursor-not-allowed disabled:opacity-60"
                >
                  📸 Capture Photo
                </button>
              </>
            )}
          </div>
        </div>
      )}
      {detectionMethod === "upload" && (
        <button
          onClick={handleUpload}
          disabled={loading || !image}
          className="
            mt-8 w-full rounded-2xl bg-gradient-to-r
            from-emerald-500 to-green-600
            px-6 py-4 text-lg font-bold text-white
            shadow-xl transition-all duration-300
            hover:-translate-y-1 hover:shadow-2xl
            disabled:cursor-not-allowed disabled:opacity-60
          "
        >
          {loading ? (
            <div className="flex items-center justify-center gap-3">
              <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
              <span>Detecting Waste...</span>
            </div>
          ) : (
            "Detect Waste"
          )}
        </button>
      )}

      {detectionMethod === "camera" && preview && (
        <button
          onClick={handleUpload}
          disabled={loading || !image}
          className="
            mt-8 w-full rounded-2xl bg-gradient-to-r
            from-blue-500 to-cyan-600
            px-6 py-4 text-lg font-bold text-white
            shadow-xl transition-all duration-300
            hover:-translate-y-1 hover:shadow-2xl
            disabled:cursor-not-allowed disabled:opacity-60
          "
        >
          {loading ? (
            <div className="flex items-center justify-center gap-3">
              <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
              <span>Detecting Waste...</span>
            </div>
          ) : (
            "Detect Captured Image"
          )}
        </button>
      )}

      {message && (
        <p className="mt-6 text-center font-medium text-emerald-600">
          {message}
        </p>
      )}

      {showModal &&
        createPortal(
          <div
            className="
              fixed inset-0 z-[99999]
              flex items-center justify-center
              bg-black/60 backdrop-blur-md p-6
            "
          >
            <DetectionModal
              open={showModal}
              onClose={() => setShowModal(false)}
              result={result}
              preview={preview}
            />
          </div>,
          document.body
        )}
    </div>
  );
}


