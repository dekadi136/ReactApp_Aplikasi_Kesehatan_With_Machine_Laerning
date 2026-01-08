/**
 * Service untuk melakukan fetch ke API BMI
 * @param {number} height - Tinggi badan dalam meter (contoh: 1.70)
 * @param {number} weight - Berat badan dalam kg (contoh: 75)
 * @param {number} age - Umur dalam tahun (contoh: 23)
 * @returns {Promise} - Response dari API berisi {bmi, bmi_class}
 */
export const fetchBMI = async (height, weight, age) => {
  try {
    const response = await fetch(
      "https://dekadi136-bmi-fastapi.hf.space/predict/bmi",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          height: parseFloat(height),
          weight: parseFloat(weight),
          age: parseInt(age),
        }),
      }
    );

    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }

    const data = await response.json();
    return {
      success: true,
      bmi: data.bmi,
      bmi_class: data.bmi_class,
    };
  } catch (error) {
    return {
      success: false,
      error: error.message,
    };
  }
};
