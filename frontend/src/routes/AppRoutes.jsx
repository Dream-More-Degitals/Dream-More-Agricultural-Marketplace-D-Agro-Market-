import { Routes, Route, Navigate } from "react-router-dom";

/* Layouts */
import BuyerLayout from "../components/layout/BuyerLayout";

/* Landing (public, no sidebar) */
import LandingPage from "../pages/Landing/LandingPage";

/* Buyer Pages */
import BuyerDashboard    from "../pages/Buyer/BuyerDashboard";
import MarketplacePage   from "../pages/Buyer/MarketplacePage";
import ProductDetailPage from "../pages/Buyer/ProductDetailPage";
import CheckoutPage      from "../pages/Buyer/CheckoutPage";
import OrdersPage        from "../pages/Buyer/OrdersPage";
import AIPage            from "../pages/AI/AIPage";
import ProfilePage       from "../pages/Auth/ProfilePage";

function AppRoutes() {
  return (
    <Routes>
      {/* ── Public landing (no sidebar) ── */}
      <Route path="/" element={<LandingPage />} />

      {/* ── Buyer section — ALL wrapped in BuyerLayout (shared sidebar + topbar) ── */}
      <Route path="/buyer" element={<BuyerLayout />}>
        {/* /buyer → redirect to dashboard */}
        <Route index element={<Navigate to="/buyer/dashboard" replace />} />

        {/* Main buyer pages */}
        <Route path="dashboard"        element={<BuyerDashboard />} />
        <Route path="marketplace"      element={<MarketplacePage />} />
        <Route path="product/:id"      element={<ProductDetailPage />} />
        <Route path="checkout"         element={<CheckoutPage />} />
        <Route path="orders"           element={<OrdersPage />} />
        <Route path="ai"               element={<AIPage />} />
        <Route path="profile"          element={<ProfilePage />} />
      </Route>

      {/* ── Legacy short routes — keep old links working ── */}
      <Route path="/marketplace"  element={<Navigate to="/buyer/marketplace" replace />} />
      <Route path="/product/:id"  element={<Navigate to="/buyer/dashboard"   replace />} />
      <Route path="/checkout"     element={<Navigate to="/buyer/checkout"    replace />} />
      <Route path="/orders"       element={<Navigate to="/buyer/orders"      replace />} />
      <Route path="/ai"           element={<Navigate to="/buyer/ai"          replace />} />
      <Route path="/profile"      element={<Navigate to="/buyer/profile"     replace />} />

      {/* ── Fallback ── */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default AppRoutes;