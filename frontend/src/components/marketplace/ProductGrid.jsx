import React from "react";
import ProductCard from "./ProductCard";

function ProductGrid({ products = [] }) {
  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-12 text-center bg-white rounded-2xl border border-slate-200">
        <span className="text-4xl mb-2">🌾</span>
        <h3 className="text-lg font-bold text-[#343E4F]">No Products Found</h3>
        <p className="text-xs text-slate-500 max-w-sm mt-1">
          Try broadening your search terms or selecting a different category filter.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

export default ProductGrid;
