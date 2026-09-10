import { Link } from "react-router-dom";
import {
  Package,
  ShoppingBag,
  Clock,
  DollarSign,
  Plus,
  ArrowRight,
  TrendingUp,
} from "lucide-react";

function Dashboard() {
  /*
   * =========================
   * PRODUCTS
   * =========================
   *
   * Read supplier products from localStorage.
   * If there are no saved products yet, use the default products.
   */

  const defaultProducts = [
    {
      id: 1,
      name: "Organic Fertilizer",
      category: "Fertilizer",
      price: "2,500 ETB",
      stock: 120,
      status: "Active",
      image: "/images/fertilizer.jpg",
    },
    {
      id: 2,
      name: "Maize Seeds",
      category: "Seeds",
      price: "1,200 ETB",
      stock: 300,
      status: "Active",
      image: "/images/maize-seeds.jpg",
    },
    {
      id: 3,
      name: "Irrigation Pipe",
      category: "Equipment",
      price: "3,500 ETB",
      stock: 45,
      status: "Low Stock",
      image: "/images/irrigation.jpg",
    },
    {
      id: 4,
      name: "Wheat Seeds",
      category: "Seeds",
      price: "1,500 ETB",
      stock: 180,
      status: "Active",
      image: "/images/wheat-seeds.jpg",
    },
  ];

  const savedProducts = JSON.parse(
    localStorage.getItem("supplierProducts")
  );

  const products =
    savedProducts && Array.isArray(savedProducts)
      ? savedProducts
      : defaultProducts;

  /*
   * =========================
   * STATISTICS
   * =========================
   */

  const totalProducts = products.length;

  const activeProducts = products.filter(
    (product) => product.status === "Active"
  ).length;

  const lowStockProducts = products.filter(
    (product) => product.stock <= 50
  ).length;

  /*
   * Temporary revenue value.
   * This will later come from real orders/backend.
   */

  const totalRevenue = "125,000 ETB";

  const statistics = [
    {
      title: "Total Products",
      value: totalProducts,
      icon: <Package size={24} />,
      description: "Products listed",
    },
    {
      title: "Active Listings",
      value: activeProducts,
      icon: <ShoppingBag size={24} />,
      description: "Currently available",
    },
    {
      title: "Low Stock",
      value: lowStockProducts,
      icon: <Clock size={24} />,
      description: "Need your attention",
    },
    {
      title: "Total Revenue",
      value: totalRevenue,
      icon: <DollarSign size={24} />,
      description: "This month",
    },
  ];

  /*
   * =========================
   * RECENT PRODUCTS
   * =========================
   */

  const recentProducts = [...products].reverse().slice(0, 5);

  return (
    <div>
      {/* =========================
          PAGE HEADER
      ========================= */}

      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#343E4F] sm:text-3xl">
            Welcome back, Supplier!
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            Manage your agricultural products and monitor your business.
          </p>
        </div>

        <Link
          to="/supplier/products"
          className="flex items-center justify-center gap-2 rounded-lg bg-[#E57036] px-5 py-3 text-sm font-semibold text-white transition hover:opacity-90"
        >
          <Plus size={18} />
          Add Product
        </Link>
      </div>

      {/* =========================
          STATISTICS
      ========================= */}

      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {statistics.map((item) => (
          <div
            key={item.title}
            className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-gray-500">
                  {item.title}
                </p>

                <h3 className="mt-2 text-2xl font-bold text-[#343E4F]">
                  {item.value}
                </h3>
              </div>

              <div className="rounded-lg bg-orange-50 p-3 text-[#E57036]">
                {item.icon}
              </div>
            </div>

            <p className="mt-4 text-xs text-gray-400">
              {item.description}
            </p>
          </div>
        ))}
      </div>

      {/* =========================
          BUSINESS OVERVIEW
      ========================= */}

      <div className="mt-8 grid gap-6 lg:grid-cols-3">
        <div className="rounded-xl border border-gray-200 bg-white p-6 lg:col-span-2">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-[#343E4F]">
                Business Overview
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Your sales performance this month
              </p>
            </div>

            <TrendingUp
              size={24}
              className="text-[#E57036]"
            />
          </div>

          {/* SALES PLACEHOLDER */}

          <div className="mt-8 flex h-56 items-center justify-center rounded-lg bg-[#F8F9FA]">
            <div className="text-center">
              <TrendingUp
                size={40}
                className="mx-auto text-[#E57036]"
              />

              <p className="mt-3 text-sm text-gray-500">
                Sales analytics will appear here
              </p>

              <p className="mt-1 text-xs text-gray-400">
                Analytics will be connected to real orders later.
              </p>
            </div>
          </div>
        </div>

        {/* =========================
            QUICK ACTIONS
        ========================= */}

        <div className="rounded-xl border border-gray-200 bg-white p-6">
          <h2 className="text-lg font-semibold text-[#343E4F]">
            Quick Actions
          </h2>

          <div className="mt-5 space-y-3">
            <Link
              to="/supplier/products"
              className="flex items-center justify-between rounded-lg bg-[#F8F9FA] p-4 text-sm font-medium text-[#343E4F] transition hover:bg-orange-50"
            >
              Manage Products

              <ArrowRight size={17} />
            </Link>

            <Link
              to="/supplier/products"
              className="flex items-center justify-between rounded-lg bg-[#F8F9FA] p-4 text-sm font-medium text-[#343E4F] transition hover:bg-orange-50"
            >
              Add New Product

              <Plus size={17} />
            </Link>
          </div>
        </div>
      </div>

      {/* =========================
          RECENT PRODUCTS
      ========================= */}

      <div className="mt-8 rounded-xl border border-gray-200 bg-white">
        <div className="flex flex-col gap-3 border-b p-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-lg font-semibold text-[#343E4F]">
              Recent Products
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Recently added agricultural supplies
            </p>
          </div>

          <Link
            to="/supplier/products"
            className="flex items-center gap-1 text-sm font-semibold text-[#E57036]"
          >
            View All

            <ArrowRight size={16} />
          </Link>
        </div>

        {/* =========================
            TABLE
        ========================= */}

        <div className="overflow-x-auto">
          <table className="w-full min-w-[650px]">
            <thead className="bg-[#F8F9FA]">
              <tr className="text-left text-xs uppercase text-gray-500">
                <th className="px-6 py-4 font-medium">
                  Product
                </th>

                <th className="px-6 py-4 font-medium">
                  Category
                </th>

                <th className="px-6 py-4 font-medium">
                  Stock
                </th>

                <th className="px-6 py-4 font-medium">
                  Price
                </th>

                <th className="px-6 py-4 font-medium">
                  Status
                </th>
              </tr>
            </thead>

            <tbody>
              {recentProducts.length > 0 ? (
                recentProducts.map((product) => (
                  <tr
                    key={product.id}
                    className="border-t text-sm transition hover:bg-gray-50"
                  >
                    <td className="px-6 py-4 font-medium text-[#343E4F]">
                      {product.name}
                    </td>

                    <td className="px-6 py-4 text-gray-500">
                      {product.category}
                    </td>

                    <td className="px-6 py-4 text-gray-500">
                      {product.stock}
                    </td>

                    <td className="px-6 py-4 font-medium text-[#343E4F]">
                      {product.price}
                    </td>

                    <td className="px-6 py-4">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-medium ${
                          product.status === "Active"
                            ? "bg-green-50 text-green-600"
                            : "bg-orange-50 text-[#E57036]"
                        }`}
                      >
                        {product.status}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="5"
                    className="px-6 py-12 text-center"
                  >
                    <Package
                      size={40}
                      className="mx-auto text-gray-300"
                    />

                    <p className="mt-3 text-sm font-medium text-gray-500">
                      No products available
                    </p>

                    <Link
                      to="/supplier/products"
                      className="mt-3 inline-block text-sm font-semibold text-[#E57036]"
                    >
                      Add your first product
                    </Link>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* =========================
          LOW STOCK ALERT
      ========================= */}

      {lowStockProducts > 0 && (
        <div className="mt-6 rounded-xl border border-orange-200 bg-orange-50 p-5">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h3 className="font-semibold text-[#343E4F]">
                Low Stock Alert
              </h3>

              <p className="mt-1 text-sm text-gray-600">
                {lowStockProducts} product
                {lowStockProducts > 1 ? "s are" : " is"} running
                low on stock.
              </p>
            </div>

            <Link
              to="/supplier/products"
              className="text-sm font-semibold text-[#E57036]"
            >
              Manage Inventory →
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;