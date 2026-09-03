import { useNavigate } from "react-router-dom";

function SelectRole() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const roles = [
    {
      id: "farmer",
      name: "Farmer",
      icon: "🌾",
      description: "Manage your farm and sell agricultural products.",
    },
    {
      id: "buyer",
      name: "Buyer",
      icon: "🛒",
      description: "Browse products, place orders, and track purchases.",
    },
    {
      id: "supplier",
      name: "Supplier",
      icon: "📦",
      description: "Manage and supply agricultural products.",
    },
    {
      id: "transporter",
      name: "Transporter",
      icon: "🚚",
      description: "Accept and manage agricultural deliveries.",
    },
  ];

  const handleRoleSelect = (role) => {
  if (!user?.roles?.includes(role)) {
    alert("You don't have this role.");
    return;
  }

  localStorage.setItem("activeRole", role);

  const dashboardPaths = {
    farmer: "/farmer/dashboard",
    buyer: "/buyer/dashboard",
    supplier: "/supplier/dashboard",
    transporter: "/transport/dashboard",
  };

  navigate(dashboardPaths[role]);
};

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>No account found. Please register first.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-10">
      <div className="max-w-4xl mx-auto">

        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-3xl sm:text-4xl font-bold text-[#343E4F]">
            Welcome, {user.name}!
          </h1>

          <p className="text-gray-500 mt-2">
            Which dashboard would you like to use?
          </p>
        </div>

        {/* Roles */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {roles
            .filter((role) => user.roles.includes(role.id))
            .map((role) => (
              <button
                key={role.id}
                onClick={() => handleRoleSelect(role.id)}
                className="bg-white border-2 border-gray-200 rounded-2xl p-6 text-left hover:border-[#E57036] hover:shadow-lg transition"
              >
                <div className="text-5xl mb-4">
                  {role.icon}
                </div>

                <h2 className="text-xl font-bold text-[#343E4F]">
                  {role.name}
                </h2>

                <p className="text-gray-500 mt-2">
                  {role.description}
                </p>

                <div className="mt-5 text-[#E57036] font-semibold">
                  Open Dashboard →
                </div>
              </button>
            ))}
        </div>

      </div>
    </div>
  );
}

export default SelectRole;