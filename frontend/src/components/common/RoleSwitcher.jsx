import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronDown, Check } from "lucide-react";

const ROLE_INFO = {
  farmer: {
    name: "Farmer",
    icon: "🌾",
    path: "/farmer/dashboard",
  },
  buyer: {
    name: "Buyer",
    icon: "🛒",
    path: "/buyer/dashboard",
  },
  supplier: {
    name: "Supplier",
    icon: "📦",
    path: "/supplier/dashboard",
  },
  transporter: {
    name: "Transporter",
    icon: "🚚",
    path: "/transport/dashboard",
  },
};

function RoleSwitcher({ currentRole }) {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) return null;

  const availableRoles = user.roles || [];

  const handleRoleChange = (role) => {
    localStorage.setItem("activeRole", role);
    setOpen(false);

    navigate(ROLE_INFO[role].path);
  };

  const current = ROLE_INFO[currentRole];

  return (
    <div className="relative">
      {/* Current Role */}
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between gap-3 rounded-xl bg-white/10 px-4 py-3 text-left hover:bg-white/15 transition"
      >
        <div className="flex items-center gap-3">
          <span className="text-xl">
            {current?.icon}
          </span>

          <div>
            <p className="text-[10px] uppercase tracking-wider text-gray-400">
              Current Role
            </p>

            <p className="text-sm font-semibold text-white">
              {current?.name}
            </p>
          </div>
        </div>

        <ChevronDown
          size={17}
          className={`transition-transform ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Role List */}
      {open && (
        <div className="absolute bottom-full left-0 mb-2 w-full overflow-hidden rounded-xl bg-white shadow-2xl">
          <div className="p-2">
            <p className="px-3 py-2 text-xs font-semibold text-gray-400">
              SWITCH ROLE
            </p>

            {availableRoles.map((role) => {
              const info = ROLE_INFO[role];

              if (!info) return null;

              const isCurrent = role === currentRole;

              return (
                <button
                  key={role}
                  onClick={() => handleRoleChange(role)}
                  className={`flex w-full items-center justify-between rounded-lg px-3 py-3 text-left transition ${
                    isCurrent
                      ? "bg-orange-50 text-[#E57036]"
                      : "text-[#343E4F] hover:bg-gray-100"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xl">
                      {info.icon}
                    </span>

                    <span className="text-sm font-semibold">
                      {info.name}
                    </span>
                  </div>

                  {isCurrent && (
                    <Check size={17} />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

export default RoleSwitcher;