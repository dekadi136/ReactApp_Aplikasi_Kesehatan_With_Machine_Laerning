import React from "react";
import { Sparkles, ArrowRight } from "lucide-react";

export default function Hero({ isVisible, onPilihClick }) {
  return (
    <section className="pt-32 pb-20 px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div
            className={`transition-all duration-700 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-700 rounded-full text-xs font-bold mb-8 border border-blue-100">
              <Sparkles size={14} />
              <span>TEKNOLOGI SKRINING DIGITAL</span>
            </div>

            <h1 className="text-5xl lg:text-6xl font-bold text-slate-900 mb-6 leading-tight">
              Pantau Kesehatan
              <br />
              <span className="text-blue-600">Lebih Dini</span> & Akurat
            </h1>

            <p className="text-lg text-slate-600 mb-10 leading-relaxed max-w-xl">
              Solusi cerdas untuk mengevaluasi risiko kesehatan Jantung,
              Paru-paru, dan Diabetes secara mandiri.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center">
              <button
                onClick={onPilihClick}
                className="group inline-flex items-center gap-3 px-8 py-4 bg-blue-50 text-blue-700 font-semibold rounded-xl border border-blue-200 hover:bg-blue-100"
              >
                <span>Pilih Pengecekan</span>
                <ArrowRight
                  size={20}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </button>
            </div>
          </div>

          <div
            className={`relative transition-all duration-1000 delay-200 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=2070&auto=format&fit=crop"
                alt="Profesional Medis"
                className="w-full h-auto rounded-3xl shadow-2xl"
              />

              <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-11/12 max-w-sm bg-white/95 backdrop-blur-md p-5 rounded-2xl shadow-xl border border-slate-100">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M20 6L9 17L4 12"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 mb-1">
                      Validitas Teruji
                    </h4>
                    <p className="text-xs text-slate-500">
                      Protokol Klinis Internasional
                    </p>
                  </div>
                </div>
              </div>

              <div className="absolute -top-6 -right-6 w-32 h-32 bg-blue-100 rounded-full opacity-20 blur-2xl pointer-events-none" />
              <div className="absolute -bottom-6 -left-6 w-40 h-40 bg-blue-100 rounded-full opacity-20 blur-3xl pointer-events-none" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
