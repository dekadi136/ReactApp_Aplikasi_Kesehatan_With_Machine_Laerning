const API_BASE_URL = "https://dekadi136-paruparu-fastapi.hf.space/predict/paru";

export const predictParu = async (payload) => {
  const { image, name, age, origin, job } = payload;

  if (!image) {
    throw new Error("File X-Ray wajib diunggah");
  }

  const formData = new FormData();
  formData.append("file", image);

  // ⚠️ Backend kamu saat ini hanya butuh file
  // Data formalitas kita simpan di frontend saja
  const response = await fetch(`${API_BASE_URL}`, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error("Gagal memproses gambar X-Ray");
  }

  const result = await response.json();

  return {
    user: {
      name,
      age,
      origin,
      job,
    },
    prediction: result.prediction,
    confidence: result.confidence,
    probabilities: result.all_probabilities,
  };
};
