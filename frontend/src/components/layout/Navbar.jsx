import { Link, useLocation } from "react-router-dom";
import { Bell, UserCircle, Menu, X } from "lucide-react";
import { useState } from "react";
import logo from "../../assets/logo/logo.png";

function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    {
      name: "Home",
      path: "/",
    },
    {
      name: "Market",
      path: "/buyer/marketplace",
    },
    {
      name: "AI Advisor",
      path: "/buyer/ai",
    },
    {
      name: "About",
      path: "/about",
    },
    {
      name: "Contact",
      path: "/contact",
    },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full bg-[#343E4F] text-white shadow-md">

      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">

        {/* ==================================================
            LOGO
        ================================================== */}
        <Link
          to="/"
          className="flex items-center gap-2"
          onClick={() => setMobileMenuOpen(false)}
        >
          <div className="flex h-8 w-8 items-center justify-center overflow-hidden bg-white">
            <img
              src={logo}
              alt="D-Agro Logo"
              className="h-full w-full object-contain"
            />
          </div>

          <span className="text-lg font-bold">
            D-Agro AI
          </span>
        </Link>


        {/* ==================================================
            DESKTOP NAVIGATION
        ================================================== */}
        <div className="hidden items-center gap-6 md:flex">

          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;

            return (
              <Link
                key={link.name}
                to={link.path}
                className={`text-sm font-medium transition ${
                  isActive
                    ? "text-[#E57036]"
                    : "text-white/90 hover:text-[#E57036]"
                }`}
              >
                {link.name}
              </Link>
            );
          })}

        </div>


        {/* ==================================================
            RIGHT SIDE
        ================================================== */}
        <div className="flex items-center gap-2 sm:gap-3">

          {/* Notification */}
          <button
            type="button"
            className="rounded-full p-2 transition hover:bg-white/10"
            aria-label="Notifications"
          >
            <Bell size={18} />
          </button>


          {/* Sign In - Desktop */}
          <Link
            to="/login"
            className="hidden rounded-lg bg-[#E57036] px-4 py-2 text-sm font-semibold text-white transition hover:opacity-90 sm:block"
          >
            Sign In
          </Link>


          {/* Profile */}
          <Link
            to="/profile"
            className="rounded-full transition hover:opacity-80"
            aria-label="Profile"
          >
            <UserCircle size={24} />
          </Link>


          {/* Mobile Menu Button */}
          <button
            type="button"
            className="rounded-lg p-2 transition hover:bg-white/10 md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X size={22} />
            ) : (
              <Menu size={22} />
            )}
          </button>

        </div>

      </div>


      {/* ==================================================
          MOBILE NAVIGATION
      ================================================== */}
      {mobileMenuOpen && (
        <div className="border-t border-white/10 bg-[#343E4F] md:hidden">

          <div className="flex flex-col px-4 py-3">

            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;

              return (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`border-b border-white/5 px-2 py-3 text-sm font-medium transition ${
                    isActive
                      ? "text-[#E57036]"
                      : "text-white hover:text-[#E57036]"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}


            {/* Mobile Sign In */}
            <Link
              to="/login"
              onClick={() => setMobileMenuOpen(false)}
              className="mt-3 rounded-lg bg-[#E57036] px-4 py-3 text-center text-sm font-semibold text-white"
            >
              Sign In
            </Link>

          </div>

        </div>
      )}

    </nav>
  );
}

export default Navbar;