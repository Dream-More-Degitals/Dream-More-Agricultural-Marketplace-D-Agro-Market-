import { Routes, Route, Navigate } from "react-router-dom";

/* Layouts */
import BuyerLayout from "../components/layout/BuyerLayout";
import FarmerLayout from "../components/layout/FarmerLayout";
/* Public Pages */
import LandingPage from "../pages/Landing/LandingPage";
import AboutUs from "../pages/About/AboutUs";
import ContactUs from "../pages/Contact/ContactUs";

/* Buyer Pages */
import BuyerDashboard from "../pages/Buyer/BuyerDashboard";
import MarketplacePage from "../pages/Buyer/MarketplacePage";
import ProductDetailPage from "../pages/Buyer/ProductDetailPage";
import CheckoutPage from "../pages/Buyer/CheckoutPage";
import OrdersPage from "../pages/Buyer/OrdersPage";
import AIPage from "../pages/AI/AIPage";
import ProfilePage from "../pages/Auth/ProfilePage";
import OrderTracking from '../pages/Buyer/OrderTracking';
import Profile from '../pages/Buyer/Profile';
import Notifications from '../pages/Buyer/Notifications';

/* Admin Pages */
import AdminDashboard from '../pages/Admin/Dashboard';

/* Farmer Pages */
import FarmerDashboard from "../pages/Farmer/FarmerDashboard";
import FarmerProfile from "../pages/Farmer/FarmerProfile";
/* Change this line */
import CropRecommendation from "../pages/ai/CropRecommendation";

function AppRoutes() {
  return (
    <Routes>
      {/* =====================================================
          PUBLIC PAGES
      ====================================================== */}

      {/* Landing Page */}
      <Route path="/" element={<LandingPage />} />

      {/* About Us */}
      <Route path="/about" element={<AboutUs />} />

      {/* Contact Us */}
      <Route path="/contact" element={<ContactUs />} />


      {/* =====================================================
          BUYER SECTION
          Shared BuyerLayout = Sidebar + Topbar
      ====================================================== */}

      <Route path="/buyer" element={<BuyerLayout />}>

        {/* /buyer → dashboard */}
        <Route
          index
          element={<Navigate to="/buyer/dashboard" replace />}
        />

        {/* Dashboard */}
        <Route path="dashboard" element={<BuyerDashboard />}  />

        {/* Marketplace */}
        <Route path="marketplace" element={<MarketplacePage />}  />

        {/* Product Details */}
        <Route path="product/:id"  element={<ProductDetailPage />}  />

        {/* Checkout */}
        <Route path="checkout"   element={<CheckoutPage />} />

        {/* Orders */}
        <Route  path="orders"   element={<OrdersPage />} />

        {/* AI Advisor */}
        <Route  path="ai"  element={<AIPage />}  />

        {/* Profile */}
        <Route path="profile" element={<ProfilePage />} />
        <Route path="tracking" element={<OrderTracking />} />
        <Route path="user-profile" element={<Profile />} />
        <Route path="notifications" element={<Notifications />} />
      </Route>
  
{/* FARMER SECTION */}
      <Route path="/farmer" element={<FarmerLayout />}>
        <Route index element={<Navigate to="/farmer/dashboard" replace />} />
        <Route path="dashboard" element={<FarmerDashboard />} />
        <Route path="profile" element={<FarmerProfile />} />

      </Route>
          <Route path="ai/crop-recommendation" element={<CropRecommendation />} />
  {/* =====================================================
         ADMIN SECTION
      ====================================================== */}
     <Route path="/admin/dashboard" element={<AdminDashboard />} />
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