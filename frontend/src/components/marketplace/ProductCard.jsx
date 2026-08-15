import React from "react";
import { useNavigate } from "react-router-dom";
import { MapPin, Star, ShoppingCart, Heart, BadgeCheck } from "lucide-react";
import { useCart } from "../../context/CartContext";

function ProductCard({ product }) {
  const navigate = useNavigate();
  const { addToCart, wishlist, toggleWishlist } = useCart();
  const isWishlisted = wishlist.includes(product.id);

  return (
    <div
      onClick={() => navigate(`/buyer/product/${product.id}`)}
      className="bg-white rounded-2xl border border-slate-200 overflow-hidden cursor-pointer group hover:shadow-lg hover:-translate-y-1 transition-all duration-200 flex flex-col"
    >
      {/* ── Image ── */}
      <div className="relative h-48 w-full overflow-hidden bg-slate-100 shrink-0">
        <img
          src={product.image}
          alt={product.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />

        {/* Grade badge */}
        {product.grade && (
          <span className="absolute top-3 left-3 text-[9px] font-black uppercase tracking-widest bg-[#0B6132] text-white px-2.5 py-1 rounded-full shadow z-10">
            {product.grade}
          </span>
        )}

        {/* Wishlist */}
        <button
          onClick={(e) => { e.stopPropagation(); toggleWishlist(product.id); }}
          className="absolute top-3 right-3 z-10 h-8 w-8 flex items-center justify-center rounded-full bg-white/90 text-slate-600 hover:text-red-500 shadow transition cursor-pointer"
          aria-label="Wishlist"
        >
          <Heart size={15} className={isWishlisted ? "fill-red-500 text-red-500" : ""} />
        </button>

        {/* Organic */}
        {product.isOrganic && (
          <div className="absolute bottom-3 left-3 flex items-center gap-1 bg-white/20 backdrop-blur-sm text-white text-[10px] font-bold px-2 py-0.5 rounded-full border border-white/30 z-10">
            <BadgeCheck size={11} /> Organic
          </div>
        )}

        {/* Region */}
        <div className="absolute bottom-3 right-3 flex items-center gap-1 text-white text-[10px] font-medium drop-shadow z-10">
          <MapPin size={11} className="text-[#E57036]" />
          <span>{product.region.split(",")[0]}</span>
        </div>
      </div>

      {/* ── Body ── */}
      <div className="flex flex-col flex-1 p-4 gap-3">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-bold text-[#343E4F] text-sm leading-snug line-clamp-1 flex-1 group-hover:text-[#107C41] transition">
            {product.title}
          </h3>
          <div className="flex items-center gap-1 text-xs font-semibold text-amber-500 shrink-0 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
            <Star size={11} className="fill-amber-400 text-amber-400" />
            <span>{product.rating}</span>
          </div>
        </div>

        <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">{product.description}</p>

        <div className="pt-2 border-t border-slate-100 flex items-center justify-between mt-auto gap-2">
          <div>
            <span className="text-[10px] text-slate-400 font-medium block">Price</span>
            <span className="text-base font-extrabold text-[#107C41]">
              ETB {product.price.toLocaleString()}
            </span>
            <span className="text-xs text-slate-400 ml-0.5">/ {product.unit}</span>
          </div>

          <button
            onClick={(e) => { e.stopPropagation(); addToCart(product); }}
            className="flex items-center gap-1.5 text-xs font-bold bg-[#E57036] hover:bg-[#D45D22] text-white px-3.5 py-2 rounded-xl transition cursor-pointer shadow-sm"
          >
            <ShoppingCart size={13} /> Order Now
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
