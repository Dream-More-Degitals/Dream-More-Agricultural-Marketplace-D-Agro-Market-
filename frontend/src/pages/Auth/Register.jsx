import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserPlus, Check } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

function Register() {
  const navigate = useNavigate();
  const { register } = useAuth();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    roles: [],
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const roles = [
    {
      id: "farmer",
      label: "Farmer",
      icon: "🌾",
    },
    {
      id: "buyer",
      label: "Buyer",
      icon: "🛒",
    },
    {
      id: "supplier",
      label: "Supplier",
      icon: "📦",
    },
    {
      id: "transporter",
      label: "Transporter",
      icon: "🚚",
    },
  ];

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleRoleChange = (role) => {
    setFormData((prev) => ({
      ...prev,

      roles: prev.roles.includes(role)
        ? prev.roles.filter((item) => item !== role)
        : [...prev.roles, role],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (formData.roles.length === 0) {
      setError("Please choose at least one role.");
      return;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    setLoading(true);
    try {
      await register({
        name: formData.name.trim(),
        email: formData.email.trim(),
        password: formData.password,
        roles: formData.roles,
      });

      alert("Account created successfully!");
      if (formData.roles.length === 1) {
        const dashboardPaths = {
          farmer: "/farmer/dashboard",
          buyer: "/buyer/dashboard",
          supplier: "/supplier/dashboard",
          transporter: "/transport/dashboard",
          transport: "/transport/dashboard",
        };
        navigate(dashboardPaths[formData.roles[0]] || "/buyer/dashboard");
      } else {
        navigate("/select-role");
      }
    } catch (err) {
      setError(err.message || "Failed to create account. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-10">

      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-lg p-6 sm:p-8">

        {/* Header */}
        <div className="text-center mb-8">

          <div className="mx-auto w-14 h-14 rounded-full bg-[#E57036] flex items-center justify-center text-white">
            <UserPlus size={28} />
          </div>

          <h1 className="text-3xl font-bold text-[#343E4F] mt-4">
            Create Your Account
          </h1>

          <p className="text-gray-500 mt-2">
            Join D-Agro Agricultural Marketplace
          </p>

        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>

          {/* Full Name */}
          <div className="mb-5">

            <label className="block text-sm font-medium text-[#343E4F] mb-2">
              Full Name
            </label>

            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your full name"
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-[#E57036]"
            />

          </div>


          {/* Email */}
          <div className="mb-5">

            <label className="block text-sm font-medium text-[#343E4F] mb-2">
              Email Address
            </label>

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-[#E57036]"
            />

          </div>


          {/* Password */}
          <div className="mb-7">

            <label className="block text-sm font-medium text-[#343E4F] mb-2">
              Password
            </label>

            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Create a password"
              required
              minLength={6}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-[#E57036]"
            />

          </div>


          {/* Roles */}
          <div className="mb-7">

            <h2 className="text-lg font-semibold text-[#343E4F] mb-2">
              Choose Your Role(s)
            </h2>

            <p className="text-sm text-gray-500 mb-4">
              You can select more than one role.
            </p>


            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

              {roles.map((role) => {

                const selected =
                  formData.roles.includes(role.id);

                return (
                  <button
                    type="button"
                    key={role.id}
                    onClick={() =>
                      handleRoleChange(role.id)
                    }
                    className={`relative flex items-center gap-3 p-4 rounded-xl border-2 text-left transition ${
                      selected
                        ? "border-[#E57036] bg-orange-50"
                        : "border-gray-200 hover:border-[#E57036]"
                    }`}
                  >

                    <span className="text-3xl">
                      {role.icon}
                    </span>

                    <span className="font-semibold text-[#343E4F]">
                      {role.label}
                    </span>

                    {selected && (
                      <span className="absolute right-3 top-3 w-6 h-6 rounded-full bg-[#E57036] text-white flex items-center justify-center">
                        <Check size={15} />
                      </span>
                    )}

                  </button>
                );

              })}

            </div>

          </div>


          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#E57036] hover:bg-[#d4612f] text-white font-semibold py-3 rounded-lg transition disabled:opacity-60"
          >
            {loading ? "Creating Account..." : "Create Account"}
          </button>

        </form>


        {/* Login */}
        <p className="text-center text-sm text-gray-500 mt-6">

          Already have an account?{" "}

          <Link
            to="/login"
            className="text-[#E57036] font-semibold hover:underline"
          >
            Sign In
          </Link>

        </p>

      </div>

    </div>
  );
}

export default Register;