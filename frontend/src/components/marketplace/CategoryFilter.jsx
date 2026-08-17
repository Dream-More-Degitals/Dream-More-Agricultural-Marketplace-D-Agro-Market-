import React from "react";
import { Wheat, Coffee, Sparkles, Sprout, ShieldCheck } from "lucide-react";

const categories = [
  { id: "All", label: "All Products", icon: Sparkles },
  { id: "Grains", label: "Grains", icon: Wheat },
  { id: "Coffee", label: "Coffee", icon: Coffee },
  { id: "Spices", label: "Spices", icon: Sprout },
  { id: "Oilseeds", label: "Oilseeds", icon: ShieldCheck }
];

function CategoryFilter({ activeCategory, onSelectCategory }) {
  return (
    <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-none py-1">
      {categories.map((cat) => {
        const Icon = cat.icon;
        const isActive = activeCategory === cat.id;

        return (
          <button
            key={cat.id}
            onClick={() => onSelectCategory(cat.id)}
            className={`flex items-center gap-2.5 rounded-2xl px-5 py-3 text-xs sm:text-sm font-semibold transition-all duration-200 shrink-0 border cursor-pointer ${
              isActive
                ? "bg-[#107C41] text-white border-[#107C41] shadow-md shadow-[#107C41]/20 scale-105"
                : "bg-white text-[#343E4F] border-slate-200 hover:border-[#E57036] hover:bg-slate-50"
            }`}
          >
            <div className={`p-1 rounded-lg ${isActive ? "bg-white/20 text-white" : "bg-emerald-50 text-[#107C41]"}`}>
              <Icon size={16} />
            </div>
            <span>{cat.label}</span>
          </button>
        );
      })}
    </div>
  );
}

export default CategoryFilter;
