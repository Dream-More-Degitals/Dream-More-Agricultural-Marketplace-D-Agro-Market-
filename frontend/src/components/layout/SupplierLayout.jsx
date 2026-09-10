import { NavLink, Outlet, Link } from "react-router-dom";
import {
  LayoutDashboard,
  Package,
  ShoppingBag,
  Menu,
  X,
  Bell,
  Bot,
  UserCircle,
  LogOut,
} from "lucide-react";
import { useState } from "react";
import RoleSwitcher from "../common/RoleSwitcher";

function SupplierLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navItems = [
    {
      name: "Dashboard",
      path: "/supplier/dashboard",
      icon: <LayoutDashboard size={20} />,
    },
    {
      name: "My Products",
      path: "/supplier/products",
      icon: <Package size={20} />,
    },
    {
      name: "Orders",
      path: "/supplier/orders",
      icon: <ShoppingBag size={20} />,
    },
    {
    name: "AI Advisor",
    path: "/ai/advisor",
    icon: <Bot size={20} />,
  },
  ];

  return (
    <div className="min-h-screen bg-[#F8F9FA]">

      {/* MOBILE TOPBAR */}
      <div className="flex h-16 items-center justify-between bg-[#343E4F] px-4 text-white lg:hidden">

        <button
          onClick={() => setSidebarOpen(true)}
          className="rounded-lg p-2 hover:bg-white/10"
        >
          <Menu size={24} />
        </button>

        <Link
          to="/"
          className="text-lg font-bold"
        >
          D-Agro AI
        </Link>

        <Bell size={20} />

      </div>


      {/* MOBILE OVERLAY */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
        />
      )}


      {/* SIDEBAR */}
      <aside
        className={`fixed left-0 top-0 z-50 flex h-screen w-64 flex-col bg-[#343E4F] text-white transition-transform duration-300
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0`}
      >

        {/* LOGO */}
        <div className="flex h-16 items-center justify-between border-b border-white/10 px-6">

          <Link
            to="/"
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


        {/* SUPPLIER LABEL */}
        <div className="px-6 pt-6">

          <p className="text-xs uppercase tracking-wider text-gray-400">
            Supplier Portal
          </p>

        </div>


        {/* NAVIGATION */}
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


        {/* ROLE SWITCHER */}
        <div className="px-3 pb-3">
          <RoleSwitcher currentRole="supplier" />
        </div>


        {/* BOTTOM MENU */}
        <div className="border-t border-white/10 p-3">

          {/* PROFILE */}
          <Link
            to="/supplier/profile"
            className="flex items-center gap-3 rounded-lg px-4 py-3 text-sm text-gray-300 transition hover:bg-white/10 hover:text-white"
          >
            <UserCircle size={20} />
            Profile
          </Link>


          {/* LOGOUT */}
          <Link
            to="/"
            className="flex items-center gap-3 rounded-lg px-4 py-3 text-sm text-gray-300 transition hover:bg-white/10 hover:text-white"
          >
            <LogOut size={20} />
            Logout
          </Link>

        </div>

      </aside>


      {/* MAIN CONTENT */}
      <div className="lg:ml-64">

        {/* DESKTOP TOPBAR */}
        <header className="hidden h-16 items-center justify-between border-b bg-white px-8 lg:flex">

          <div>
            <h2 className="text-lg font-semibold text-[#343E4F]">
              Supplier Dashboard
            </h2>
          </div>


          <div className="flex items-center gap-5">

            {/* NOTIFICATION */}
            <button className="relative text-[#343E4F]">
              <Bell size={20} />

              <span className="absolute -right-1 -top-1 h-2 w-2 rounded-full bg-[#E57036]" />
            </button>


            {/* ACCOUNT */}
            <Link
              to="/supplier/profile"
              className="flex items-center gap-2 text-sm font-medium text-[#343E4F]"
            >
              <UserCircle size={25} />
              My Account
            </Link>

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

export default SupplierLayout;