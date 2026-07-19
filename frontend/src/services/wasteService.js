import api from "../api/api";

export const detectWaste = async (image) => {
  const formData = new FormData();

  formData.append("image", image);

  const response = await api.post("/detect/", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};

export const getHistory = async () => {
  const response = await api.get("/history/");
  return response.data;
};

export const getDetection = async (id) => {
  const response = await api.get(`/history/${id}/`);
  return response.data;
};

export const deleteDetection = async (id) => {
  const response = await api.delete(`/history/${id}/delete/`);
  return response.data;
};