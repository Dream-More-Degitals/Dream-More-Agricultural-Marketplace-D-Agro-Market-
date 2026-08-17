import React from "react";
import { Search, Filter } from "lucide-react";

function SearchBar({ value, onChange, placeholder = "Search Ethiopian products, regions, or farmers..." }) {
  return (
    <div className="relative flex items-center w-full">
      <div className="absolute left-4 text-slate-400">
        <Search size={18} />
      </div>
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full rounded-2xl border border-slate-200 bg-white py-3 pl-11 pr-12 text-sm text-[#343E4F] placeholder-slate-400 shadow-sm transition focus:border-[#E57036] focus:outline-none focus:ring-2 focus:ring-[#E57036]/20"
      />
      <button
        type="button"
        className="absolute right-3 rounded-xl p-1.5 text-slate-500 hover:bg-slate-100 hover:text-[#E57036] transition"
        title="Filter Options"
      >
        <Filter size={18} />
      </button>
    </div>
  );
}

export default SearchBar;
