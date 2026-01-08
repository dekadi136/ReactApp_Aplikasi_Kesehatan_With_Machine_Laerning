import React from "react";
import { Scale, Wind, Activity, ChevronRight } from "lucide-react";

export default function ServicesGrid({ onStartTest }) {
  const cats = [
    {
      id: "BMI",
      icon: <Scale size={32} />,
      desc: "Hitung Body Mass Index Anda untuk mengetahui kategori berat badan ideal.",
    },
    {
      id: "Paru-paru",
      icon: <Wind size={32} />,
      desc: "Evaluasi kebersihan pernapasan, riwayat batuk kronis, dan kapasitas oksigen.",
    },
    {
      id: "Diabetes",
      icon: <Activity size={32} />,
      desc: "Identifikasi dini gejala diabetes tipe 2 berdasarkan pola fisik harian Anda.",
    },
  ];

  return (
    <section id="layanan" className="py-24 px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl font-bold text-slate-900 mb-4">
            Kategori Pengecekan
          </h2>
          <p className="text-slate-600 text-lg">
            Pilih kategori pengecekan untuk memulai evaluasi kesehatan Anda.
            Proses ini hanya memakan waktu kurang dari 3 menit.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {cats.map((cat) => (
            <button
              key={cat.id}
              onClick={() => onStartTest(cat.id)}
              className="group bg-white p-8 rounded-3xl border-2 border-slate-100 hover:border-blue-600 transition-all duration-300 text-left hover:shadow-xl hover:-translate-y-2"
            >
              <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 mb-6 group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                {cat.icon}
              </div>

              <h3 className="text-2xl font-bold text-slate-900 mb-3">
                Cek {cat.id}
              </h3>
              <p className="text-slate-600 mb-6 leading-relaxed">{cat.desc}</p>

              <div className="flex items-center gap-2 text-blue-600 font-bold text-sm group-hover:gap-3 transition-all">
                <span>Mulai Sekarang</span>
                <ChevronRight size={18} />
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
