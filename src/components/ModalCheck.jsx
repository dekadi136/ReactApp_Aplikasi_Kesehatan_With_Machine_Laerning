import React from "react";
import {
  X,
  CheckCircle2,
  ShieldCheck,
  Stethoscope,
  ChevronRight,
  Upload,
  User,
  Calendar,
  MapPin,
  Briefcase,
  Ruler,
  Weight,
  Activity,
  AlertCircle,
  Image as ImageIcon,
  FileImage,
} from "lucide-react";
import { QUESTIONS } from "../data/questions";

export default function ModalCheck({
  selectedCategory,
  setSelectedCategory,
  step,
  nextStep,

  // BMI
  bmiData,
  handleBMIInputChange,
  handleBMISubmit,
  bmiResult,
  bmiLoading,
  bmiError,

  // PARU-PARU
  paruData,
  handleParuChange,
  handleParuSubmit,
  paruResult,
  paruLoading,
  paruError,
}) {
  if (!selectedCategory) return null;

  const isComingSoon = selectedCategory === "Diabetes";
  const [selectedFile, setSelectedFile] = React.useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile({
        name: file.name,
        size: file.size,
        type: file.type,
        preview: URL.createObjectURL(file),
      });
    }
    handleParuChange(e);
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + " " + sizes[i];
  };

  const getFileExtension = (filename) => {
    return filename
      .slice(((filename.lastIndexOf(".") - 1) >>> 0) + 2)
      .toUpperCase();
  };

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl max-h-[90vh] overflow-hidden flex flex-col animate-in zoom-in-95 duration-300">
        {/* ================= HEADER ================= */}
        <div className="relative bg-gradient-to-br from-blue-50 via-white to-blue-50/50 p-6 border-b border-slate-100">
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-blue-500/30">
                <Stethoscope size={28} strokeWidth={2.5} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900 mb-1">
                  {selectedCategory === "BMI"
                    ? "Kalkulator BMI"
                    : selectedCategory === "Paru-paru"
                    ? "Analisis X-Ray Paru-paru"
                    : `Evaluasi ${selectedCategory}`}
                </h3>
                <p className="text-sm text-slate-600 font-medium">
                  {selectedCategory === "BMI"
                    ? "Hitung Indeks Massa Tubuh Anda"
                    : selectedCategory === "Paru-paru"
                    ? "Deteksi kondisi paru-paru dengan AI"
                    : `Pertanyaan ${step + 1} dari ${
                        QUESTIONS[selectedCategory].length
                      }`}
                </p>
              </div>
            </div>

            <button
              onClick={() => setSelectedCategory(null)}
              className="w-10 h-10 rounded-xl hover:bg-white/80 flex items-center justify-center text-slate-400 hover:text-slate-700 transition-all"
            >
              <X size={22} />
            </button>
          </div>
        </div>

        {/* ================= PROGRESS (KHUSUS QUIZ) ================= */}
        {selectedCategory !== "BMI" &&
          selectedCategory !== "Paru-paru" &&
          !isComingSoon && (
            <div className="h-2 bg-slate-100">
              <div
                className="h-full bg-gradient-to-r from-blue-500 to-blue-600 transition-all duration-700 ease-out"
                style={{
                  width: `${
                    ((step + 1) / QUESTIONS[selectedCategory].length) * 100
                  }%`,
                }}
              />
            </div>
          )}

        {/* ================= CONTENT ================= */}
        <div className="flex-1 overflow-y-auto p-8">
          {/* ===== COMING SOON ===== */}
          {isComingSoon ? (
            <div className="text-center py-16">
              <div className="w-20 h-20 bg-blue-50 rounded-3xl flex items-center justify-center mx-auto mb-6">
                <ShieldCheck size={48} className="text-blue-600" />
              </div>
              <h3 className="text-3xl font-bold text-slate-900 mb-3">
                Segera Hadir
              </h3>
              <p className="text-slate-600 text-lg mb-10 max-w-md mx-auto">
                Fitur evaluasi diabetes sedang dalam tahap pengembangan dan akan
                segera tersedia untuk Anda.
              </p>
              <button
                onClick={() => setSelectedCategory(null)}
                className="px-8 py-3.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-blue-500/30 transition-all"
              >
                Kembali ke Beranda
              </button>
            </div>
          ) : /* ================= PARU-PARU ================= */
          selectedCategory === "Paru-paru" ? (
            !paruResult ? (
              <div className="space-y-5">
                <div className="mb-8">
                  <h4 className="text-2xl font-bold text-slate-900 mb-2">
                    Upload X-Ray Paru-paru
                  </h4>
                  <p className="text-slate-600">
                    Silakan lengkapi data dan unggah foto rontgen Anda
                  </p>
                </div>

                {paruError && (
                  <div className="bg-red-50 border-l-4 border-red-500 text-red-700 px-4 py-4 rounded-xl flex items-start gap-3">
                    <AlertCircle size={20} className="flex-shrink-0 mt-0.5" />
                    <span className="text-sm font-medium">{paruError}</span>
                  </div>
                )}

                <div className="relative">
                  <User
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                    size={20}
                  />
                  <input
                    type="text"
                    name="name"
                    placeholder="Nama Lengkap"
                    onChange={handleParuChange}
                    className="w-full pl-12 pr-4 py-4 border-2 border-slate-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-50 outline-none transition-all"
                  />
                </div>

                <div className="relative">
                  <Calendar
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                    size={20}
                  />
                  <input
                    type="number"
                    name="age"
                    placeholder="Umur"
                    onChange={handleParuChange}
                    className="w-full pl-12 pr-4 py-4 border-2 border-slate-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-50 outline-none transition-all"
                  />
                </div>

                <div className="relative">
                  <MapPin
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                    size={20}
                  />
                  <input
                    type="text"
                    name="origin"
                    placeholder="Asal Daerah"
                    onChange={handleParuChange}
                    className="w-full pl-12 pr-4 py-4 border-2 border-slate-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-50 outline-none transition-all"
                  />
                </div>

                <div className="relative">
                  <Briefcase
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                    size={20}
                  />
                  <input
                    type="text"
                    name="job"
                    placeholder="Pekerjaan"
                    onChange={handleParuChange}
                    className="w-full pl-12 pr-4 py-4 border-2 border-slate-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-50 outline-none transition-all"
                  />
                </div>

                <div className="relative border-2 border-dashed border-slate-300 rounded-xl p-8 text-center hover:border-blue-400 transition-all bg-slate-50/50">
                  {!selectedFile ? (
                    <>
                      <Upload
                        className="mx-auto mb-3 text-slate-400"
                        size={40}
                      />
                      <p className="text-slate-700 font-medium mb-1">
                        Unggah Foto X-Ray
                      </p>
                      <p className="text-sm text-slate-500 mb-4">
                        Format: JPG, PNG (Max 5MB)
                      </p>
                      <input
                        type="file"
                        accept="image/*"
                        name="image"
                        onChange={handleFileChange}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      />
                      <button className="px-6 py-2 bg-blue-50 text-blue-600 rounded-lg font-medium hover:bg-blue-100 transition-all">
                        Pilih File
                      </button>
                    </>
                  ) : (
                    <div className="space-y-4">
                      <div className="flex items-start gap-4 bg-white p-4 rounded-lg border border-slate-200">
                        <div className="w-16 h-16 rounded-lg overflow-hidden bg-slate-100 flex-shrink-0">
                          <img
                            src={selectedFile.preview}
                            alt="Preview"
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1 text-left">
                          <p className="font-semibold text-slate-900 text-sm mb-1 truncate">
                            {selectedFile.name}
                          </p>
                          <div className="flex items-center gap-3 text-xs text-slate-500">
                            <span className="px-2 py-1 bg-blue-50 text-blue-600 rounded font-medium">
                              {getFileExtension(selectedFile.name)}
                            </span>
                            <span>{formatFileSize(selectedFile.size)}</span>
                          </div>
                        </div>
                        <button
                          onClick={() => setSelectedFile(null)}
                          className="text-slate-400 hover:text-red-500 transition-colors"
                        >
                          <X size={18} />
                        </button>
                      </div>
                      <input
                        type="file"
                        accept="image/*"
                        name="image"
                        onChange={handleFileChange}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      />
                      <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                        Ganti File
                      </button>
                    </div>
                  )}
                </div>

                <button
                  onClick={handleParuSubmit}
                  disabled={paruLoading}
                  className="w-full py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-blue-500/30 disabled:opacity-50 disabled:cursor-not-allowed transition-all mt-6"
                >
                  {paruLoading ? (
                    <span className="flex items-center justify-center gap-2">
                      <Activity className="animate-spin" size={20} />
                      Menganalisis X-Ray...
                    </span>
                  ) : (
                    "Mulai Analisis"
                  )}
                </button>
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle2 size={48} className="text-green-600" />
                </div>
                <h3 className="text-3xl font-bold text-slate-900 mb-6">
                  Analisis Selesai
                </h3>

                <div className="bg-gradient-to-br from-slate-50 to-blue-50/30 border-2 border-slate-100 rounded-2xl p-8 text-left mb-8 shadow-sm">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Activity className="text-blue-600" size={20} />
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-slate-900 text-lg mb-2">
                        Hasil Prediksi
                      </p>
                      <p className="text-slate-700 text-lg font-medium">
                        {paruResult.prediction}
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-200">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-slate-600 font-medium">
                        Tingkat Keyakinan
                      </span>
                      <span className="text-lg font-bold text-blue-600">
                        {(paruResult.confidence * 100).toFixed(1)}%
                      </span>
                    </div>
                    <div className="mt-2 h-2 bg-slate-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full transition-all duration-1000"
                        style={{ width: `${paruResult.confidence * 100}%` }}
                      />
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => setSelectedCategory(null)}
                  className="w-full py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-blue-500/30 transition-all"
                >
                  Selesai
                </button>
              </div>
            )
          ) : /* ================= BMI ================= */
          selectedCategory === "BMI" ? (
            !bmiResult ? (
              <div className="space-y-6">
                <div className="mb-8">
                  <h4 className="text-2xl font-bold text-slate-900 mb-2">
                    Hitung BMI Anda
                  </h4>
                  <p className="text-slate-600">
                    Masukkan data tubuh Anda untuk menghitung BMI
                  </p>
                </div>

                {bmiError && (
                  <div className="bg-red-50 border-l-4 border-red-500 text-red-700 px-4 py-4 rounded-xl flex items-start gap-3">
                    <AlertCircle size={20} className="flex-shrink-0 mt-0.5" />
                    <span className="text-sm font-medium">{bmiError}</span>
                  </div>
                )}

                <div className="relative">
                  <Ruler
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                    size={20}
                  />
                  <input
                    type="number"
                    name="height"
                    value={bmiData.height}
                    onChange={handleBMIInputChange}
                    placeholder="Tinggi Badan (meter)"
                    step="0.01"
                    className="w-full pl-12 pr-4 py-4 border-2 border-slate-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-50 outline-none transition-all"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm font-medium"></span>
                </div>

                <div className="relative">
                  <Weight
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                    size={20}
                  />
                  <input
                    type="number"
                    name="weight"
                    value={bmiData.weight}
                    onChange={handleBMIInputChange}
                    placeholder="Berat Badan (kilogram)"
                    step="0.1"
                    className="w-full pl-12 pr-4 py-4 border-2 border-slate-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-50 outline-none transition-all"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm font-medium"></span>
                </div>

                <div className="relative">
                  <Calendar
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                    size={20}
                  />
                  <input
                    type="number"
                    name="age"
                    value={bmiData.age}
                    onChange={handleBMIInputChange}
                    placeholder="Umur"
                    className="w-full pl-12 pr-4 py-4 border-2 border-slate-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-50 outline-none transition-all"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm font-medium"></span>
                </div>

                <button
                  onClick={handleBMISubmit}
                  disabled={bmiLoading}
                  className="w-full py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-blue-500/30 disabled:opacity-50 disabled:cursor-not-allowed transition-all mt-6"
                >
                  {bmiLoading ? (
                    <span className="flex items-center justify-center gap-2">
                      <Activity className="animate-spin" size={20} />
                      Menghitung...
                    </span>
                  ) : (
                    "Hitung BMI Saya"
                  )}
                </button>
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle2 size={48} className="text-green-600" />
                </div>
                <h3 className="text-3xl font-bold text-slate-900 mb-8">
                  Hasil Perhitungan BMI
                </h3>

                <div className="bg-gradient-to-br from-blue-50 to-blue-100/50 border-2 border-blue-200 rounded-2xl p-8 mb-8">
                  <div className="text-6xl font-bold text-blue-600 mb-3">
                    {bmiResult.bmi}
                  </div>
                  <div className="text-xl font-semibold text-slate-700 mb-6">
                    {bmiResult.bmi_class}
                  </div>

                  <div className="bg-white rounded-xl p-6 shadow-sm">
                    <div className="text-sm text-slate-600 mb-4 text-left">
                      <p className="font-semibold mb-2">Interpretasi:</p>
                      <ul className="space-y-1 text-slate-600">
                        <li>• Underweight: BMI &lt; 18.5</li>
                        <li>• Normal: BMI 18.5 - 24.9</li>
                        <li>• Overweight: BMI 25 - 29.9</li>
                        <li>• Obesitas: BMI ≥ 30</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => setSelectedCategory(null)}
                  className="w-full py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-blue-500/30 transition-all"
                >
                  Selesai
                </button>
              </div>
            )
          ) : /* ================= QUIZ ================= */
          step < QUESTIONS[selectedCategory].length ? (
            <div>
              <div className="mb-10">
                <span className="inline-block px-4 py-1.5 bg-blue-50 text-blue-600 rounded-full text-sm font-semibold mb-4">
                  Pertanyaan {step + 1}/{QUESTIONS[selectedCategory].length}
                </span>
                <h4 className="text-2xl font-bold text-slate-900 leading-relaxed">
                  {QUESTIONS[selectedCategory][step]}
                </h4>
              </div>

              <div className="space-y-3">
                {["Ya, Sering", "Terkadang", "Jarang", "Tidak Pernah"].map(
                  (opt) => (
                    <button
                      key={opt}
                      onClick={nextStep}
                      className="group w-full p-5 border-2 border-slate-200 rounded-xl flex justify-between items-center hover:border-blue-500 hover:bg-blue-50/50 transition-all"
                    >
                      <span className="font-medium text-slate-700 group-hover:text-blue-600">
                        {opt}
                      </span>
                      <ChevronRight
                        className="text-slate-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all"
                        size={20}
                      />
                    </button>
                  )
                )}
              </div>
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 size={48} className="text-green-600" />
              </div>
              <h3 className="text-3xl font-bold text-slate-900 mb-3">
                Evaluasi Selesai
              </h3>
              <p className="text-slate-600 text-lg mb-10">
                Terima kasih telah menyelesaikan evaluasi kesehatan
              </p>
              <button
                onClick={() => setSelectedCategory(null)}
                className="w-full py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-blue-500/30 transition-all"
              >
                Kembali ke Beranda
              </button>
            </div>
          )}
        </div>

        {/* ================= FOOTER ================= */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-100">
          <div className="flex items-center justify-center gap-2 text-xs text-slate-500">
            <AlertCircle size={14} />
            <span>
              Hasil ini bersifat informatif dan bukan pengganti diagnosis medis
              profesional
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
