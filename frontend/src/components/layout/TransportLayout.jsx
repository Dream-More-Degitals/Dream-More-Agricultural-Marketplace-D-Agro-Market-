import { useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Truck,
  UserCircle,
  Bot,
  LogOut,
  Menu,
  X,
  MapPin,
} from "lucide-react";
import RoleSwitcher from "../common/RoleSwitcher";

function TransportLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    {
      name: "Dashboard",
      path: "/transport/dashboard",
      icon: LayoutDashboard,
    },
    {
      name: "Deliveries",
      path: "/transport/deliveries",
      icon: Truck,
    },
    {
      name: "Profile",
      path: "/transport/profile",
      icon: UserCircle,
    },
    {
    name: "AI Advisor",
    path: "/ai/advisor",
    icon: Bot,
  },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <div className="min-h-screen bg-[#F8F9FA]">

      {/* =========================
          MOBILE HEADER
      ========================= */}

      <div className="sticky top-0 z-40 flex h-16 items-center justify-between bg-[#343E4F] px-4 text-white lg:hidden">

        <Link
          to="/transport/dashboard"
          className="flex items-center gap-2"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#E57036]">
            <Truck size={20} />
          </div>

          <span className="font-bold">
            D-Agro Transport
          </span>
        </Link>

        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="rounded-lg p-2 hover:bg-white/10"
        >
          {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

      </div>


      {/* =========================
          MOBILE OVERLAY
      ========================= */}

      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
        />
      )}


      {/* =========================
          SIDEBAR
      ========================= */}

      <aside
        className={`fixed left-0 top-0 z-50 flex h-screen w-64 flex-col bg-[#343E4F] text-white transition-transform duration-300
        ${
          sidebarOpen
            ? "translate-x-0"
            : "-translate-x-full"
        }
        lg:translate-x-0`}
      >

        {/* LOGO */}

        <div className="flex h-20 items-center gap-3 border-b border-white/10 px-6">

          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#E57036]">
            <Truck size={22} />
          </div>

          <div>
            <h1 className="font-bold">
              D-Agro
            </h1>

            <p className="text-xs text-gray-300">
              Transporter
            </p>
          </div>

        </div>


        {/* NAVIGATION */}

        <nav className="flex-1 space-y-2 px-4 py-6">

          {navItems.map((item) => {

            const Icon = item.icon;

            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition
                ${
                  isActive(item.path)
                    ? "bg-[#E57036] text-white"
                    : "text-gray-300 hover:bg-white/10 hover:text-white"
                }`}
              >
                <Icon size={19} />

                <span>
                  {item.name}
                </span>
              </Link>
            );
          })}

        </nav>


        {/* LOCATION STATUS */}

        <div className="mx-4 mb-4 rounded-xl bg-white/10 p-4">

          <div className="flex items-center gap-2">

            <MapPin
              size={18}
              className="text-[#E57036]"
            />

            <span className="text-sm font-medium">
              Available
            </span>

          </div>

          <p className="mt-2 text-xs text-gray-300">
            Ready to accept deliveries
          </p>

        </div>

{/* ROLE SWITCHER */}

<div className="px-4 pb-4">
  <RoleSwitcher currentRole="transporter" />
</div>

{/* LOGOUT */}

<div className="border-t border-white/10 p-4"></div>
        {/* LOGOUT */}

        <div className="border-t border-white/10 p-4">

          <Link
            to="/"
            className="flex items-center gap-3 rounded-lg px-4 py-3 text-sm text-gray-300 transition hover:bg-white/10 hover:text-white"
          >
            <LogOut size={19} />

            <span>
              Logout
            </span>
          </Link>

        </div>

      </aside>


      {/* =========================
          MAIN AREA
      ========================= */}

      <div className="lg:ml-64">

        {/* DESKTOP TOPBAR */}

        <header className="hidden h-20 items-center justify-between border-b border-gray-200 bg-white px-8 lg:flex">

          <div>

            <p className="text-sm text-gray-500">
              Transport Management
            </p>

            <h2 className="text-lg font-bold text-[#343E4F]">
              D-Agro Delivery Center
            </h2>

          </div>


          <div className="flex items-center gap-3">

            <div className="text-right">

              <p className="text-sm font-semibold text-[#343E4F]">
                Transporter
              </p>

              <p className="text-xs text-gray-500">
                Available for deliveries
              </p>

            </div>

            <UserCircle
              size={38}
              className="text-[#343E4F]"
            />

          </div>

        </header>


        {/* PAGE CONTENT */}

        <main className="p-4 sm:p-6 lg:p-8">

          <Outlet />

        </main>

      </div>

    </div>
  );
}

export default TransportLayout;