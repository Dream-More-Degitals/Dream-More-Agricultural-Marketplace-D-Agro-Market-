import { Routes, Route, Navigate } from "react-router-dom";

/* =====================================================
   LAYOUTS
===================================================== */

import BuyerLayout from "../components/layout/BuyerLayout";
import FarmerLayout from "../components/layout/FarmerLayout";
import SupplierLayout from "../components/layout/SupplierLayout";
import TransportLayout from "../components/layout/TransportLayout";
import AdminLayout from "../components/layout/AdminLayout";

/* =====================================================
   PUBLIC / COMMON PAGES
===================================================== */

import LandingPage from "../pages/Landing/LandingPage";
import AboutUs from "../pages/About/AboutUs";
import ContactUs from "../pages/Contact/ContactUs";

import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import ForgotPassword from "../pages/Auth/ForgotPassword";
import SelectRole from "../pages/Auth/SelectRole";

import Notifications from "../pages/Auth/Notifications";
import ProfilePage from "../pages/Auth/ProfilePage";

/* =====================================================
   BUYER PAGES
===================================================== */

import BuyerDashboard from "../pages/Buyer/BuyerDashboard";
import MarketplacePage from "../pages/Buyer/MarketplacePage";
import ProductDetailPage from "../pages/Buyer/ProductDetailPage";
import CheckoutPage from "../pages/Buyer/CheckoutPage";
import OrdersPage from "../pages/Buyer/OrdersPage";
import OrderTrackingPage from "../pages/Buyer/OrderTrackingPage";
import Profile from "../pages/Buyer/Profile";
import CartPage from "../pages/Buyer/CartPage";

/* =====================================================
   FARMER PAGES
===================================================== */

import FarmerDashboard from "../pages/Farmer/FarmerDashboard";
import FarmerProfile from "../pages/Farmer/FarmerProfile";
import FarmerProducts from "../pages/Farmer/Products";
import FarmerOrders from "../pages/Farmer/Orders";

/* =====================================================
   SUPPLIER PAGES
===================================================== */

import SupplierDashboard from "../pages/Supplier/Dashboard";
import SupplierProducts from "../pages/Supplier/Products";
import SupplierOrders from "../pages/Supplier/Orders";

/* =====================================================
   TRANSPORTER PAGES
===================================================== */

import TransportDashboard from "../pages/Transport/Dashboard";
import TransportDeliveries from "../pages/Transport/Deliveries";
import TransportProfile from "../pages/Transport/Profile";

/* =====================================================
   ADMIN PAGES
===================================================== */

import AdminDashboard from "../pages/Admin/Dashboard";
import AdminUsers from "../pages/Admin/Users";
import AdminProducts from "../pages/Admin/Products";
import AdminOrders from "../pages/Admin/Orders";
import AdminDeliveries from "../pages/Admin/Deliveries";

/* =====================================================
   AI PAGES
===================================================== */

import AIPage from "../pages/AI/AIPage";
import CropRecommendation from "../pages/AI/CropRecommendation";
import DiseaseDetection from "../pages/AI/DiseaseDetection";
import PricePrediction from "../pages/AI/PricePrediction";
import AIAdvisor from "../pages/AI/AIAdvisor";


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

      <Route
        path="/forgot-password"
        element={<ForgotPassword />}
      />

      <Route
        path="/select-role"
        element={<SelectRole />}
      />


      {/* =====================================================
          COMMON PAGES
          These are NOT inside Buyer/Farmer/Supplier layouts.
          Therefore they can be used by all roles.
      ====================================================== */}

      <Route
        path="/notifications"
        element={<Notifications />}
      />

      <Route
        path="/profilepage"
        element={<ProfilePage />}
      />


      {/* =====================================================
          BUYER SECTION
      ====================================================== */}

      <Route
        path="/buyer"
        element={<BuyerLayout />}
      >

        <Route
          index
          element={
            <Navigate
              to="/buyer/dashboard"
              replace
            />
          }
        />

        <Route
          path="dashboard"
          element={<BuyerDashboard />}
        />

        <Route
          path="marketplace"
          element={<MarketplacePage />}
        />

        <Route
          path="product/:id"
          element={<ProductDetailPage />}
        />

        <Route
          path="checkout"
          element={<CheckoutPage />}
        />

        <Route
          path="orders"
          element={<OrdersPage />}
        />

        <Route
          path="orders/:id"
          element={<OrderTrackingPage />}
        />

        <Route
          path="cart"
          element={<CartPage />}
        />

        <Route
          path="profile"
          element={<Profile />}
        />

      </Route>


      {/* =====================================================
          FARMER SECTION
      ====================================================== */}

      <Route
        path="/farmer"
        element={<FarmerLayout />}
      >

        <Route
          index
          element={
            <Navigate
              to="/farmer/dashboard"
              replace
            />
          }
        />

        <Route
          path="dashboard"
          element={<FarmerDashboard />}
        />

        <Route
          path="products"
          element={<FarmerProducts />}
        />

        <Route
          path="orders"
          element={<FarmerOrders />}
        />

        <Route
          path="profile"
          element={<FarmerProfile />}
        />

      </Route>


      {/* =====================================================
          SUPPLIER SECTION
      ====================================================== */}

      <Route
        path="/supplier"
        element={<SupplierLayout />}
      >

        <Route
          index
          element={
            <Navigate
              to="/supplier/dashboard"
              replace
            />
          }
        />

        <Route
          path="dashboard"
          element={<SupplierDashboard />}
        />

        <Route
          path="products"
          element={<SupplierProducts />}
        />

        <Route
          path="orders"
          element={<SupplierOrders />}
        />

      </Route>


      {/* =====================================================
          TRANSPORTER SECTION
      ====================================================== */}

      <Route
        path="/transport"
        element={<TransportLayout />}
      >

        <Route
          index
          element={
            <Navigate
              to="/transport/dashboard"
              replace
            />
          }
        />

        <Route
          path="dashboard"
          element={<TransportDashboard />}
        />

        <Route
          path="deliveries"
          element={<TransportDeliveries />}
        />

        <Route
          path="profile"
          element={<TransportProfile />}
        />

      </Route>


      {/* =====================================================
          ADMIN SECTION
      ====================================================== */}

      <Route
        path="/admin"
        element={<AdminLayout />}
      >

        <Route
          index
          element={
            <Navigate
              to="/admin/dashboard"
              replace
            />
          }
        />

        <Route
          path="dashboard"
          element={<AdminDashboard />}
        />

        <Route
          path="users"
          element={<AdminUsers />}
        />

        <Route
          path="products"
          element={<AdminProducts />}
        />

        <Route
          path="orders"
          element={<AdminOrders />}
        />

        <Route
          path="deliveries"
          element={<AdminDeliveries />}
        />

      </Route>


      {/* =====================================================
          AI SECTION
          IMPORTANT:
          This is outside BuyerLayout.
      ====================================================== */}

      <Route path="/ai">

        <Route
          index
          element={<AIPage />}
        />

        <Route
          path="crop-recommendation"
          element={<CropRecommendation />}
        />

        <Route
          path="disease-detection"
          element={<DiseaseDetection />}
        />

        <Route
          path="price-prediction"
          element={<PricePrediction />}
        />

        <Route
          path="advisor"
          element={<AIAdvisor />}
        />

      </Route>


      {/* =====================================================
          LEGACY SHORT ROUTES
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
        path="/profile"
        element={
          <Navigate
            to="/profilepage"
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