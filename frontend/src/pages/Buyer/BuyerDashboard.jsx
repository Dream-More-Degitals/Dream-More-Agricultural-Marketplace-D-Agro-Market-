import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  TrendingUp,
  TrendingDown,
  Sparkles,
  ChevronRight,
  Package,
  ArrowRight,
  Wheat,
  Coffee,
  Sprout,
  ShieldCheck,
  Star,
  MapPin,
  Heart,
  ShoppingCart,
  LayoutDashboard,
  Store,
  ClipboardList,
  CircleDollarSign,
  BarChart3,
  BadgeCheck,
  ExternalLink,
  RefreshCw,
  Filter,
} from "lucide-react";
import { useCart } from "../../context/CartContext";

/* ════════════════════════════════════════════════════
   STAT CARD
════════════════════════════════════════════════════ */
function StatCard({ icon: Icon, label, value, sub, subUp = true, accent }) {
  const accents = {
    green:  { bg: "bg-emerald-50",  icon: "text-[#107C41]", val: "text-[#107C41]"  },
    orange: { bg: "bg-orange-50",   icon: "text-[#E57036]", val: "text-[#E57036]"  },
    navy:   { bg: "bg-slate-100",   icon: "text-[#343E4F]", val: "text-[#343E4F]"  },
    amber:  { bg: "bg-amber-50",    icon: "text-amber-600", val: "text-amber-700"  },
  };
  const a = accents[accent] || accents.green;

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-5 flex items-center gap-4 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200">
      <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${a.bg} shrink-0`}>
        <Icon size={22} className={a.icon} />
      </div>
      <div>
        <p className="text-xs text-slate-400 font-semibold uppercase tracking-wide">{label}</p>
        <p className={`text-2xl font-black leading-tight ${a.val}`}>{value}</p>
        <div className={`flex items-center gap-1 text-[11px] font-bold mt-0.5 ${subUp ? "text-emerald-600" : "text-red-500"}`}>
          {subUp ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
          {sub}
        </div>
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════════
   AI SUGGESTION CARD
════════════════════════════════════════════════════ */
function AICard({ type, badge, title, desc, cta }) {
  const S = {
    highYield: {
      wrap:  "bg-gradient-to-br from-[#0B6132] to-[#107C41]",
      badge: "bg-white/20 text-white",
      btn:   "bg-white text-[#0B6132] hover:bg-slate-50",
      title: "text-white",
      desc:  "text-emerald-100/90",
    },
    logistics: {
      wrap:  "bg-gradient-to-br from-[#7B3B00] to-[#964B00]",
      badge: "bg-white/20 text-white",
      btn:   "bg-white/20 text-white hover:bg-white/30",
      title: "text-white",
      desc:  "text-amber-100/90",
    },
    climate: {
      wrap:  "bg-gradient-to-br from-slate-50 to-amber-50 border border-amber-200",
      badge: "bg-amber-100 text-amber-800",
      btn:   "bg-amber-500 text-white hover:bg-amber-600",
      title: "text-[#343E4F]",
      desc:  "text-slate-500",
    },
  };
  const s = S[type] || S.highYield;

  return (
    <div className={`rounded-2xl p-6 flex flex-col gap-4 h-full ${s.wrap}`}>
      <span className={`self-start text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full ${s.badge}`}>
        {badge}
      </span>
      <div className="flex-1 space-y-2">
        <h3 className={`font-extrabold text-lg leading-snug ${s.title}`}>{title}</h3>
        <p className={`text-sm leading-relaxed ${s.desc}`}>{desc}</p>
      </div>
      <Link to="/buyer/ai">
        <button className={`inline-flex items-center gap-2 text-xs font-bold px-5 py-2.5 rounded-full transition cursor-pointer ${s.btn}`}>
          {cta} <ArrowRight size={13} />
        </button>
      </Link>
    </div>
  );
}

/* ════════════════════════════════════════════════════
   PRODUCT CARD — click goes to /buyer/product/:id
════════════════════════════════════════════════════ */
function ProductCard({ product }) {
  const navigate = useNavigate();
  const { addToCart, wishlist, toggleWishlist } = useCart();
  const isWishlisted = wishlist.includes(product.id);

  return (
    <div
      onClick={() => navigate(`/buyer/product/${product.id}`)}
      className="bg-white rounded-2xl border border-slate-200 overflow-hidden cursor-pointer group hover:shadow-lg hover:-translate-y-1 transition-all duration-250"
    >
      {/* Image */}
      <div className="relative h-48 overflow-hidden bg-slate-100">
        <img
          src={product.image}
          alt={product.title}
          className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

        <span className="absolute top-3 left-3 text-[9px] font-black uppercase tracking-widest bg-[#0B6132] text-white px-2.5 py-1 rounded-full shadow">
          {product.grade}
        </span>

        <button
          onClick={(e) => { e.stopPropagation(); toggleWishlist(product.id); }}
          className="absolute top-3 right-3 h-8 w-8 flex items-center justify-center rounded-full bg-white/90 text-slate-600 hover:text-red-500 shadow transition cursor-pointer"
        >
          <Heart size={15} className={isWishlisted ? "fill-red-500 text-red-500" : ""} />
        </button>

        {product.isOrganic && (
          <div className="absolute bottom-3 left-3 flex items-center gap-1 bg-white/20 backdrop-blur-sm text-white text-[10px] font-bold px-2 py-0.5 rounded-full border border-white/30">
            <BadgeCheck size={11} /> Organic
          </div>
        )}

        <div className="absolute bottom-3 right-3 flex items-center gap-1 text-white text-[10px] font-medium drop-shadow">
          <MapPin size={11} className="text-[#E57036]" />
          {product.region.split(",")[0]}
        </div>
      </div>

      {/* Body */}
      <div className="p-4 flex flex-col gap-3">
        <div className="flex items-start justify-between gap-2">
          <h4 className="font-bold text-sm text-[#343E4F] line-clamp-1 flex-1 group-hover:text-[#107C41] transition">
            {product.title}
          </h4>
          <div className="flex items-center gap-0.5 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-full shrink-0">
            <Star size={11} className="fill-amber-400 text-amber-400" />
            <span className="text-[10px] font-bold text-amber-700">{product.rating}</span>
          </div>
        </div>

        <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">{product.description}</p>

        <div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-2">
          <div>
            <p className="text-[10px] text-slate-400 font-medium">Price</p>
            <p className="text-base font-extrabold text-[#107C41]">
              ETB {product.price.toLocaleString()}
              <span className="text-[11px] text-slate-400 font-normal ml-0.5">/ {product.unit}</span>
            </p>
          </div>
          <button
            onClick={(e) => { e.stopPropagation(); addToCart(product); }}
            className="flex items-center gap-1.5 text-xs font-bold bg-[#E57036] hover:bg-[#D45D22] text-white px-3.5 py-2 rounded-xl transition cursor-pointer shadow-sm shadow-[#E57036]/20"
          >
            <ShoppingCart size={13} /> Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════════
   CATEGORY TAB
════════════════════════════════════════════════════ */
function CategoryTab({ icon: Icon, label, id, active, onClick }) {
  return (
    <button
      onClick={() => onClick(id)}
      className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold border transition-all cursor-pointer whitespace-nowrap ${
        active
          ? "bg-[#343E4F] text-white border-[#343E4F] shadow-md"
          : "bg-white text-slate-600 border-slate-200 hover:border-[#343E4F] hover:text-[#343E4F]"
      }`}
    >
      <Icon size={16} className={active ? "text-[#E57036]" : "text-slate-400"} />
      {label}
    </button>
  );
}

/* ════════════════════════════════════════════════════
   CATEGORIES CONFIG
════════════════════════════════════════════════════ */
const CATEGORIES = [
  { id: "All",      label: "All Products", icon: LayoutDashboard },
  { id: "Grains",   label: "Grains",       icon: Wheat           },
  { id: "Coffee",   label: "Coffee",       icon: Coffee          },
  { id: "Spices",   label: "Spices",       icon: Sprout          },
  { id: "Oilseeds", label: "Oilseeds",     icon: ShieldCheck     },
];

/* ════════════════════════════════════════════════════
   BUYER DASHBOARD — body content only
   (Sidebar + TopBar live in BuyerLayout)
════════════════════════════════════════════════════ */
function BuyerDashboard() {
  const { userProfile, activeOrders, products, cart } = useCart();
  const [activeCategory, setActiveCategory] = useState("All");
  const navigate = useNavigate();

  const featured = activeCategory === "All"
    ? products
    : products.filter((p) => p.category === activeCategory);

  return (
    <div className="p-6 lg:p-8 space-y-8">

      {/* ── PAGE HEADER ── */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-extrabold text-[#343E4F] tracking-tight">
            Selam, {userProfile.name.split(" ")[0]}! 👋
          </h1>
          <p className="text-sm text-slate-500 mt-1 font-medium">
            Here's what's happening in the Ethiopian agricultural market today.
          </p>
        </div>
        <div className="flex items-center gap-3 flex-wrap">
          <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-slate-200 text-sm font-semibold text-slate-600 hover:border-[#343E4F] transition cursor-pointer">
            <RefreshCw size={15} /> Refresh Data
          </button>
          <Link
            to="/buyer/marketplace"
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#E57036] text-white text-sm font-bold hover:bg-[#D45D22] transition shadow-md shadow-[#E57036]/20"
          >
            <Store size={15} /> Go to Marketplace
          </Link>
        </div>
      </div>

      {/* ── STATS ROW ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
        <StatCard
          icon={TrendingUp}
          label="Coffee Index"
          value="+4.2%"
          sub="vs yesterday"
          subUp
          accent="green"
        />
        <StatCard
          icon={ClipboardList}
          label="Active Orders"
          value={activeOrders.length}
          sub="2 in transit"
          subUp
          accent="orange"
        />
        <StatCard
          icon={CircleDollarSign}
          label="Total Spent"
          value="ETB 11.4K"
          sub="This month"
          subUp
          accent="navy"
        />
        <StatCard
          icon={BarChart3}
          label="AI Savings"
          value="ETB 1.2K"
          sub="via optimization"
          subUp
          accent="amber"
        />
      </div>

      {/* ── AI MARKET SUGGESTIONS ── */}
      <section className="space-y-4">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 rounded-lg bg-[#E57036]/10">
              <Sparkles size={18} className="text-[#E57036]" />
            </div>
            <h2 className="text-lg font-extrabold text-[#343E4F]">AI Market Suggestions</h2>
            <span className="text-[10px] font-bold uppercase tracking-wider bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full">
              Live
            </span>
          </div>
          <Link to="/buyer/ai" className="text-sm font-bold text-[#E57036] flex items-center gap-1 hover:underline">
            Open AI Advisor <ExternalLink size={13} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <AICard
            type="highYield"
            badge="HIGH YIELD OPPORTUNITY"
            title="Malt Barley Demand Surge in Oromia"
            desc="Our AI analysis indicates a 15% supply gap for brewing-grade barley next month. Consider securing contracts early."
            cta="View Details"
          />
          <AICard
            type="logistics"
            badge="LOGISTICS AI ALERT"
            title="Freight Cost Optimization"
            desc="Batch your Spices order with 3 neighboring buyers to save 22% on transport costs in the next batch."
            cta="Optimize Shipping"
          />
          <AICard
            type="climate"
            badge="CLIMATE ADVISOR"
            title="Extended Dry Spell"
            desc="Unusually dry week ahead. Expect 5% premium on irrigation-heavy crops like Teff. Plan purchases accordingly."
            cta="Read Forecast"
          />
        </div>
      </section>

      {/* ── PRODUCT CATALOG ── */}
      <section className="space-y-4">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <h2 className="text-lg font-extrabold text-[#343E4F]">Browse Products</h2>
          <div className="flex items-center gap-2 flex-wrap">
            {CATEGORIES.map((c) => (
              <CategoryTab
                key={c.id}
                id={c.id}
                label={c.label}
                icon={c.icon}
                active={activeCategory === c.id}
                onClick={setActiveCategory}
              />
            ))}
            <Link
              to="/buyer/marketplace"
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl border-2 border-dashed border-slate-300 text-sm font-bold text-slate-500 hover:border-[#E57036] hover:text-[#E57036] transition"
            >
              See All <ChevronRight size={14} />
            </Link>
          </div>
        </div>

        {/* Product Grid — click → /buyer/product/:id */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {featured.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      {/* ── ACTIVE ORDERS TABLE ── */}
      <section className="space-y-4 pb-8">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <h2 className="text-lg font-extrabold text-[#343E4F]">Active Orders</h2>
          <Link
            to="/buyer/orders"
            className="text-sm font-bold text-[#E57036] flex items-center gap-1 hover:underline"
          >
            View All Orders <ChevronRight size={14} />
          </Link>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
          {/* Header */}
          <div className="grid grid-cols-5 items-center px-6 py-3.5 bg-slate-50 border-b border-slate-200 text-[11px] font-bold uppercase tracking-widest text-slate-500">
            <span className="col-span-2">Product</span>
            <span>Farmer / Coop</span>
            <span className="text-center">Date</span>
            <span className="text-right">Status</span>
          </div>

          {/* Rows */}
          {activeOrders.map((order, idx) => (
            <div
              key={order.id}
              onClick={() => navigate("/buyer/orders")}
              className={`grid grid-cols-5 items-center px-6 py-4 gap-4 hover:bg-slate-50/80 transition cursor-pointer ${
                idx < activeOrders.length - 1 ? "border-b border-slate-100" : ""
              }`}
            >
              <div className="col-span-2 flex items-center gap-3 min-w-0">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-[#107C41] shrink-0">
                  <Package size={18} />
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-bold text-[#343E4F] truncate">{order.product}</p>
                  <p className="text-xs text-slate-400 font-medium">{order.id}</p>
                </div>
              </div>

              <p className="text-sm font-semibold text-slate-600 truncate">{order.farmer}</p>
              <p className="text-xs text-slate-500 font-medium text-center">{order.date}</p>

              <div className="flex justify-end">
                <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold border ${order.statusColor}`}>
                  <span className="h-1.5 w-1.5 rounded-full bg-current" />
                  {order.status}
                </span>
              </div>
            </div>
          ))}

          {activeOrders.length === 0 && (
            <div className="text-center py-12 text-sm text-slate-400">
              No active orders yet. Go to the marketplace to place your first order.
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export default BuyerDashboard;
