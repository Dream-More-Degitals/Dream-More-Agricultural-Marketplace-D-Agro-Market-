import React, { useState } from "react";
import { Link, Outlet, useNavigate, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Store,
  ClipboardList,
  Bot,
  User,
  Bell,
  Search,
  ShoppingCart,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Menu,
  X,
} from "lucide-react";
import { useCart } from "../../context/CartContext";

/* ── Nav item definition ── */
const NAV_ITEMS = [
  { icon: LayoutDashboard, label: "Dashboard",   path: "/buyer/dashboard" },
  { icon: Store,           label: "Marketplace", path: "/buyer/marketplace" },
  { icon: ClipboardList,   label: "My Orders",   path: "/buyer/orders" },
  { icon: Bot,             label: "AI Advisor",  path: "/buyer/ai" },
  { icon: User,            label: "Profile",     path: "/buyer/profile" },
];

/* ════════════════════════════════════════════════════
   SIDEBAR COMPONENT
════════════════════════════════════════════════════ */
function Sidebar({ collapsed, setCollapsed, mobileOpen, setMobileOpen }) {
  const location = useLocation();

  return (
    <>
      {/* Mobile Overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar Panel */}
      <aside
        className={`
          fixed top-0 left-0 z-50 h-full bg-[#343E4F] text-white flex flex-col
          transition-all duration-300 ease-in-out shadow-2xl
          lg:sticky lg:top-0 lg:z-30 lg:shadow-none
          ${collapsed ? "lg:w-20" : "lg:w-64"}
          ${mobileOpen ? "w-72 translate-x-0" : "w-72 -translate-x-full lg:translate-x-0"}
        `}
      >
        {/* Brand */}
        <div className={`flex items-center border-b border-white/10 py-4 ${collapsed ? "px-4 justify-center" : "px-5 gap-3"}`}>
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#E57036] to-amber-500 text-xl shadow-md">
            🌱
          </div>
          {!collapsed && (
            <div className="min-w-0">
              <p className="text-sm font-extrabold tracking-tight leading-tight truncate">D-Agro Market</p>
              <p className="text-[10px] text-[#E57036] font-bold uppercase tracking-widest">AI Platform</p>
            </div>
          )}
          {/* Close on mobile */}
          <button
            className="ml-auto lg:hidden text-slate-300 hover:text-white cursor-pointer"
            onClick={() => setMobileOpen(false)}
          >
            <X size={20} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-5 space-y-1 overflow-y-auto">
          {NAV_ITEMS.map(({ icon: Icon, label, path }) => {
            const active = location.pathname === path || location.pathname.startsWith(path + "/");
            return (
              <Link
                key={path}
                to={path}
                onClick={() => setMobileOpen(false)}
                title={collapsed ? label : undefined}
                className={`flex items-center gap-3 rounded-xl transition-all duration-150 font-semibold group
                  ${collapsed ? "px-0 py-3 justify-center" : "px-4 py-3"}
                  ${active
                    ? "bg-[#E57036] text-white shadow-lg shadow-[#E57036]/25"
                    : "text-slate-300 hover:bg-white/10 hover:text-white"
                  }`}
              >
                <Icon size={18} className="shrink-0" />
                {!collapsed && <span className="text-sm">{label}</span>}
              </Link>
            );
          })}
        </nav>

        {/* Bottom: Cart / Sign Out */}
        <div className={`border-t border-white/10 py-4 space-y-1 ${collapsed ? "px-2" : "px-3"}`}>
          <Link
            to="/buyer/checkout"
            onClick={() => setMobileOpen(false)}
            title={collapsed ? "Checkout" : undefined}
            className={`flex items-center gap-3 rounded-xl text-slate-300 hover:bg-white/10 hover:text-white transition font-semibold
              ${collapsed ? "px-0 py-3 justify-center" : "px-4 py-3"}`}
          >
            <ShoppingCart size={18} className="shrink-0" />
            {!collapsed && <span className="text-sm">Checkout</span>}
          </Link>
          <button
            title={collapsed ? "Sign Out" : undefined}
            className={`w-full flex items-center gap-3 rounded-xl text-slate-400 hover:bg-red-900/30 hover:text-red-400 transition font-semibold cursor-pointer
              ${collapsed ? "px-0 py-3 justify-center" : "px-4 py-3"}`}
          >
            <LogOut size={18} className="shrink-0" />
            {!collapsed && <span className="text-sm">Sign Out</span>}
          </button>
        </div>

        {/* Collapse toggle (desktop only) */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="hidden lg:flex absolute -right-3 top-16 h-6 w-6 items-center justify-center rounded-full bg-[#E57036] text-white text-xs shadow-md hover:bg-[#D45D22] transition cursor-pointer"
        >
          {collapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
        </button>
      </aside>
    </>
  );
}

/* ════════════════════════════════════════════════════
   TOP HEADER BAR COMPONENT
════════════════════════════════════════════════════ */
function TopBar({ setMobileOpen }) {
  const { userProfile, cart } = useCart();
  const cartCount = cart.reduce((s, i) => s + i.quantity, 0);
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-20 bg-white/90 backdrop-blur-md border-b border-slate-200 flex items-center gap-4 px-4 lg:px-6 py-3 shadow-sm">
      {/* Mobile hamburger */}
      <button
        className="lg:hidden p-2 rounded-xl text-slate-600 hover:bg-slate-100 transition cursor-pointer"
        onClick={() => setMobileOpen(true)}
      >
        <Menu size={20} />
      </button>

      {/* Search */}
      <div className="relative flex-1 max-w-xl">
        <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          type="text"
          placeholder="Search products, regions, or farmers…"
          className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm text-[#343E4F] placeholder-slate-400 focus:outline-none focus:border-[#E57036] focus:ring-2 focus:ring-[#E57036]/15 transition"
        />
      </div>

      <div className="flex items-center gap-2 ml-auto shrink-0">
        {/* Notifications */}
        <button className="relative p-2 rounded-xl text-slate-600 hover:bg-slate-100 transition cursor-pointer">
          <Bell size={20} />
          <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-[#E57036] ring-2 ring-white" />
        </button>

        {/* Cart */}
        <button
          onClick={() => navigate("/buyer/checkout")}
          className="relative flex items-center gap-2 px-3 py-2 rounded-xl bg-[#343E4F] text-white hover:bg-[#2A3241] transition text-sm font-bold cursor-pointer"
        >
          <ShoppingCart size={17} />
          <span className="hidden sm:inline">Cart</span>
          {cartCount > 0 && (
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#E57036] text-[10px] font-black">
              {cartCount}
            </span>
          )}
        </button>

        {/* Avatar */}
        <Link to="/buyer/profile" className="flex items-center gap-2.5 pl-2 border-l border-slate-200">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#107C41] text-white text-xs font-extrabold shrink-0">
            {userProfile.initials}
          </div>
          <div className="hidden xl:block">
            <p className="text-sm font-bold text-[#343E4F] leading-tight">{userProfile.name}</p>
            <p className="text-[10px] text-slate-400 font-medium">{userProfile.role}</p>
          </div>
        </Link>
      </div>
    </header>
  );
}

/* ════════════════════════════════════════════════════
   BUYER LAYOUT — wraps all buyer pages via <Outlet />
════════════════════════════════════════════════════ */
function BuyerLayout() {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-[#F5F7FA]">
      {/* Sidebar */}
      <Sidebar
        collapsed={collapsed}
        setCollapsed={setCollapsed}
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
      />

      {/* Main content area */}
      <div className="flex flex-1 flex-col min-w-0 overflow-hidden">
        <TopBar setMobileOpen={setMobileOpen} />
        <main className="flex-1 overflow-auto">
          {/* <Outlet /> renders the matched child route */}
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default BuyerLayout;
