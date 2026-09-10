import { useMemo, useState } from "react";
import {
  Users,
  ShoppingCart,
  Package,
  Truck,
  DollarSign,
  UserCheck,
  UserPlus,
  Clock,
  CheckCircle,
  AlertCircle,
  Search,
  ArrowRight,
} from "lucide-react";
import { Link } from "react-router-dom";

const users = [
  {
    id: 1,
    name: "Abebe Kebede",
    email: "abebe@example.com",
    role: "Buyer",
    status: "Active",
  },
  {
    id: 2,
    name: "Hanna Ali",
    email: "hanna@example.com",
    role: "Farmer",
    status: "Active",
  },
  {
    id: 3,
    name: "Mohammed Ahmed",
    email: "mohammed@example.com",
    role: "Supplier",
    status: "Active",
  },
  {
    id: 4,
    name: "Dawit Tesfaye",
    email: "dawit@example.com",
    role: "Transporter",
    status: "Pending",
  },
];

const recentOrders = [
  {
    id: "ORD-1001",
    customer: "Abebe Kebede",
    product: "Organic Fertilizer",
    amount: 25000,
    status: "Processing",
    date: "09/08/2026",
  },
  {
    id: "ORD-1002",
    customer: "Hanna Ali",
    product: "Maize Seeds",
    amount: 6000,
    status: "Confirmed",
    date: "08/08/2026",
  },
  {
    id: "ORD-1003",
    customer: "Mohammed Ahmed",
    product: "Irrigation Pipe",
    amount: 7000,
    status: "Delivered",
    date: "07/08/2026",
  },
  {
    id: "ORD-1004",
    customer: "Fatuma Omar",
    product: "Wheat Seeds",
    amount: 12000,
    status: "Pending",
    date: "06/08/2026",
  },
];

function Dashboard() {
  const [search, setSearch] = useState("");

  const filteredUsers = useMemo(() => {
    const text = search.toLowerCase();

    return users.filter(
      (user) =>
        user.name.toLowerCase().includes(text) ||
        user.email.toLowerCase().includes(text) ||
        user.role.toLowerCase().includes(text)
    );
  }, [search]);

  const getOrderStatusStyle = (status) => {
    switch (status) {
      case "Delivered":
        return "bg-green-100 text-green-700";

      case "Confirmed":
        return "bg-blue-100 text-blue-700";

      case "Processing":
        return "bg-orange-100 text-orange-700";

      case "Pending":
        return "bg-yellow-100 text-yellow-700";

      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  const getUserStatusStyle = (status) => {
    return status === "Active"
      ? "bg-green-100 text-green-700"
      : "bg-yellow-100 text-yellow-700";
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-[#343E4F] sm:text-3xl">
          Admin Dashboard
        </h1>

        <p className="mt-1 text-sm text-gray-500">
          Monitor and manage the D-Agro marketplace platform.
        </p>
      </div>

      {/* Statistics */}
      <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        {/* Users */}
        <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="rounded-xl bg-blue-50 p-3">
              <Users size={22} className="text-blue-600" />
            </div>

            <UserPlus size={18} className="text-green-500" />
          </div>

          <p className="mt-4 text-sm text-gray-500">
            Total Users
          </p>

          <p className="mt-1 text-2xl font-bold text-[#343E4F]">
            1,248
          </p>
        </div>

        {/* Farmers */}
        <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
          <div className="rounded-xl bg-green-50 p-3 w-fit">
            <UserCheck
              size={22}
              className="text-green-600"
            />
          </div>

          <p className="mt-4 text-sm text-gray-500">
            Farmers
          </p>

          <p className="mt-1 text-2xl font-bold text-[#343E4F]">
            486
          </p>
        </div>

        {/* Products */}
        <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
          <div className="rounded-xl bg-orange-50 p-3 w-fit">
            <Package
              size={22}
              className="text-orange-600"
            />
          </div>

          <p className="mt-4 text-sm text-gray-500">
            Products
          </p>

          <p className="mt-1 text-2xl font-bold text-[#343E4F]">
            2,456
          </p>
        </div>

        {/* Orders */}
        <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
          <div className="rounded-xl bg-purple-50 p-3 w-fit">
            <ShoppingCart
              size={22}
              className="text-purple-600"
            />
          </div>

          <p className="mt-4 text-sm text-gray-500">
            Orders
          </p>

          <p className="mt-1 text-2xl font-bold text-[#343E4F]">
            3,842
          </p>
        </div>

        {/* Deliveries */}
        <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
          <div className="rounded-xl bg-indigo-50 p-3 w-fit">
            <Truck
              size={22}
              className="text-indigo-600"
            />
          </div>

          <p className="mt-4 text-sm text-gray-500">
            Deliveries
          </p>

          <p className="mt-1 text-2xl font-bold text-[#343E4F]">
            1,927
          </p>
        </div>

        {/* Revenue */}
        <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
          <div className="rounded-xl bg-emerald-50 p-3 w-fit">
            <DollarSign
              size={22}
              className="text-emerald-600"
            />
          </div>

          <p className="mt-4 text-sm text-gray-500">
            Revenue
          </p>

          <p className="mt-1 text-xl font-bold text-[#343E4F]">
            2.8M ETB
          </p>
        </div>
      </div>

      {/* Alerts */}
      <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className="flex items-center gap-4 rounded-2xl border border-yellow-100 bg-yellow-50 p-5">
          <div className="rounded-xl bg-yellow-100 p-3">
            <Clock
              size={22}
              className="text-yellow-600"
            />
          </div>

          <div>
            <p className="font-semibold text-yellow-800">
              Pending Orders
            </p>

            <p className="text-sm text-yellow-700">
              8 orders need attention.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4 rounded-2xl border border-blue-100 bg-blue-50 p-5">
          <div className="rounded-xl bg-blue-100 p-3">
            <UserPlus
              size={22}
              className="text-blue-600"
            />
          </div>

          <div>
            <p className="font-semibold text-blue-800">
              New Users
            </p>

            <p className="text-sm text-blue-700">
              24 users registered recently.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4 rounded-2xl border border-red-100 bg-red-50 p-5">
          <div className="rounded-xl bg-red-100 p-3">
            <AlertCircle
              size={22}
              className="text-red-600"
            />
          </div>

          <div>
            <p className="font-semibold text-red-800">
              Low Stock
            </p>

            <p className="text-sm text-red-700">
              12 products have low stock.
            </p>
          </div>
        </div>
      </div>

      {/* Recent Orders + Quick Actions */}
      <div className="mb-8 grid grid-cols-1 gap-6 xl:grid-cols-3">
        {/* Recent Orders */}
        <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm xl:col-span-2">
          <div className="flex items-center justify-between border-b border-gray-100 p-6">
            <div>
              <h2 className="font-bold text-[#343E4F]">
                Recent Orders
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Latest orders across the marketplace.
              </p>
            </div>

            <Link
              to="/admin/orders"
              className="flex items-center gap-1 text-sm font-semibold text-[#E57036] hover:underline"
            >
              View All
              <ArrowRight size={16} />
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[700px]">
              <thead className="bg-gray-50 text-left text-xs uppercase text-gray-500">
                <tr>
                  <th className="px-6 py-4">
                    Order
                  </th>

                  <th className="px-6 py-4">
                    Customer
                  </th>

                  <th className="px-6 py-4">
                    Product
                  </th>

                  <th className="px-6 py-4">
                    Amount
                  </th>

                  <th className="px-6 py-4">
                    Status
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-100">
                {recentOrders.map((order) => (
                  <tr
                    key={order.id}
                    className="hover:bg-gray-50"
                  >
                    <td className="px-6 py-4">
                      <p className="font-semibold text-[#343E4F]">
                        {order.id}
                      </p>

                      <p className="text-xs text-gray-400">
                        {order.date}
                      </p>
                    </td>

                    <td className="px-6 py-4 text-sm text-gray-600">
                      {order.customer}
                    </td>

                    <td className="px-6 py-4 text-sm text-gray-600">
                      {order.product}
                    </td>

                    <td className="px-6 py-4 text-sm font-semibold text-[#343E4F]">
                      {order.amount.toLocaleString()} ETB
                    </td>

                    <td className="px-6 py-4">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${getOrderStatusStyle(
                          order.status
                        )}`}
                      >
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
          <h2 className="font-bold text-[#343E4F]">
            Quick Actions
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Manage important platform areas.
          </p>

          <div className="mt-5 space-y-3">
            <Link
              to="/admin/users"
              className="flex items-center justify-between rounded-xl border border-gray-100 p-4 transition hover:border-blue-200 hover:bg-blue-50"
            >
              <div className="flex items-center gap-3">
                <Users
                  size={20}
                  className="text-blue-600"
                />

                <span className="text-sm font-semibold text-gray-700">
                  Manage Users
                </span>
              </div>

              <ArrowRight
                size={18}
                className="text-gray-400"
              />
            </Link>

            <Link
              to="/admin/products"
              className="flex items-center justify-between rounded-xl border border-gray-100 p-4 transition hover:border-orange-200 hover:bg-orange-50"
            >
              <div className="flex items-center gap-3">
                <Package
                  size={20}
                  className="text-orange-600"
                />

                <span className="text-sm font-semibold text-gray-700">
                  Manage Products
                </span>
              </div>

              <ArrowRight
                size={18}
                className="text-gray-400"
              />
            </Link>

            <Link
              to="/admin/orders"
              className="flex items-center justify-between rounded-xl border border-gray-100 p-4 transition hover:border-purple-200 hover:bg-purple-50"
            >
              <div className="flex items-center gap-3">
                <ShoppingCart
                  size={20}
                  className="text-purple-600"
                />

                <span className="text-sm font-semibold text-gray-700">
                  Manage Orders
                </span>
              </div>

              <ArrowRight
                size={18}
                className="text-gray-400"
              />
            </Link>

            <Link
              to="/admin/deliveries"
              className="flex items-center justify-between rounded-xl border border-gray-100 p-4 transition hover:border-green-200 hover:bg-green-50"
            >
              <div className="flex items-center gap-3">
                <Truck
                  size={20}
                  className="text-green-600"
                />

                <span className="text-sm font-semibold text-gray-700">
                  Manage Deliveries
                </span>
              </div>

              <ArrowRight
                size={18}
                className="text-gray-400"
              />
            </Link>
          </div>
        </div>
      </div>

      {/* Users */}
      <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
        <div className="border-b border-gray-100 p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="font-bold text-[#343E4F]">
                Recent Users
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Recently registered platform users.
              </p>
            </div>

            <div className="relative w-full sm:w-72">
              <Search
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <input
                type="text"
                placeholder="Search users..."
                value={search}
                onChange={(e) =>
                  setSearch(e.target.value)
                }
                className="w-full rounded-xl border border-gray-200 py-2.5 pl-10 pr-4 text-sm outline-none transition focus:border-[#E57036] focus:ring-2 focus:ring-[#E57036]/20"
              />
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[700px]">
            <thead className="bg-gray-50 text-left text-xs uppercase text-gray-500">
              <tr>
                <th className="px-6 py-4">
                  User
                </th>

                <th className="px-6 py-4">
                  Email
                </th>

                <th className="px-6 py-4">
                  Role
                </th>

                <th className="px-6 py-4">
                  Status
                </th>

                <th className="px-6 py-4 text-right">
                  Action
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">
              {filteredUsers.map((user) => (
                <tr
                  key={user.id}
                  className="transition hover:bg-gray-50"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#343E4F] text-sm font-bold text-white">
                        {user.name
                          .split(" ")
                          .map((word) => word[0])
                          .slice(0, 2)
                          .join("")}
                      </div>

                      <span className="font-semibold text-[#343E4F]">
                        {user.name}
                      </span>
                    </div>
                  </td>

                  <td className="px-6 py-4 text-sm text-gray-500">
                    {user.email}
                  </td>

                  <td className="px-6 py-4">
                    <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-600">
                      {user.role}
                    </span>
                  </td>

                  <td className="px-6 py-4">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${getUserStatusStyle(
                        user.status
                      )}`}
                    >
                      {user.status}
                    </span>
                  </td>

                  <td className="px-6 py-4 text-right">
                    <button className="inline-flex items-center gap-1 text-sm font-semibold text-[#E57036] hover:underline">
                      View
                      <ArrowRight size={15} />
                    </button>
                  </td>
                </tr>
              ))}

              {filteredUsers.length === 0 && (
                <tr>
                  <td
                    colSpan="5"
                    className="px-6 py-10 text-center text-sm text-gray-400"
                  >
                    No users found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Footer note */}
      <div className="mt-6 flex items-center gap-2 text-xs text-gray-400">
        <CheckCircle size={15} />
        Dashboard currently uses frontend demo data and will
        be connected to the backend later.
      </div>
    </div>
  );
}

export default Dashboard;