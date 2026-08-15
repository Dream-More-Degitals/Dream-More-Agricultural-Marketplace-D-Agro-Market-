import React from "react";
import { X } from "lucide-react";

function Modal({ isOpen, onClose, title, children, maxWidth = "max-w-md" }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs transition-opacity duration-200">
      <div
        className={`relative w-full ${maxWidth} rounded-2xl bg-white p-6 shadow-2xl transition-all transform scale-100 border border-slate-100`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <h3 className="text-lg font-bold text-[#343E4F]">{title}</h3>
          <button
            onClick={onClose}
            className="rounded-full p-1 text-slate-400 hover:bg-slate-100 hover:text-[#343E4F] transition cursor-pointer"
          >
            <X size={20} />
          </button>
        </div>
        <div className="py-4">{children}</div>
      </div>
    </div>
  );
}

export default Modal;
