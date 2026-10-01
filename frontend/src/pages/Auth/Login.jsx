import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LogIn } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const loggedUser = await login({ email, password });

      const userRoles = loggedUser.roles || [];
      if (userRoles.length === 1) {
        const role = userRoles[0];
        const dashboardPaths = {
          farmer: "/farmer/dashboard",
          buyer: "/buyer/dashboard",
          supplier: "/supplier/dashboard",
          transporter: "/transport/dashboard",
          transport: "/transport/dashboard",
          admin: "/admin/dashboard",
        };
        navigate(dashboardPaths[role] || "/select-role");
      } else {
        navigate("/select-role");
      }
    } catch (err) {
      setError(err.message || "Incorrect email or password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-6 sm:p-8">

        {/* Header */}
        <div className="text-center mb-8">
          <div className="mx-auto w-14 h-14 rounded-full bg-[#E57036] flex items-center justify-center text-white">
            <LogIn size={28} />
          </div>

          <h1 className="text-3xl font-bold text-[#343E4F] mt-4">
            Welcome Back
          </h1>

          <p className="text-gray-500 mt-2">
            Sign in to your D-Agro account
          </p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>

          {/* Email */}
          <div className="mb-5">
            <label className="block text-sm font-medium text-[#343E4F] mb-2">
              Email Address
            </label>

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-[#E57036]"
            />
          </div>

          {/* Password */}
          <div className="mb-2">
            <label className="block text-sm font-medium text-[#343E4F] mb-2">
              Password
            </label>

            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-[#E57036]"
            />
          </div>

          {/* Forgot Password */}
          <div className="text-right mb-6">
            <Link
              to="/forgot-password"
              className="text-sm text-[#E57036] hover:underline"
            >
              Forgot Password?
            </Link>
          </div>

          {/* Login */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#E57036] hover:bg-[#d4612f] text-white font-semibold py-3 rounded-lg transition disabled:opacity-60 flex items-center justify-center gap-2"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        {/* Register */}
        <p className="text-center text-sm text-gray-500 mt-6">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="text-[#E57036] font-semibold hover:underline"
          >
            Create Account
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;