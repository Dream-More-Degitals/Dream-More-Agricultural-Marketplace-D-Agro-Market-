import { Routes, Route, Navigate } from "react-router-dom";

/* Layouts */
import BuyerLayout from "../components/layout/BuyerLayout";
import FarmerLayout from "../components/layout/FarmerLayout";
import SupplierLayout from "../components/layout/SupplierLayout";
import TransportLayout from "../components/layout/TransportLayout";

/* Public Pages */
import LandingPage from "../pages/Landing/LandingPage";
import AboutUs from "../pages/About/AboutUs";
import ContactUs from "../pages/Contact/ContactUs";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import ForgotPassword from "../pages/Auth/ForgotPassword";
import SelectRole from "../pages/Auth/SelectRole";

/* Buyer Pages */
import BuyerDashboard from "../pages/Buyer/BuyerDashboard";
import MarketplacePage from "../pages/Buyer/MarketplacePage";
import ProductDetailPage from "../pages/Buyer/ProductDetailPage";
import CheckoutPage from "../pages/Buyer/CheckoutPage";
import OrdersPage from "../pages/Buyer/OrdersPage";
import AIPage from "../pages/AI/AIPage";
import ProfilePage from "../pages/Auth/ProfilePage";
import OrderTracking from "../pages/Buyer/OrderTracking";
import Profile from "../pages/Buyer/Profile";
import Notifications from "../pages/Buyer/Notifications";

/* Admin Pages */
import AdminDashboard from "../pages/Admin/Dashboard";

/* Farmer Pages */
import FarmerDashboard from "../pages/Farmer/FarmerDashboard";
import FarmerProfile from "../pages/Farmer/FarmerProfile";

/* AI Pages */
import CropRecommendation from "../pages/ai/CropRecommendation";

/* Supplier Pages */
import SupplierDashboard from "../pages/Supplier/Dashboard";
import SupplierProducts from "../pages/Supplier/Products";

/* Transporter Pages */
import TransportDashboard from "../pages/Transport/Dashboard";
import TransportDeliveries from "../pages/Transport/Deliveries";
import TransportProfile from "../pages/Transport/Profile";

function AppRoutes() {
  return (
    <Routes>
      {/* =====================================================
          PUBLIC PAGES
      ====================================================== */}

      <Route path="/" element={<LandingPage />} />
      <Route path="/about" element={<AboutUs />} />
      <Route path="/contact" element={<ContactUs />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/select-role" element={<SelectRole />} />

      {/* =====================================================
          BUYER SECTION
      ====================================================== */}

      <Route path="/buyer" element={<BuyerLayout />}>
        <Route
          index
          element={<Navigate to="/buyer/dashboard" replace />}
        />

        <Route path="dashboard" element={<BuyerDashboard />} />
        <Route path="marketplace" element={<MarketplacePage />} />
        <Route path="product/:id" element={<ProductDetailPage />} />
        <Route path="checkout" element={<CheckoutPage />} />
        <Route path="orders" element={<OrdersPage />} />
        <Route path="ai" element={<AIPage />} />
        <Route path="profile" element={<ProfilePage />} />
        <Route path="tracking" element={<OrderTracking />} />
        <Route path="user-profile" element={<Profile />} />
        <Route path="notifications" element={<Notifications />} />
      </Route>

      {/* =====================================================
          FARMER SECTION
      ====================================================== */}

      <Route path="/farmer" element={<FarmerLayout />}>
        <Route
          index
          element={<Navigate to="/farmer/dashboard" replace />}
        />

        <Route path="dashboard" element={<FarmerDashboard />} />
        <Route path="profile" element={<FarmerProfile />} />
      </Route>

      {/* =====================================================
          AI SECTION
      ====================================================== */}

      <Route
        path="/ai/crop-recommendation"
        element={<CropRecommendation />}
      />

      {/* =====================================================
          ADMIN SECTION
      ====================================================== */}

      <Route path="/admin/dashboard" element={<AdminDashboard />} />

      {/* =====================================================
          SUPPLIER SECTION
      ====================================================== */}

      <Route path="/supplier" element={<SupplierLayout />}>
        <Route
          index
          element={<Navigate to="/supplier/dashboard" replace />}
        />

        <Route path="dashboard" element={<SupplierDashboard />} />
        <Route path="products" element={<SupplierProducts />} />
      </Route>

      {/* =====================================================
          TRANSPORT SECTION
      ====================================================== */}

      <Route path="/transport" element={<TransportLayout />}>
        <Route
          index
          element={<Navigate to="/transport/dashboard" replace />}
        />

        <Route path="dashboard" element={<TransportDashboard />} />
        <Route path="deliveries" element={<TransportDeliveries />} />
        <Route path="profile" element={<TransportProfile />} />
      </Route>

      {/* =====================================================
          LEGACY SHORT ROUTES
          Keep existing links working
      ====================================================== */}

      <Route
        path="/marketplace"
        element={
          <Navigate
            to="/buyer/marketplace"
            replace
          />
        }
      />

      <Route
        path="/product/:id"
        element={
          <Navigate
            to="/buyer/dashboard"
            replace
          />
        }
      />

      <Route
        path="/checkout"
        element={
          <Navigate
            to="/buyer/checkout"
            replace
          />
        }
      />

      <Route
        path="/orders"
        element={
          <Navigate
            to="/buyer/orders"
            replace
          />
        }
      />

      <Route
        path="/ai"
        element={
          <Navigate
            to="/buyer/ai"
            replace
          />
        }
      />

      <Route
        path="/profile"
        element={
          <Navigate
            to="/buyer/profile"
            replace
          />
        }
      />

      {/* =====================================================
          FALLBACK
      ====================================================== */}

      <Route
        path="*"
        element={<Navigate to="/" replace />}
      />
    </Routes>
  );
}

export default AppRoutes;
