import { Link } from "react-router-dom";
import { Bell, UserCircle } from "lucide-react";
import logo from "../../assets/logo/logo.png";

function Navbar() {
  return (
    <nav className="sticky top-0 z-50 w-full bg-[#344054] text-white shadow-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center bg-white">
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



        {/* Right side */}
        <div className="flex items-center gap-3">

          <button
            type="button"
            className="rounded-full p-2 transition hover:bg-white/10"
            aria-label="Notifications"
          >
            <Bell size={18} />
          </button>

          <Link
            to="/profile"
            className="rounded-full transition hover:opacity-80"
            aria-label="Profile"
          >
            <UserCircle size={24} />
          </Link>

        </div>
      </div>
    </nav>
  );
}

export default Navbar;