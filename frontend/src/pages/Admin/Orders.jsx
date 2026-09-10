import { useMemo, useState } from "react";
import {
  Search,
  Eye,
  X,
  Package,
  Truck,
  CheckCircle,
  Clock,
  XCircle,
} from "lucide-react";

const demoOrders = [
  {
    id: "ORD-1001",
    customer: "Abebe Kebede",
    phone: "0911223344",
    product: "White Teff (Magna)",
    quantity: 20,
    total: 3600,
    payment: "Telebirr",
    status: "Processing",
    date: "09/09/2026",
    address: "Jimma, Oromia",
  },
  {
    id: "ORD-1002",
    customer: "Hanna Ali",
    phone: "0922334455",
    product: "Yirgacheffe Coffee",
    quantity: 5,
    total: 4250,
    payment: "Cash on Delivery",
    status: "Confirmed",
    date: "08/09/2026",
    address: "Addis Ababa",
  },
  {
    id: "ORD-1003",
    customer: "Mohammed Ahmed",
    phone: "0933445566",
    product: "Red Onions",
    quantity: 30,
    total: 3600,
    payment: "Telebirr",
    status: "In Transit",
    date: "07/09/2026",
    address: "Adama, Oromia",
  },
  {
    id: "ORD-1004",
    customer: "Fatuma Omar",
    phone: "0944556677",
    product: "Niger Seed Oil",
    quantity: 10,
    total: 4500,
    payment: "Cash on Delivery",
    status: "Delivered",
    date: "06/09/2026",
    address: "Dire Dawa",
  },
  {
    id: "ORD-1005",
    customer: "Dawit Tesfaye",
    phone: "0955667788",
    product: "Maize Seeds",
    quantity: 15,
    total: 18000,
    payment: "Telebirr",
    status: "Cancelled",
    date: "05/09/2026",
    address: "Bahir Dar, Amhara",
  },
];

const statusOptions = [
  "Processing",
  "Confirmed",
  "Preparing",
  "In Transit",
  "Delivered",
  "Cancelled",
];

function Orders() {
  const [orders, setOrders] = useState(demoOrders);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [selectedOrder, setSelectedOrder] = useState(null);

  const filteredOrders = useMemo(() => {
    const query = search.toLowerCase();

    return orders.filter((order) => {
      const matchesSearch =
        order.id.toLowerCase().includes(query) ||
        order.customer.toLowerCase().includes(query) ||
        order.product.toLowerCase().includes(query) ||
        order.address.toLowerCase().includes(query);

      const matchesStatus =
        statusFilter === "All" ||
        order.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [orders, search, statusFilter]);

  const updateStatus = (id, newStatus) => {
    setOrders((prev) =>
      prev.map((order) =>
        order.id === id
          ? { ...order, status: newStatus }
          : order
      )
    );

    if (selectedOrder?.id === id) {
      setSelectedOrder((prev) => ({
        ...prev,
        status: newStatus,
      }));
    }
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case "Processing":
        return "bg-blue-100 text-blue-700";

      case "Confirmed":
        return "bg-indigo-100 text-indigo-700";

      case "Preparing":
        return "bg-yellow-100 text-yellow-700";

      case "In Transit":
        return "bg-orange-100 text-orange-700";

      case "Delivered":
        return "bg-green-100 text-green-700";

      case "Cancelled":
        return "bg-red-100 text-red-700";

      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "Processing":
        return <Clock size={15} />;

      case "Confirmed":
        return <CheckCircle size={15} />;

      case "Preparing":
        return <Package size={15} />;

      case "In Transit":
        return <Truck size={15} />;

      case "Delivered":
        return <CheckCircle size={15} />;

      case "Cancelled":
        return <XCircle size={15} />;

      default:
        return null;
    }
  };

  const totalOrders = orders.length;

  const processingOrders = orders.filter(
    (order) => order.status === "Processing"
  ).length;

  const transitOrders = orders.filter(
    (order) => order.status === "In Transit"
  ).length;

  const deliveredOrders = orders.filter(
    (order) => order.status === "Delivered"
  ).length;

  const totalRevenue = orders
    .filter((order) => order.status !== "Cancelled")
    .reduce(
      (sum, order) => sum + Number(order.total),
      0
    );

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-[#343E4F] sm:text-3xl">
          Order Management
        </h1>

        <p className="mt-1 text-sm text-gray-500">
          Monitor and manage marketplace orders.
        </p>
      </div>

      {/* Statistics */}
      <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
        <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
          <p className="text-sm text-gray-500">
            Total Orders
          </p>

          <p className="mt-2 text-2xl font-bold text-[#343E4F]">
            {totalOrders}
          </p>
        </div>

        <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
          <p className="text-sm text-gray-500">
            Processing
          </p>

          <p className="mt-2 text-2xl font-bold text-blue-600">
            {processingOrders}
          </p>
        </div>

        <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
          <p className="text-sm text-gray-500">
            In Transit
          </p>

          <p className="mt-2 text-2xl font-bold text-orange-600">
            {transitOrders}
          </p>
        </div>

        <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
          <p className="text-sm text-gray-500">
            Delivered
          </p>

          <p className="mt-2 text-2xl font-bold text-green-600">
            {deliveredOrders}
          </p>
        </div>

        <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
          <p className="text-sm text-gray-500">
            Revenue
          </p>

          <p className="mt-2 text-xl font-bold text-[#343E4F]">
            {totalRevenue.toLocaleString()} ETB
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="mb-6 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {/* Search */}
          <div className="relative">
            <Search
              size={19}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              type="text"
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              placeholder="Search order, customer or product..."
              className="w-full rounded-xl border border-gray-200 py-3 pl-11 pr-4 text-sm outline-none focus:border-[#E57036] focus:ring-2 focus:ring-[#E57036]/20"
            />
          </div>

          {/* Status */}
          <select
            value={statusFilter}
            onChange={(e) =>
              setStatusFilter(e.target.value)
            }
            className="rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-600 outline-none focus:border-[#E57036] focus:ring-2 focus:ring-[#E57036]/20"
          >
            <option value="All">
              All Statuses
            </option>

            {statusOptions.map((status) => (
              <option
                key={status}
                value={status}
              >
                {status}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Orders */}
      <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
        <div className="border-b border-gray-100 p-6">
          <h2 className="font-bold text-[#343E4F]">
            Marketplace Orders
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            {filteredOrders.length} order
            {filteredOrders.length !== 1
              ? "s"
              : ""}{" "}
            found.
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[1000px]">
            <thead className="bg-[#343E4F] text-left text-xs uppercase text-white">
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
                  Total
                </th>

                <th className="px-6 py-4">
                  Payment
                </th>

                <th className="px-6 py-4">
                  Status
                </th>

                <th className="px-6 py-4">
                  Date
                </th>

                <th className="px-6 py-4 text-right">
                  Action
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">
              {filteredOrders.map((order) => (
                <tr
                  key={order.id}
                  className="transition hover:bg-gray-50"
                >
                  <td className="px-6 py-4">
                    <p className="font-semibold text-[#343E4F]">
                      {order.id}
                    </p>
                  </td>

                  <td className="px-6 py-4">
                    <p className="font-medium text-gray-700">
                      {order.customer}
                    </p>

                    <p className="text-xs text-gray-400">
                      {order.phone}
                    </p>
                  </td>

                  <td className="px-6 py-4">
                    <p className="text-sm font-medium text-gray-700">
                      {order.product}
                    </p>

                    <p className="text-xs text-gray-400">
                      Quantity: {order.quantity}
                    </p>
                  </td>

                  <td className="px-6 py-4 text-sm font-bold text-[#343E4F]">
                    {Number(
                      order.total
                    ).toLocaleString()}{" "}
                    ETB
                  </td>

                  <td className="px-6 py-4 text-sm text-gray-600">
                    {order.payment}
                  </td>

                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${getStatusStyle(
                        order.status
                      )}`}
                    >
                      {getStatusIcon(order.status)}
                      {order.status}
                    </span>
                  </td>

                  <td className="px-6 py-4 text-sm text-gray-500">
                    {order.date}
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex justify-end">
                      <button
                        onClick={() =>
                          setSelectedOrder(order)
                        }
                        className="flex items-center gap-2 rounded-lg bg-gray-100 px-3 py-2 text-sm font-semibold text-[#343E4F] hover:bg-gray-200"
                      >
                        <Eye size={16} />
                        View
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {filteredOrders.length === 0 && (
                <tr>
                  <td
                    colSpan="8"
                    className="px-6 py-12 text-center"
                  >
                    <Package
                      size={42}
                      className="mx-auto mb-3 text-gray-300"
                    />

                    <p className="font-semibold text-gray-500">
                      No orders found
                    </p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Order Details Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white shadow-2xl">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-gray-100 p-6">
              <div>
                <h2 className="text-xl font-bold text-[#343E4F]">
                  Order Details
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  {selectedOrder.id}
                </p>
              </div>

              <button
                onClick={() =>
                  setSelectedOrder(null)
                }
                className="rounded-lg p-2 text-gray-500 hover:bg-gray-100"
              >
                <X size={20} />
              </button>
            </div>

            <div className="space-y-6 p-6">
              {/* Status */}
              <div className="rounded-xl bg-gray-50 p-5">
                <p className="mb-3 text-sm font-semibold text-gray-500">
                  Order Status
                </p>

                <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                  <select
                    value={selectedOrder.status}
                    onChange={(e) =>
                      updateStatus(
                        selectedOrder.id,
                        e.target.value
                      )
                    }
                    className="rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none focus:border-[#E57036]"
                  >
                    {statusOptions.map(
                      (status) => (
                        <option
                          key={status}
                          value={status}
                        >
                          {status}
                        </option>
                      )
                    )}
                  </select>

                  <span
                    className={`inline-flex w-fit items-center gap-1.5 rounded-full px-3 py-2 text-xs font-semibold ${getStatusStyle(
                      selectedOrder.status
                    )}`}
                  >
                    {getStatusIcon(
                      selectedOrder.status
                    )}

                    {selectedOrder.status}
                  </span>
                </div>
              </div>

              {/* Customer */}
              <div>
                <h3 className="mb-3 font-bold text-[#343E4F]">
                  Customer Information
                </h3>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="rounded-xl bg-gray-50 p-4">
                    <p className="text-xs text-gray-400">
                      Name
                    </p>

                    <p className="mt-1 font-semibold text-gray-700">
                      {selectedOrder.customer}
                    </p>
                  </div>

                  <div className="rounded-xl bg-gray-50 p-4">
                    <p className="text-xs text-gray-400">
                      Phone
                    </p>

                    <p className="mt-1 font-semibold text-gray-700">
                      {selectedOrder.phone}
                    </p>
                  </div>

                  <div className="rounded-xl bg-gray-50 p-4 sm:col-span-2">
                    <p className="text-xs text-gray-400">
                      Delivery Address
                    </p>

                    <p className="mt-1 font-semibold text-gray-700">
                      {selectedOrder.address}
                    </p>
                  </div>
                </div>
              </div>

              {/* Order */}
              <div>
                <h3 className="mb-3 font-bold text-[#343E4F]">
                  Order Information
                </h3>

                <div className="rounded-xl border border-gray-100">
                  <div className="flex items-center justify-between border-b border-gray-100 p-4">
                    <span className="text-sm text-gray-500">
                      Product
                    </span>

                    <span className="font-semibold text-gray-700">
                      {selectedOrder.product}
                    </span>
                  </div>

                  <div className="flex items-center justify-between border-b border-gray-100 p-4">
                    <span className="text-sm text-gray-500">
                      Quantity
                    </span>

                    <span className="font-semibold text-gray-700">
                      {selectedOrder.quantity}
                    </span>
                  </div>

                  <div className="flex items-center justify-between border-b border-gray-100 p-4">
                    <span className="text-sm text-gray-500">
                      Payment
                    </span>

                    <span className="font-semibold text-gray-700">
                      {selectedOrder.payment}
                    </span>
                  </div>

                  <div className="flex items-center justify-between p-4">
                    <span className="font-semibold text-gray-600">
                      Total
                    </span>

                    <span className="text-xl font-bold text-[#E57036]">
                      {Number(
                        selectedOrder.total
                      ).toLocaleString()}{" "}
                      ETB
                    </span>
                  </div>
                </div>
              </div>

              {/* Close */}
              <button
                onClick={() =>
                  setSelectedOrder(null)
                }
                className="w-full rounded-xl border border-gray-200 py-3 font-semibold text-gray-600 hover:bg-gray-50"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="mt-6 text-xs text-gray-400">
        Order data is currently frontend demo data. It will be
        connected to the backend and database later.
      </div>
    </div>
  );
}

export default Orders;