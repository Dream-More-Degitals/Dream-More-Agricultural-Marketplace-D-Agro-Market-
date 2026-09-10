import { useEffect, useMemo, useState } from "react";
import {
  Search,
  Package,
  Clock,
  CheckCircle,
  Truck,
  XCircle,
  Eye,
  X,
  MapPin,
  Phone,
  User,
  Calendar,
  CreditCard,
  ShoppingBag,
} from "lucide-react";

const STATUS_OPTIONS = [
  "All",
  "Processing",
  "Confirmed",
  "Shipped",
  "Out for Delivery",
  "Delivered",
  "Cancelled",
];

const statusStyles = {
  Processing: {
    className: "bg-yellow-100 text-yellow-700",
    icon: Clock,
  },
  Confirmed: {
    className: "bg-blue-100 text-blue-700",
    icon: CheckCircle,
  },
  Shipped: {
    className: "bg-purple-100 text-purple-700",
    icon: Truck,
  },
  "Out for Delivery": {
    className: "bg-orange-100 text-orange-700",
    icon: Truck,
  },
  Delivered: {
    className: "bg-green-100 text-green-700",
    icon: CheckCircle,
  },
  Cancelled: {
    className: "bg-red-100 text-red-700",
    icon: XCircle,
  },
};

function getOrders() {
  try {
    const saved = localStorage.getItem("orders");
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
}

export default function SupplierOrders() {
  const [orders, setOrders] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    setOrders(getOrders());

    const refreshOrders = () => {
      setOrders(getOrders());
    };

    window.addEventListener("storage", refreshOrders);
    window.addEventListener("ordersUpdated", refreshOrders);

    return () => {
      window.removeEventListener("storage", refreshOrders);
      window.removeEventListener("ordersUpdated", refreshOrders);
    };
  }, []);

  // Only show orders containing Supplier products
  const supplierOrders = useMemo(() => {
    return orders
      .map((order) => {
        const supplierItems = (order.items || []).filter(
          (item) =>
            item.seller === "Supplier" ||
            item.sellerType === "Supplier"
        );

        if (supplierItems.length === 0) {
          return null;
        }

        const supplierSubtotal = supplierItems.reduce((total, item) => {
          return (
            total +
            Number(item.price || 0) * Number(item.quantity || 0)
          );
        }, 0);

        return {
          ...order,
          supplierItems,
          supplierSubtotal,
        };
      })
      .filter(Boolean);
  }, [orders]);

  const filteredOrders = useMemo(() => {
    return supplierOrders.filter((order) => {
      const orderId = String(order.id || "").toLowerCase();
      const customerName = String(
        order.customer?.fullName || ""
      ).toLowerCase();

      const matchesSearch =
        orderId.includes(search.toLowerCase()) ||
        customerName.includes(search.toLowerCase());

      const matchesStatus =
        statusFilter === "All" || order.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [supplierOrders, search, statusFilter]);

  const stats = useMemo(() => {
    return {
      total: supplierOrders.length,

      processing: supplierOrders.filter(
        (order) => order.status === "Processing"
      ).length,

      shipped: supplierOrders.filter(
        (order) =>
          order.status === "Shipped" ||
          order.status === "Out for Delivery"
      ).length,

      delivered: supplierOrders.filter(
        (order) => order.status === "Delivered"
      ).length,

      cancelled: supplierOrders.filter(
        (order) => order.status === "Cancelled"
      ).length,
    };
  }, [supplierOrders]);

  const updateOrderStatus = (orderId, newStatus) => {
    const updatedOrders = orders.map((order) =>
      order.id === orderId
        ? {
            ...order,
            status: newStatus,
          }
        : order
    );

    localStorage.setItem("orders", JSON.stringify(updatedOrders));
    setOrders(updatedOrders);

    const updatedOrder = updatedOrders.find(
      (order) => order.id === orderId
    );

    if (updatedOrder) {
      setSelectedOrder(updatedOrder);
    }

    window.dispatchEvent(new Event("ordersUpdated"));
  };

  const getStatusStyle = (status) => {
    return (
      statusStyles[status] || {
        className: "bg-gray-100 text-gray-700",
        icon: Package,
      }
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[#343E4F] sm:text-3xl">
          Supplier Orders
        </h1>

        <p className="mt-1 text-sm text-gray-500">
          Manage orders containing your supplier products.
        </p>
      </div>

      {/* Stats */}
      <div className="mb-6 grid grid-cols-2 gap-4 lg:grid-cols-5">
        <StatCard
          title="Total Orders"
          value={stats.total}
          icon={ShoppingBag}
        />

        <StatCard
          title="Processing"
          value={stats.processing}
          icon={Clock}
        />

        <StatCard
          title="Shipped"
          value={stats.shipped}
          icon={Truck}
        />

        <StatCard
          title="Delivered"
          value={stats.delivered}
          icon={CheckCircle}
        />

        <StatCard
          title="Cancelled"
          value={stats.cancelled}
          icon={XCircle}
        />
      </div>

      {/* Search + Filter */}
      <div className="mb-6 flex flex-col gap-3 rounded-2xl bg-white p-4 shadow-sm md:flex-row">
        <div className="relative flex-1">
          <Search
            size={20}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            type="text"
            placeholder="Search order ID or customer..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-xl border border-gray-200 py-3 pl-10 pr-4 text-sm outline-none transition focus:border-[#E57036]"
          />
        </div>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none focus:border-[#E57036]"
        >
          {STATUS_OPTIONS.map((status) => (
            <option key={status} value={status}>
              {status === "All" ? "All Statuses" : status}
            </option>
          ))}
        </select>
      </div>

      {/* Orders */}
      {filteredOrders.length === 0 ? (
        <div className="rounded-2xl bg-white p-10 text-center shadow-sm">
          <Package
            size={48}
            className="mx-auto mb-4 text-gray-300"
          />

          <h2 className="text-lg font-semibold text-[#343E4F]">
            No supplier orders found
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Orders containing your supplier products will appear here.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredOrders.map((order) => {
            const status = getStatusStyle(order.status);
            const StatusIcon = status.icon;

            return (
              <div
                key={order.id}
                className="rounded-2xl bg-white p-4 shadow-sm transition hover:shadow-md sm:p-5"
              >
                <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                  {/* Order information */}
                  <div className="flex-1">
                    <div className="mb-3 flex flex-wrap items-center gap-2">
                      <span className="font-bold text-[#343E4F]">
                        {order.id}
                      </span>

                      <span
                        className={`flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold ${status.className}`}
                      >
                        <StatusIcon size={14} />
                        {order.status}
                      </span>
                    </div>

                    <div className="grid gap-2 text-sm text-gray-500 sm:grid-cols-2 lg:grid-cols-4">
                      <div className="flex items-center gap-2">
                        <User size={16} />
                        <span>
                          {order.customer?.fullName ||
                            "Customer"}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <Calendar size={16} />
                        <span>
                          {order.date ||
                            (order.createdAt
                              ? new Date(
                                  order.createdAt
                                ).toLocaleDateString()
                              : "N/A")}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <Package size={16} />
                        <span>
                          {order.supplierItems.length} product
                          {order.supplierItems.length !== 1
                            ? "s"
                            : ""}
                        </span>
                      </div>

                      <div className="font-semibold text-[#E57036]">
                        {Number(
                          order.supplierSubtotal || 0
                        ).toLocaleString()}{" "}
                        ETB
                      </div>
                    </div>
                  </div>

                  {/* View button */}
                  <button
                    onClick={() => setSelectedOrder(order)}
                    className="flex items-center justify-center gap-2 rounded-xl bg-[#343E4F] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#28313f]"
                  >
                    <Eye size={18} />
                    View Details
                  </button>
                </div>

                {/* Product preview */}
                <div className="mt-4 flex gap-3 overflow-x-auto border-t border-gray-100 pt-4">
                  {order.supplierItems.map((item) => (
                    <div
                      key={item.id || item.slug || item.name}
                      className="flex min-w-[220px] items-center gap-3 rounded-xl bg-gray-50 p-3"
                    >
                      <img
                        src={
                          item.image ||
                          "/images/product-placeholder.jpg"
                        }
                        alt={item.name}
                        className="h-14 w-14 rounded-lg object-cover"
                        onError={(e) => {
                          e.currentTarget.src =
                            "/images/product-placeholder.jpg";
                        }}
                      />

                      <div className="min-w-0">
                        <p className="truncate text-sm font-semibold text-[#343E4F]">
                          {item.name}
                        </p>

                        <p className="text-xs text-gray-500">
                          Qty: {item.quantity}
                        </p>

                        <p className="text-xs font-semibold text-[#E57036]">
                          {(
                            Number(item.price || 0) *
                            Number(item.quantity || 0)
                          ).toLocaleString()}{" "}
                          ETB
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Order Details Modal */}
      {selectedOrder && (
        <OrderDetailsModal
          order={selectedOrder}
          onClose={() => setSelectedOrder(null)}
          onUpdateStatus={updateOrderStatus}
        />
      )}
    </div>
  );
}

/* =========================
   STAT CARD
========================= */

function StatCard({ title, value, icon: Icon }) {
  return (
    <div className="rounded-2xl bg-white p-4 shadow-sm">
      <div className="mb-3 flex items-center justify-between">
        <div className="rounded-xl bg-[#343E4F]/10 p-2">
          <Icon size={20} className="text-[#343E4F]" />
        </div>
      </div>

      <p className="text-xs text-gray-500">{title}</p>

      <p className="mt-1 text-2xl font-bold text-[#343E4F]">
        {value}
      </p>
    </div>
  );
}

/* =========================
   ORDER DETAILS MODAL
========================= */

function OrderDetailsModal({
  order,
  onClose,
  onUpdateStatus,
}) {
  const customer = order.customer || {};

  const supplierTotal = order.supplierItems.reduce(
    (total, item) =>
      total +
      Number(item.price || 0) * Number(item.quantity || 0),
    0
  );

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      onClick={onClose}
    >
      <div
        className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl bg-white shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-gray-100 bg-white p-5">
          <div>
            <h2 className="text-xl font-bold text-[#343E4F]">
              Order Details
            </h2>

            <p className="text-sm text-gray-500">
              {order.id}
            </p>
          </div>

          <button
            onClick={onClose}
            className="rounded-full p-2 text-gray-500 transition hover:bg-gray-100"
          >
            <X size={22} />
          </button>
        </div>

        <div className="space-y-6 p-5">
          {/* Customer */}
          <section>
            <h3 className="mb-3 font-semibold text-[#343E4F]">
              Customer Information
            </h3>

            <div className="grid gap-3 rounded-xl bg-gray-50 p-4 sm:grid-cols-2">
              <InfoRow
                icon={User}
                label="Name"
                value={customer.fullName || "N/A"}
              />

              <InfoRow
                icon={Phone}
                label="Phone"
                value={customer.phone || "N/A"}
              />

              <InfoRow
                icon={MapPin}
                label="Region"
                value={customer.region || "N/A"}
              />

              <InfoRow
                icon={MapPin}
                label="City"
                value={customer.city || "N/A"}
              />

              <div className="sm:col-span-2">
                <InfoRow
                  icon={MapPin}
                  label="Address"
                  value={customer.address || "N/A"}
                />
              </div>
            </div>
          </section>

          {/* Supplier Products */}
          <section>
            <h3 className="mb-3 font-semibold text-[#343E4F]">
              Your Products in This Order
            </h3>

            <div className="space-y-3">
              {order.supplierItems.map((item) => (
                <div
                  key={item.id || item.slug || item.name}
                  className="flex gap-3 rounded-xl border border-gray-100 p-3"
                >
                  <img
                    src={
                      item.image ||
                      "/images/product-placeholder.jpg"
                    }
                    alt={item.name}
                    className="h-20 w-20 rounded-lg object-cover"
                    onError={(e) => {
                      e.currentTarget.src =
                        "/images/product-placeholder.jpg";
                    }}
                  />

                  <div className="flex-1">
                    <h4 className="font-semibold text-[#343E4F]">
                      {item.name}
                    </h4>

                    <p className="text-sm text-gray-500">
                      Category: {item.category || "N/A"}
                    </p>

                    <p className="text-sm text-gray-500">
                      Quantity: {item.quantity}{" "}
                      {item.unit || ""}
                    </p>

                    <p className="text-sm font-semibold text-[#E57036]">
                      {Number(item.price || 0).toLocaleString()}{" "}
                      ETB / {item.unit || "unit"}
                    </p>
                  </div>

                  <div className="text-right">
                    <p className="text-sm text-gray-500">
                      Total
                    </p>

                    <p className="font-bold text-[#343E4F]">
                      {(
                        Number(item.price || 0) *
                        Number(item.quantity || 0)
                      ).toLocaleString()}{" "}
                      ETB
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Delivery + Payment */}
          <section className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl bg-gray-50 p-4">
              <div className="mb-2 flex items-center gap-2">
                <Truck
                  size={18}
                  className="text-[#E57036]"
                />

                <h3 className="font-semibold text-[#343E4F]">
                  Delivery
                </h3>
              </div>

              <p className="text-sm text-gray-600">
                Method:{" "}
                <span className="font-medium">
                  {order.deliveryMethod || "Standard"}
                </span>
              </p>
            </div>

            <div className="rounded-xl bg-gray-50 p-4">
              <div className="mb-2 flex items-center gap-2">
                <CreditCard
                  size={18}
                  className="text-[#E57036]"
                />

                <h3 className="font-semibold text-[#343E4F]">
                  Payment
                </h3>
              </div>

              <p className="text-sm text-gray-600">
                Method:{" "}
                <span className="font-medium">
                  {order.paymentMethod || "Cash"}
                </span>
              </p>
            </div>
          </section>

          {/* Total */}
          <div className="rounded-xl bg-[#343E4F] p-4 text-white">
            <div className="flex items-center justify-between">
              <span>Supplier Products Total</span>

              <span className="text-xl font-bold">
                {supplierTotal.toLocaleString()} ETB
              </span>
            </div>
          </div>

          {/* Update Status */}
          <section>
            <h3 className="mb-3 font-semibold text-[#343E4F]">
              Update Order Status
            </h3>

            <div className="flex flex-wrap gap-2">
              {STATUS_OPTIONS.filter(
                (status) => status !== "All"
              ).map((status) => (
                <button
                  key={status}
                  onClick={() =>
                    onUpdateStatus(order.id, status)
                  }
                  className={`rounded-lg px-3 py-2 text-sm font-medium transition ${
                    order.status === status
                      ? "bg-[#E57036] text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

/* =========================
   INFO ROW
========================= */

function InfoRow({ icon: Icon, label, value }) {
  return (
    <div className="flex items-start gap-2">
      <Icon
        size={17}
        className="mt-0.5 shrink-0 text-[#E57036]"
      />

      <div>
        <p className="text-xs text-gray-400">{label}</p>

        <p className="text-sm font-medium text-gray-700">
          {value}
        </p>
      </div>
    </div>
  );
}