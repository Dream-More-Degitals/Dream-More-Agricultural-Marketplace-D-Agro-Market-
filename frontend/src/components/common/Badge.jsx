import React from "react";

function Badge({ children, variant = "green", className = "", icon: Icon }) {
  const variants = {
    green: "bg-emerald-800 text-white font-bold uppercase tracking-wider text-[10px] px-2.5 py-1 rounded-full",
    lightGreen: "bg-emerald-100 text-emerald-800 font-semibold text-xs px-2.5 py-1 rounded-md border border-emerald-200",
    orange: "bg-[#E57036] text-white font-bold uppercase tracking-wider text-[10px] px-2.5 py-1 rounded-full",
    brown: "bg-[#964B00] text-white font-bold uppercase tracking-wider text-[10px] px-2.5 py-1 rounded-full",
    navy: "bg-[#343E4F] text-white font-semibold text-xs px-2.5 py-1 rounded-md",
    amber: "bg-amber-100 text-amber-800 font-semibold text-xs px-2.5 py-1 rounded-md border border-amber-200",
    gray: "bg-slate-200 text-slate-700 font-semibold text-xs px-2.5 py-1 rounded-md"
  };

  return (
    <span className={`inline-flex items-center gap-1.5 ${variants[variant] || variants.green} ${className}`}>
      {Icon && <Icon className="w-3 h-3 shrink-0" />}
      {children}
    </span>
  );
}

export default Badge;
