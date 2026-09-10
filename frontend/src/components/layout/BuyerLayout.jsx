import { NavLink, Outlet, Link } from "react-router-dom";
import {
  LayoutDashboard,
  Store,
  ClipboardList,
  Bot,
  Menu,
  X,
  Bell,
  UserCircle,
  LogOut,
  ShoppingCart,
} from "lucide-react";
import { useState } from "react";
import { useCart } from "../../context/CartContext";
import RoleSwitcher from "../common/RoleSwitcher";

function BuyerLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const { userProfile, cart } = useCart();

  const cartCount = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

const navItems = [
  {
    name: "Dashboard",
    path: "/buyer/dashboard",
    icon: <LayoutDashboard size={20} />,
  },
  {
    name: "Marketplace",
    path: "/buyer/marketplace",
    icon: <Store size={20} />,
  },
  {
    name: "Cart",
    path: "/buyer/cart",
    icon: <ShoppingCart size={20} />,
  },
  {
    name: "My Orders",
    path: "/buyer/orders",
    icon: <ClipboardList size={20} />,
  },
  {
    name: "AI Advisor",
    path: "/ai/advisor",
    icon: <Bot size={20} />,
  },
];

  return (
    <div className="min-h-screen bg-[#F8F9FA]">

      {/* =====================================================
          MOBILE TOPBAR
      ====================================================== */}
      <div className="flex h-16 items-center justify-between bg-[#343E4F] px-4 text-white lg:hidden">

        <button
          onClick={() => setSidebarOpen(true)}
          className="rounded-lg p-2 hover:bg-white/10"
        >
          <Menu size={24} />
        </button>

        <Link
          to="/buyer/dashboard"
          className="text-lg font-bold"
        >
          D-Agro AI
        </Link>

        <div className="relative">

          <Bell size={20} />

          <span className="absolute -right-1 -top-1 h-2 w-2 rounded-full bg-[#E57036]" />

        </div>

      </div>


      {/* =====================================================
          MOBILE OVERLAY
      ====================================================== */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
        />
      )}


      {/* =====================================================
          SIDEBAR
      ====================================================== */}
      <aside
        className={`fixed left-0 top-0 z-50 flex h-screen w-64 flex-col bg-[#343E4F] text-white transition-transform duration-300
        ${
          sidebarOpen
            ? "translate-x-0"
            : "-translate-x-full lg:translate-x-0"
        }`}
      >

        {/* =================================================
            LOGO
        ================================================== */}
        <div className="flex h-16 items-center justify-between border-b border-white/10 px-6">

          <Link
            to="/buyer/dashboard"
            className="text-xl font-bold"
          >
            D-Agro AI
          </Link>

          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden"
          >
            <X size={22} />
          </button>

        </div>


        {/* =================================================
            BUYER LABEL
        ================================================== */}
        <div className="px-6 pt-6">

          <p className="text-xs uppercase tracking-wider text-gray-400">
            Buyer Portal
          </p>

        </div>


        {/* =================================================
            NAVIGATION
        ================================================== */}
        <nav className="mt-5 flex flex-1 flex-col gap-2 px-3">

          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              onClick={() => setSidebarOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-lg px-4 py-3 text-sm transition
                ${
                  isActive
                    ? "bg-[#E57036] text-white"
                    : "text-gray-300 hover:bg-white/10 hover:text-white"
                }`
              }
            >
              {item.icon}

              {item.name}
            </NavLink>
          ))}

        </nav>


        {/* =================================================
            ROLE SWITCHER
        ================================================== */}
        <div className="px-3 pb-3">

          <RoleSwitcher currentRole="buyer" />

        </div>


        {/* =================================================
            BOTTOM MENU
        ================================================== */}
        <div className="border-t border-white/10 p-3">

         

          {/* Profile */}
          <Link
            to="/buyer/profile"
            onClick={() => setSidebarOpen(false)}
            className="flex items-center gap-3 rounded-lg px-4 py-3 text-sm text-gray-300 transition hover:bg-white/10 hover:text-white"
          >

            <UserCircle size={20} />

            Profile

          </Link>


          {/* Logout */}
          <Link
            to="/"
            onClick={() => {
              localStorage.removeItem("isLoggedIn");
              setSidebarOpen(false);
            }}
            className="flex items-center gap-3 rounded-lg px-4 py-3 text-sm text-gray-300 transition hover:bg-red-900/30 hover:text-red-400"
          >

            <LogOut size={20} />

            Logout

          </Link>

        </div>

      </aside>


      {/* =====================================================
          MAIN CONTENT
      ====================================================== */}
      <div className="lg:ml-64">


        {/* =================================================
            DESKTOP TOPBAR
        ================================================== */}
        <header className="hidden h-16 items-center justify-between border-b bg-white px-8 lg:flex">

          {/* Page title */}
          <div>

            <h2 className="text-lg font-semibold text-[#343E4F]">
              Buyer Dashboard
            </h2>

          </div>


          {/* Right side */}
          <div className="flex items-center gap-5">

            {/* Notification */}
            <button className="relative text-[#343E4F]">

              <Bell size={20} />

              <span className="absolute -right-1 -top-1 h-2 w-2 rounded-full bg-[#E57036]" />

            </button>


            {/* Profile */}
            <Link
              to="/buyer/profile"
              className="flex items-center gap-2 text-sm font-medium text-[#343E4F]"
            >

              <UserCircle size={25} />

              <span>
                My Account
              </span>

            </Link>

          </div>

        </header>


        {/* =================================================
            PAGE CONTENT
        ================================================== */}
        <main className="p-4 sm:p-6 lg:p-8">

          <Outlet />

        </main>

      </div>

    </div>
  );
}

export default BuyerLayout;