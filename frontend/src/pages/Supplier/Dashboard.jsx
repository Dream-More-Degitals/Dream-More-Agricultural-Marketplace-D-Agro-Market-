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
  const statistics = [
    {
      title: "Total Products",
      value: "24",
      icon: <Package size={24} />,
      description: "Products listed",
    },
    {
      title: "Active Listings",
      value: "18",
      icon: <ShoppingBag size={24} />,
      description: "Currently available",
    },
    {
      title: "Pending Orders",
      value: "8",
      icon: <Clock size={24} />,
      description: "Need your attention",
    },
    {
      title: "Total Revenue",
      value: "125,000 ETB",
      icon: <DollarSign size={24} />,
      description: "This month",
    },
  ];

  const recentProducts = [
    {
      name: "Organic Fertilizer",
      category: "Fertilizer",
      stock: "120 Bags",
      price: "2,500 ETB",
      status: "Active",
    },
    {
      name: "Maize Seeds",
      category: "Seeds",
      stock: "300 Kg",
      price: "1,200 ETB",
      status: "Active",
    },
    {
      name: "Irrigation Pipe",
      category: "Equipment",
      stock: "45 Units",
      price: "3,500 ETB",
      status: "Low Stock",
    },
  ];

  return (
    <div>

      {/* PAGE HEADER */}
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


      {/* STATISTICS */}
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


      {/* BUSINESS OVERVIEW */}
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


          {/* Placeholder Chart */}
          <div className="mt-8 flex h-56 items-center justify-center rounded-lg bg-[#F8F9FA]">

            <div className="text-center">

              <TrendingUp
                size={40}
                className="mx-auto text-[#E57036]"
              />

              <p className="mt-3 text-sm text-gray-500">
                Sales analytics will appear here
              </p>

            </div>

          </div>

        </div>


        {/* QUICK ACTIONS */}
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


      {/* RECENT PRODUCTS */}
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


        {/* TABLE */}
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

              {recentProducts.map((product) => (

                <tr
                  key={product.name}
                  className="border-t text-sm"
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

              ))}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
}

export default Dashboard;