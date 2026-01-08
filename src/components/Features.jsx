import React from "react";
import { ShieldCheck, Users, Award } from "lucide-react";

export default function Features() {
  const items = [
    {
      icon: <ShieldCheck size={24} />,
      title: "Aman & Terpercaya",
      desc: "Data Anda terenkripsi dengan standar medis",
    },
    {
      icon: <Users size={24} />,
      title: "Mudah Digunakan",
      desc: "Interface sederhana untuk semua usia",
    },
    {
      icon: <Award size={24} />,
      title: "Hasil Akurat",
      desc: "Berdasarkan algoritma klinis terkini",
    },
  ];

  return (
    <section className="py-20 px-6 lg:px-8 bg-slate-50">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-3 gap-8">
          {items.map((item, i) => (
            <div
              key={i}
              className="bg-white p-8 rounded-2xl border border-slate-100 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
            >
              <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 mb-5">
                {item.icon}
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                {item.title}
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
