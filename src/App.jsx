import React, { useState, useEffect } from "react";
import { Activity } from "lucide-react";

import Navbar from "./components/Navbar.jsx";
import Hero from "./components/Hero.jsx";
import Features from "./components/Features.jsx";
import ServicesGrid from "./components/ServicesGrid.jsx";
import ModalCheck from "./components/ModalCheck.jsx";
import ChatBot from "./components/ChatBot.jsx";

import { predictParu } from "./services/paruService";

/* ================= QUESTIONS ================= */
const QUESTIONS = {
  Jantung: [
    "Apakah Anda sering merasa nyeri dada saat sedang beraktivitas?",
    "Apakah detak jantung Anda sering terasa tidak teratur atau berdebar?",
    "Apakah Anda memiliki riwayat tekanan darah tinggi (hipertensi)?",
    "Apakah Anda mudah merasa lelah atau sesak saat aktivitas ringan?",
  ],
  "Paru-paru": [
    "Apakah Anda mengalami batuk yang tidak kunjung sembuh dalam 2 minggu?",
    "Apakah Anda sering merasa sesak napas saat menaiki tangga?",
    "Apakah Anda sering terpapar polusi udara atau asap rokok?",
    "Apakah pernapasan Anda sering terdengar berbunyi (mengi)?",
  ],
  Diabetes: [
    "Apakah Anda sering merasa sangat haus meski sudah cukup minum?",
    "Apakah Anda sering buang air kecil lebih dari biasanya di malam hari?",
    "Apakah luka pada kulit Anda membutuhkan waktu yang sangat lama untuk sembuh?",
    "Apakah Anda sering merasa lemas atau lapar secara berlebihan?",
  ],
};

/* ================= MOCK BMI ================= */
const fetchBMI = async (height, weight, age) => {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const h = parseFloat(height);
  const w = parseFloat(weight);
  const bmi = (w / (h * h)).toFixed(1);

  let bmiClass = "";
  if (bmi < 18.5) bmiClass = "Kurus";
  else if (bmi < 25) bmiClass = "Normal";
  else if (bmi < 30) bmiClass = "Gemuk";
  else bmiClass = "Obesitas";

  return { success: true, bmi, bmi_class: bmiClass };
};

/* ================= APP ================= */
export default function App() {
  /* ===== GENERAL ===== */
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [step, setStep] = useState(0);
  // const [showResult, setShowResult] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  /* ===== BMI ===== */
  const [bmiData, setBmiData] = useState({
    height: "",
    weight: "",
    age: "",
  });
  const [bmiResult, setBmiResult] = useState(null);
  const [bmiLoading, setBmiLoading] = useState(false);
  const [bmiError, setBmiError] = useState(null);

  /* ===== PARU-PARU ===== */
  const [paruData, setParuData] = useState({
    name: "",
    age: "",
    origin: "",
    job: "",
    image: null,
  });
  const [paruResult, setParuResult] = useState(null);
  const [paruLoading, setParuLoading] = useState(false);
  const [paruError, setParuError] = useState(null);

  /* ===== EFFECT ===== */
  useEffect(() => {
    setIsVisible(true);
  }, []);

  /* ===== START TEST ===== */
  const startTest = (category) => {
    setSelectedCategory(category);
    setStep(0);

    setBmiResult(null);
    setBmiError(null);

    setParuResult(null);
    setParuError(null);
  };

  /* ===== NEXT STEP ===== */
  const nextStep = () => {
    if (step < QUESTIONS[selectedCategory].length - 1) {
      setStep((prev) => prev + 1);
    }
  };

  /* ===== BMI HANDLER ===== */
  const handleBMIInputChange = (e) => {
    const { name, value } = e.target;
    setBmiData((prev) => ({ ...prev, [name]: value }));
  };

  const handleBMISubmit = async () => {
    if (!bmiData.height || !bmiData.weight || !bmiData.age) {
      setBmiError("Semua field harus diisi");
      return;
    }

    setBmiLoading(true);
    setBmiError(null);

    try {
      const result = await fetchBMI(
        bmiData.height,
        bmiData.weight,
        bmiData.age
      );
      setBmiResult(result);
    } catch {
      setBmiError("Terjadi kesalahan");
    } finally {
      setBmiLoading(false);
    }
  };

  /* ===== PARU HANDLER ===== */
  const handleParuChange = (e) => {
    const { name, value, files } = e.target;

    setParuData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleParuSubmit = async () => {
    const { name, age, origin, job, image } = paruData;

    if (!name || !age || !origin || !job || !image) {
      setParuError("Semua field wajib diisi");
      return;
    }

    setParuLoading(true);
    setParuError(null);

    try {
      const result = await predictParu(paruData);
      setParuResult(result);
    } catch (err) {
      setParuError(err.message || "Gagal menganalisis");
    } finally {
      setParuLoading(false);
    }
  };

  /* ===== RENDER ===== */
  return (
    <div className="min-h-screen bg-white">
      <Navbar
        onStartClick={() =>
          document
            .getElementById("layanan")
            ?.scrollIntoView({ behavior: "smooth" })
        }
      />

      <Hero isVisible={isVisible} />

      <Features />

      <ServicesGrid onStartTest={startTest} />

      <ModalCheck
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        step={step}
        nextStep={nextStep}
        /* BMI */
        bmiData={bmiData}
        handleBMIInputChange={handleBMIInputChange}
        handleBMISubmit={handleBMISubmit}
        bmiResult={bmiResult}
        bmiLoading={bmiLoading}
        bmiError={bmiError}
        /* PARU */
        paruData={paruData}
        handleParuChange={handleParuChange}
        handleParuSubmit={handleParuSubmit}
        paruResult={paruResult}
        paruLoading={paruLoading}
        paruError={paruError}
      />

      <ChatBot />

      <footer className="py-16 text-center border-t">
        <div className="w-11 h-11 bg-blue-600 rounded-xl flex items-center justify-center mx-auto mb-4">
          <Activity className="text-white" />
        </div>
        <p className="font-bold">VitalCheck</p>
        <p className="text-xs text-slate-500">© 2024 VitalCheck Digital</p>
      </footer>
    </div>
  );
}
