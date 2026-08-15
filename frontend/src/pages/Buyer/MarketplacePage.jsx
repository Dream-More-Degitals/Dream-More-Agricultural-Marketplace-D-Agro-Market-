import React, { useState } from "react";
import { Sparkles, ChevronLeft, ChevronRight } from "lucide-react";
import SearchBar from "../../components/marketplace/SearchBar";
import CategoryFilter from "../../components/marketplace/CategoryFilter";
import ProductGrid from "../../components/marketplace/ProductGrid";
import Card from "../../components/common/Card";
import { useCart } from "../../context/CartContext";

function MarketplacePage() {
  const { products } = useCart();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.region.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.farmer.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      selectedCategory === "All" || product.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-6 pb-12 space-y-6">
      <SearchBar
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      <CategoryFilter
        activeCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />

      <Card className="bg-[#EBF7F0] border border-emerald-200/80 p-4 sm:p-5 rounded-2xl flex items-start gap-3.5">
        <div className="p-2 rounded-xl bg-[#107C41] text-white shrink-0 mt-0.5">
          <Sparkles size={18} />
        </div>
        <div className="space-y-1">
          <h3 className="text-sm font-extrabold text-emerald-900 tracking-tight flex items-center gap-2">
            Market Insight
          </h3>
          <p className="text-xs sm:text-sm text-emerald-800 leading-relaxed font-medium">
            White Teff prices in the Addis Ababa market are expected to rise by 6% due to seasonal demand shifts. Consider securing supply early.
          </p>
        </div>
      </Card>

      <ProductGrid products={filteredProducts} />

      <div className="flex items-center justify-center gap-3 pt-6">
        <button
          className="p-2 rounded-xl border border-slate-200 bg-white text-slate-500 hover:bg-slate-50 disabled:opacity-50"
          disabled
        >
          <ChevronLeft size={16} />
        </button>

        <button className="h-9 w-9 rounded-xl bg-[#107C41] text-white font-bold text-xs flex items-center justify-center shadow-md">
          1
        </button>

        <button
          className="p-2 rounded-xl border border-slate-200 bg-white text-slate-500 hover:bg-slate-50 disabled:opacity-50"
          disabled
        >
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
}

export default MarketplacePage;
