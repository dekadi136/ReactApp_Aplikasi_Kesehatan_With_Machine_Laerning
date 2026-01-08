import React from "react";
import { Activity } from "lucide-react";

export default function Navbar({ onStartClick }) {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <button
            onClick={scrollToTop}
            className="flex items-center gap-3 group"
          >
            <div className="w-11 h-11 bg-blue-600 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6">
              <Activity size={24} className="text-white" />
            </div>
            <span className="text-xl font-bold text-slate-900">VitalCheck</span>
          </button>

          <button
            onClick={onStartClick}
            className="inline-flex items-center justify-center px-6 py-3 bg-blue-50 text-blue-700 text-sm font-semibold rounded-xl border border-blue-200 hover:bg-blue-100"
          >
            Mulai Cek
          </button>
        </div>
      </div>
    </nav>
  );
}
