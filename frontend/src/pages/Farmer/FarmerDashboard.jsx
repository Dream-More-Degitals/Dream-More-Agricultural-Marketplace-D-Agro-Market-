import { useEffect, useState } from "react";
import {
  Package,
  ShoppingBag,
  DollarSign,
  TrendingUp,
  Plus,
  ArrowRight,
  AlertTriangle,
  MapPin,
} from "lucide-react";
import { Link } from "react-router-dom";

export default function FarmerDashboard() {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);

  const loadDashboardData = () => {
    try {
      const savedProducts = JSON.parse(
        localStorage.getItem("farmerProducts") || "[]"
      );

      const savedOrders = JSON.parse(
        localStorage.getItem("orders") || "[]"
      );

      setProducts(savedProducts);
      setOrders(savedOrders);
    } catch (error) {
      console.error(
        "Failed to load farmer dashboard data:",
        error
      );

      setProducts([]);
      setOrders([]);
    }
  };

  useEffect(() => {
    loadDashboardData();

    const handleFocus = () => {
      loadDashboardData();
    };

    window.addEventListener("focus", handleFocus);

    return () => {
      window.removeEventListener("focus", handleFocus);
    };
  }, []);

  // ==============================
  // PRODUCT STATISTICS
  // ==============================

  const totalProducts = products.length;

  const totalStock = products.reduce(
    (total, product) =>
      total + Number(product.stock || 0),
    0
  );

  const lowStockProducts = products.filter(
    (product) =>
      Number(product.stock || 0) > 0 &&
      Number(product.stock || 0) <= 50
  );

  const outOfStockProducts = products.filter(
    (product) =>
      Number(product.stock || 0) === 0
  );

  // ==============================
  // ORDER STATISTICS
  // ==============================

  const farmerOrders = orders.filter((order) => {
    if (!order.items) return false;

    return order.items.some(
      (item) =>
        item.seller === "Farmer" ||
        item.sellerType === "Farmer"
    );
  });

  const totalOrders = farmerOrders.length;

  const completedOrders = farmerOrders.filter(
    (order) =>
      order.status === "Delivered" ||
      order.status === "Completed"
  ).length;

  const pendingOrders = farmerOrders.filter(
    (order) =>
      order.status === "Pending" ||
      order.status === "Processing"
  ).length;

  // ==============================
  // REVENUE
  // ==============================

  const revenue = farmerOrders.reduce(
    (total, order) => {
      const farmerItems =
        order.items?.filter(
          (item) =>
            item.seller === "Farmer" ||
            item.sellerType === "Farmer"
        ) || [];

      const orderRevenue = farmerItems.reduce(
        (sum, item) =>
          sum +
          Number(item.price || 0) *
            Number(item.quantity || 1),
        0
      );

      return total + orderRevenue;
    },
    0
  );

  // ==============================
  // RECENT PRODUCTS
  // ==============================

  const recentProducts = [...products]
    .reverse()
    .slice(0, 4);

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">

      {/* =====================================
          HEADER
      ===================================== */}
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

        <div>
          <h1 className="text-2xl font-bold text-[#343E4F] sm:text-3xl">
            Farmer Dashboard
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            Manage your products, orders, and agricultural
            business.
          </p>
        </div>

        <Link
          to="/farmer/products"
          className="flex items-center justify-center gap-2 rounded-xl bg-[#E57036] px-5 py-3 font-semibold text-white shadow-sm transition hover:bg-[#cf5f2b]"
        >
          <Plus size={20} />
          Add Product
        </Link>
      </div>

      {/* =====================================
          STATISTICS
      ===================================== */}
      <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">

        {/* Products */}
        <div className="rounded-2xl bg-white p-5 shadow-sm">
          <div className="flex items-start justify-between">

            <div>
              <p className="text-sm text-gray-500">
                My Products
              </p>

              <p className="mt-2 text-3xl font-bold text-[#343E4F]">
                {totalProducts}
              </p>
            </div>

            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-50">
              <Package
                size={24}
                className="text-[#E57036]"
              />
            </div>
          </div>

          <Link
            to="/farmer/products"
            className="mt-4 flex items-center gap-1 text-sm font-semibold text-[#E57036]"
          >
            Manage products
            <ArrowRight size={15} />
          </Link>
        </div>

        {/* Stock */}
        <div className="rounded-2xl bg-white p-5 shadow-sm">
          <div className="flex items-start justify-between">

            <div>
              <p className="text-sm text-gray-500">
                Total Stock
              </p>

              <p className="mt-2 text-3xl font-bold text-[#343E4F]">
                {totalStock}
              </p>
            </div>

            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50">
              <TrendingUp
                size={24}
                className="text-blue-600"
              />
            </div>
          </div>

          <p className="mt-4 text-sm text-gray-500">
            Across all products
          </p>
        </div>

        {/* Orders */}
        <div className="rounded-2xl bg-white p-5 shadow-sm">
          <div className="flex items-start justify-between">

            <div>
              <p className="text-sm text-gray-500">
                Total Orders
              </p>

              <p className="mt-2 text-3xl font-bold text-[#343E4F]">
                {totalOrders}
              </p>
            </div>

            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-50">
              <ShoppingBag
                size={24}
                className="text-green-600"
              />
            </div>
          </div>

          <p className="mt-4 text-sm text-gray-500">
            {pendingOrders} pending
          </p>
        </div>

        {/* Revenue */}
        <div className="rounded-2xl bg-white p-5 shadow-sm">
          <div className="flex items-start justify-between">

            <div>
              <p className="text-sm text-gray-500">
                Revenue
              </p>

              <p className="mt-2 text-2xl font-bold text-[#343E4F]">
                ETB {revenue.toLocaleString()}
              </p>
            </div>

            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-50">
              <DollarSign
                size={24}
                className="text-purple-600"
              />
            </div>
          </div>

          <p className="mt-4 text-sm text-gray-500">
            From farmer products
          </p>
        </div>
      </div>

      {/* =====================================
          LOW STOCK WARNING
      ===================================== */}
      {(lowStockProducts.length > 0 ||
        outOfStockProducts.length > 0) && (
        <div className="mb-8 rounded-2xl border border-yellow-200 bg-yellow-50 p-5">

          <div className="flex items-start gap-3">
            <AlertTriangle
              size={22}
              className="mt-0.5 shrink-0 text-yellow-600"
            />

            <div>
              <h2 className="font-bold text-yellow-800">
                Stock Alert
              </h2>

              <p className="mt-1 text-sm text-yellow-700">
                {outOfStockProducts.length > 0 &&
                  `${outOfStockProducts.length} product${
                    outOfStockProducts.length !== 1
                      ? "s are"
                      : " is"
                  } out of stock. `}

                {lowStockProducts.length > 0 &&
                  `${lowStockProducts.length} product${
                    lowStockProducts.length !== 1
                      ? "s have"
                      : " has"
                  } low stock.`}
              </p>
            </div>

            <Link
              to="/farmer/products"
              className="ml-auto hidden rounded-lg bg-yellow-600 px-4 py-2 text-sm font-semibold text-white sm:block"
            >
              Check Products
            </Link>
          </div>
        </div>
      )}

      {/* =====================================
          MAIN CONTENT
      ===================================== */}
      <div className="grid gap-6 lg:grid-cols-3">

        {/* ===================================
            RECENT PRODUCTS
        =================================== */}
        <div className="overflow-hidden rounded-2xl bg-white shadow-sm lg:col-span-2">

          <div className="flex items-center justify-between border-b p-5">
            <div>
              <h2 className="font-bold text-[#343E4F]">
                My Recent Products
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Products you recently added
              </p>
            </div>

            <Link
              to="/farmer/products"
              className="flex items-center gap-1 text-sm font-semibold text-[#E57036]"
            >
              View All
              <ArrowRight size={15} />
            </Link>
          </div>

          {recentProducts.length > 0 ? (
            <div className="divide-y">
              {recentProducts.map((product) => (
                <div
                  key={product.id}
                  className="flex items-center gap-4 p-5"
                >
                  {/* Image */}
                  <div className="h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-gray-100">
                    <img
                      src={
                        product.image ||
                        "/images/product-placeholder.jpg"
                      }
                      alt={product.name}
                      className="h-full w-full object-cover"
                      onError={(e) => {
                        e.currentTarget.src =
                          "/images/product-placeholder.jpg";
                      }}
                    />
                  </div>

                  {/* Information */}
                  <div className="min-w-0 flex-1">
                    <h3 className="truncate font-semibold text-[#343E4F]">
                      {product.name}
                    </h3>

                    <p className="mt-1 text-xs text-gray-500">
                      {product.category}
                    </p>

                    <div className="mt-1 flex items-center gap-1 text-xs text-gray-400">
                      <MapPin size={12} />
                      <span className="truncate">
                        {product.location}
                      </span>
                    </div>
                  </div>

                  {/* Price */}
                  <div className="text-right">
                    <p className="font-bold text-[#E57036]">
                      ETB{" "}
                      {Number(
                        product.price || 0
                      ).toLocaleString()}
                    </p>

                    <p className="mt-1 text-xs text-gray-400">
                      /{product.unit || "kg"}
                    </p>
                  </div>

                  {/* Stock */}
                  <div className="hidden text-right sm:block">
                    <p className="text-xs text-gray-400">
                      Stock
                    </p>

                    <p
                      className={`text-sm font-semibold ${
                        Number(product.stock) === 0
                          ? "text-red-500"
                          : Number(product.stock) <= 50
                          ? "text-yellow-600"
                          : "text-green-600"
                      }`}
                    >
                      {product.stock}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="px-5 py-16 text-center">
              <Package
                size={45}
                className="mx-auto mb-4 text-gray-300"
              />

              <h3 className="font-semibold text-[#343E4F]">
                No products yet
              </h3>

              <p className="mt-1 text-sm text-gray-500">
                Add your first product to start selling.
              </p>

              <Link
                to="/farmer/products"
                className="mt-5 inline-flex items-center gap-2 rounded-xl bg-[#E57036] px-5 py-3 text-sm font-semibold text-white"
              >
                <Plus size={18} />
                Add Product
              </Link>
            </div>
          )}
        </div>

        {/* ===================================
            ORDER SUMMARY
        =================================== */}
        <div className="rounded-2xl bg-white p-5 shadow-sm">

          <div className="mb-6">
            <h2 className="font-bold text-[#343E4F]">
              Order Summary
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Your selling activity
            </p>
          </div>

          <div className="space-y-4">

            {/* Total */}
            <div className="flex items-center justify-between rounded-xl bg-gray-50 p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50">
                  <ShoppingBag
                    size={19}
                    className="text-blue-600"
                  />
                </div>

                <span className="text-sm text-gray-600">
                  Total Orders
                </span>
              </div>

              <span className="font-bold text-[#343E4F]">
                {totalOrders}
              </span>
            </div>

            {/* Pending */}
            <div className="flex items-center justify-between rounded-xl bg-gray-50 p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-yellow-50">
                  <ShoppingBag
                    size={19}
                    className="text-yellow-600"
                  />
                </div>

                <span className="text-sm text-gray-600">
                  Pending
                </span>
              </div>

              <span className="font-bold text-yellow-600">
                {pendingOrders}
              </span>
            </div>

            {/* Completed */}
            <div className="flex items-center justify-between rounded-xl bg-gray-50 p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-50">
                  <ShoppingBag
                    size={19}
                    className="text-green-600"
                  />
                </div>

                <span className="text-sm text-gray-600">
                  Completed
                </span>
              </div>

              <span className="font-bold text-green-600">
                {completedOrders}
              </span>
            </div>

            {/* Revenue */}
            <div className="flex items-center justify-between rounded-xl bg-gray-50 p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-50">
                  <DollarSign
                    size={19}
                    className="text-purple-600"
                  />
                </div>

                <span className="text-sm text-gray-600">
                  Revenue
                </span>
              </div>

              <span className="text-sm font-bold text-[#343E4F]">
                ETB {revenue.toLocaleString()}
              </span>
            </div>
          </div>

          {/* Orders button */}
          <Link
            to="/farmer/orders"
            className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl border border-gray-200 px-4 py-3 text-sm font-semibold text-[#343E4F] transition hover:bg-gray-50"
          >
            View Orders
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>

      {/* =====================================
          QUICK ACTIONS
      ===================================== */}
      <div className="mt-8 rounded-2xl bg-[#343E4F] p-6 text-white">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

          <div>
            <h2 className="text-xl font-bold">
              Ready to sell more?
            </h2>

            <p className="mt-1 text-sm text-white/70">
              Add more products to reach buyers on the
              D-Agro Marketplace.
            </p>
          </div>

          <Link
            to="/farmer/products"
            className="flex items-center justify-center gap-2 rounded-xl bg-[#E57036] px-5 py-3 font-semibold text-white transition hover:bg-[#cf5f2b]"
          >
            <Plus size={19} />
            Add New Product
          </Link>
        </div>
      </div>
    </div>
  );
}