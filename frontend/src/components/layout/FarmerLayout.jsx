import { useState } from "react";
import { Bot, Sparkles } from "lucide-react";
import {
  LayoutDashboard,
  Package,
  ShoppingBag,
  UserCircle,
  LogOut,
  Menu,
  X,
  Store,
} from "lucide-react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import RoleSwitcher from "../common/RoleSwitcher";

export default function FarmerLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");

    navigate("/");
  };

  const navItems = [
    {
      name: "Dashboard",
      path: "/farmer/dashboard",
      icon: LayoutDashboard,
    },
    {
      name: "My Products",
      path: "/farmer/products",
      icon: Package,
    },
    {
      name: "Orders",
      path: "/farmer/orders",
      icon: ShoppingBag,
    },
    {
      name: "Profile",
      path: "/farmer/profile",
      icon: UserCircle,
    },
     {
    name: "AI Advisor",
    path: "/ai",
    icon:  Bot,
  },
  ];

  const NavItem = ({ item }) => {
    const Icon = item.icon;

    return (
      <NavLink
        to={item.path}
        onClick={() => setSidebarOpen(false)}
        className={({ isActive }) =>
          `flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition ${
            isActive
              ? "bg-[#E57036] text-white shadow-sm"
              : "text-white/70 hover:bg-white/10 hover:text-white"
          }`
        }
      >
        <Icon size={20} />
        <span>{item.name}</span>
      </NavLink>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">

      {/* =====================================
          MOBILE HEADER
      ===================================== */}
      <header className="fixed left-0 right-0 top-0 z-40 flex h-16 items-center justify-between bg-[#343E4F] px-4 shadow-md lg:hidden">

        <div className="flex items-center gap-2">
          <Store size={25} className="text-[#E57036]" />

          <span className="font-bold text-white">
            D-Agro
          </span>
        </div>

        <button
          onClick={() => setSidebarOpen(true)}
          className="rounded-lg p-2 text-white transition hover:bg-white/10"
          aria-label="Open menu"
        >
          <Menu size={25} />
        </button>
      </header>

      {/* =====================================
          MOBILE OVERLAY
      ===================================== */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* =====================================
          SIDEBAR
      ===================================== */}
      <aside
        className={`fixed left-0 top-0 z-50 flex h-screen w-72 flex-col bg-[#343E4F] transition-transform duration-300 lg:translate-x-0 ${
          sidebarOpen
            ? "translate-x-0"
            : "-translate-x-full"
        }`}
      >

        {/* Logo */}
        <div className="flex h-20 items-center justify-between border-b border-white/10 px-6">

          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#E57036]">
              <Store
                size={23}
                className="text-white"
              />
            </div>

            <div>
              <h1 className="font-bold text-white">
                D-Agro
              </h1>

              <p className="text-xs text-white/50">
                Farmer Portal
              </p>
            </div>
          </div>

          {/* Close mobile sidebar */}
          <button
            onClick={() => setSidebarOpen(false)}
            className="rounded-lg p-2 text-white/70 hover:bg-white/10 hover:text-white lg:hidden"
          >
            <X size={22} />
          </button>
        </div>

        {/* =====================================
            NAVIGATION
        ===================================== */}
        <nav className="flex-1 space-y-2 overflow-y-auto p-4">

          <p className="mb-3 px-4 text-xs font-semibold uppercase tracking-wider text-white/40">
            Main Menu
          </p>

          {navItems.map((item) => (
            <NavItem
              key={item.path}
              item={item}
            />
          ))}
        </nav>

          {/* =================================================
            ROLE SWITCHER
        ================================================== */}
        <div className="px-3 pb-3">

          <RoleSwitcher currentRole="buyer" />

        </div>

        {/* =====================================
            BOTTOM SECTION
        ===================================== */}
        <div className="border-t border-white/10 p-4">

          {/* Farmer role */}
          <div className="mb-3 flex items-center gap-3 rounded-xl bg-white/5 p-3">

            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#E57036]">
              <UserCircle
                size={22}
                className="text-white"
              />
            </div>

            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-white">
                Farmer
              </p>

              <p className="text-xs text-white/50">
                Agricultural Seller
              </p>
            </div>
          </div>

          {/* Logout */}
          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-white/70 transition hover:bg-red-500/10 hover:text-red-400"
          >
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* =====================================
          MAIN CONTENT
      ===================================== */}
      <main className="min-h-screen lg:ml-72">

        {/* Space for mobile header */}
        <div className="h-16 lg:hidden" />

        <Outlet />
      </main>
    </div>
  );
}