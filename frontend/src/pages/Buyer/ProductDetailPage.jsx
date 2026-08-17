import React, { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
  ChevronLeft,
  ChevronRight,
  Heart,
  Star,
  Sparkles,
  ShieldCheck,
  MessageSquare,
  ShoppingCart,
  ArrowRight,
  UserCheck
} from "lucide-react";
import { useCart } from "../../context/CartContext";

function ProductDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { products, addToCart, wishlist, toggleWishlist } = useCart();

  // Find product by id or default to Sidama Coffee
  const product =
    products.find((p) => p.id === id) || products[0];

  const [selectedImg, setSelectedImg] = useState(0);
  const isWishlisted = wishlist.includes(product.id);

  const images = product.thumbnails && product.thumbnails.length > 0
    ? product.thumbnails
    : [product.image];

  const handleBuyNow = () => {
    addToCart(product, 1);
    navigate("/buyer/checkout");
  };

  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-4 pb-28 space-y-6">
      
      {/* Breadcrumb Navigation */}
      <nav className="flex items-center gap-2 text-xs font-semibold text-slate-500 overflow-x-auto py-1">
        <Link to="/buyer/marketplace" className="hover:text-[#E57036] transition shrink-0">
          Marketplace
        </Link>
        <ChevronRight size={12} className="shrink-0" />
        <span className="hover:text-[#E57036] transition cursor-pointer shrink-0">
          {product.category} & Beverages
        </span>
        <ChevronRight size={12} className="shrink-0" />
        <span className="text-[#343E4F] font-bold truncate">{product.title}</span>
      </nav>

      {/* Main Image Gallery */}
      <div className="space-y-3">
        <div className="relative h-72 sm:h-96 w-full overflow-hidden rounded-3xl bg-slate-900 shadow-md">
          <img
            src={images[selectedImg] || product.image}
            alt={product.title}
            className="h-full w-full object-cover transition-all duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>

          {/* Grade Badge */}
          <div className="absolute top-4 left-4 z-10">
            <span className="bg-[#0B6132] text-white text-[10px] sm:text-xs font-black uppercase tracking-wider px-3 py-1.5 rounded-full shadow-md">
              {product.grade || "PREMIUM GRADE A"}
            </span>
          </div>

          {/* Wishlist Floating Button */}
          <button
            onClick={() => toggleWishlist(product.id)}
            className="absolute top-4 right-4 z-10 rounded-full bg-white/90 p-2.5 text-slate-700 backdrop-blur-md hover:scale-110 transition shadow-md"
            aria-label="Toggle Wishlist"
          >
            <Heart
              size={20}
              className={isWishlisted ? "fill-red-500 text-red-500" : ""}
            />
          </button>
        </div>

        {/* Thumbnails strip */}
        <div className="grid grid-cols-4 gap-3">
          {images.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedImg(idx)}
              className={`relative h-20 rounded-2xl overflow-hidden border-2 transition ${
                selectedImg === idx
                  ? "border-[#E57036] ring-2 ring-[#E57036]/30 scale-95"
                  : "border-slate-200 opacity-70 hover:opacity-100"
              }`}
            >
              <img src={img} alt={`Thumbnail ${idx}`} className="h-full w-full object-cover" />
              {idx === 3 && images.length > 4 && (
                <div className="absolute inset-0 bg-black/60 flex items-center justify-center text-white font-extrabold text-sm">
                  +12
                </div>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Product Title & Ratings */}
      <div className="space-y-2">
        <div className="flex items-center justify-between gap-4">
          <h1 className="text-2xl sm:text-3xl font-black text-[#343E4F] tracking-tight">
            {product.title}
          </h1>
        </div>

        <div className="flex items-center gap-3 text-xs sm:text-sm font-semibold text-slate-600 flex-wrap">
          <div className="flex items-center gap-1 text-amber-500">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={14} className="fill-amber-400 text-amber-400" />
              ))}
            </div>
            <span className="font-extrabold text-[#343E4F] ml-1">{product.rating}</span>
            <span className="text-slate-400 font-medium">({product.reviewsCount} Reviews)</span>
          </div>
          <span className="text-slate-300">|</span>
          <span className="inline-flex items-center gap-1 text-[#107C41] font-bold bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
            <ShieldCheck size={14} /> Verified Quality
          </span>
        </div>

        {/* Price tag */}
        <div className="pt-2 flex items-baseline gap-2">
          <span className="text-2xl sm:text-3xl font-black text-[#107C41]">
            ETB {product.price.toLocaleString()}
          </span>
          <span className="text-sm text-slate-500 font-bold">/ {product.unit}</span>
        </div>
      </div>

      {/* AI Market Advisor Card */}
      <div className="rounded-2xl bg-[#EBF7F0] border border-emerald-200 p-4 sm:p-5 space-y-2">
        <div className="flex items-center gap-2 text-[#107C41] font-extrabold text-xs tracking-wide uppercase">
          <Sparkles size={16} className="text-[#E57036]" />
          <span>AI Market Advisor</span>
        </div>
        <p className="text-xs sm:text-sm text-emerald-900 leading-relaxed font-medium">
          {product.aiAdvice ||
            "Current price is 8% lower than the 30-day average for Sidama Grade A. Predictive models suggest a seasonal uptick in demand next month. Recommended for bulk purchase now."}
        </p>
      </div>

      {/* Seller Profile Card */}
      <div className="flex items-center justify-between p-4 rounded-2xl bg-white border border-slate-200 shadow-xs">
        <div className="flex items-center gap-3">
          <img
            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80"
            alt="Yirgacheffe Union"
            className="h-12 w-12 rounded-full object-cover border-2 border-[#107C41]"
          />
          <div>
            <h4 className="font-extrabold text-sm text-[#343E4F]">
              {product.farmer || "Yirgacheffe Union"}
            </h4>
            <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
              <span className="text-[#107C41] font-bold">Premier Seller</span>
              <span>•</span>
              <span>84x Sales</span>
            </div>
          </div>
        </div>

        <button className="px-4 py-2 rounded-xl bg-slate-100 text-[#343E4F] hover:bg-slate-200 text-xs font-bold transition">
          Contact
        </button>
      </div>

      {/* Specs Grid */}
      <div className="grid grid-cols-2 gap-3">
        <div className="p-3.5 rounded-2xl bg-slate-100/80 border border-slate-200/60">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
            ROAST LEVEL
          </span>
          <span className="text-sm font-extrabold text-[#343E4F] mt-0.5 block">
            {product.roastLevel || "Medium-Dark"}
          </span>
        </div>

        <div className="p-3.5 rounded-2xl bg-slate-100/80 border border-slate-200/60">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
            QUALITY GRADE
          </span>
          <span className="text-sm font-extrabold text-[#343E4F] mt-0.5 block">
            {product.qualityGrade || "G1 Organic"}
          </span>
        </div>

        <div className="p-3.5 rounded-2xl bg-slate-100/80 border border-slate-200/60">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
            PROCESSING
          </span>
          <span className="text-sm font-extrabold text-[#343E4F] mt-0.5 block">
            {product.processing || "Washed"}
          </span>
        </div>

        <div className="p-3.5 rounded-2xl bg-slate-100/80 border border-slate-200/60">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
            ALTITUDE
          </span>
          <span className="text-sm font-extrabold text-[#343E4F] mt-0.5 block">
            {product.altitude || "1,900 - 2,200m"}
          </span>
        </div>
      </div>

      {/* Description Section */}
      <div className="space-y-2 pt-2 border-t border-slate-200">
        <h3 className="text-base font-extrabold text-[#343E4F]">Description</h3>
        <p className="text-xs sm:text-sm leading-relaxed text-slate-600 font-normal">
          {product.description}
        </p>
      </div>

      {/* Customer Reviews Section */}
      <div className="space-y-4 pt-4 border-t border-slate-200">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-extrabold text-[#343E4F]">Customer Reviews</h3>
          <a href="#reviews" className="text-xs font-bold text-[#107C41] hover:underline flex items-center gap-1">
            <span>View All Reviews</span>
            <ArrowRight size={12} />
          </a>
        </div>

        <div className="space-y-3">
          {/* Review 1 */}
          <div className="p-4 rounded-2xl bg-white border border-slate-200 space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-100 text-[#107C41] font-bold text-xs">
                  MS
                </div>
                <div>
                  <span className="font-bold text-xs text-[#343E4F] block">Mohammed S.</span>
                  <span className="text-[10px] text-slate-400">Verified Buyer</span>
                </div>
              </div>
              <div className="flex text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={12} className="fill-amber-400" />
                ))}
              </div>
            </div>
            <p className="text-xs italic text-slate-600 leading-relaxed">
              "The quality is exceptional. You can truly taste the high-altitude characteristics. Delivery was faster than expected via D-Agro logistics."
            </p>
          </div>

          {/* Review 2 */}
          <div className="p-4 rounded-2xl bg-white border border-slate-200 space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#107C41] text-white font-bold text-xs">
                  HL
                </div>
                <div>
                  <span className="font-bold text-xs text-[#343E4F] block">Hanna L.</span>
                  <span className="text-[10px] text-slate-400">Wholesale Partner</span>
                </div>
              </div>
              <div className="flex text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={12} className="fill-amber-400" />
                ))}
              </div>
            </div>
            <p className="text-xs italic text-slate-600 leading-relaxed">
              "Consistently good beans. We use these for our boutique cafe in Addis and our customers love the profile. The AI grading reports are very helpful for our QA."
            </p>
          </div>
        </div>
      </div>

      {/* Sticky Action Bar at Bottom */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 p-3 sm:px-8 shadow-2xl">
        <div className="mx-auto max-w-4xl flex items-center gap-3">
          <button
            onClick={() => addToCart(product, 1)}
            className="flex-1 py-3.5 rounded-2xl border-2 border-[#107C41] text-[#107C41] hover:bg-emerald-50 font-bold text-xs sm:text-sm transition flex items-center justify-center gap-2 cursor-pointer"
          >
            <ShoppingCart size={16} />
            <span>Add to Cart</span>
          </button>

          <button
            onClick={handleBuyNow}
            className="flex-1 py-3.5 rounded-2xl bg-[#0B6132] hover:bg-[#084825] text-white font-extrabold text-xs sm:text-sm transition shadow-md shadow-[#0B6132]/20 cursor-pointer"
          >
            Buy Now
          </button>
        </div>
      </div>

    </div>
  );
}

export default ProductDetailPage;
