import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Package,
  Clock,
  CheckCircle,
  Truck,
  XCircle,
  Eye,
  ShoppingBag,
  ArrowLeft,
  X,
} from "lucide-react";

function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [filter, setFilter] = useState("All");

  // Load orders
  const loadOrders = () => {
    try {
      const savedOrders =
        JSON.parse(localStorage.getItem("orders")) || [];

      setOrders(Array.isArray(savedOrders) ? savedOrders : []);
    } catch (error) {
      console.error("Failed to load orders:", error);
      setOrders([]);
    }
  };

  useEffect(() => {
    loadOrders();

    const handleStorage = (event) => {
      if (event.key === "orders") {
        loadOrders();
      }
    };

    window.addEventListener("storage", handleStorage);

    return () => {
      window.removeEventListener("storage", handleStorage);
    };
  }, []);

  // Status helper
  const getStatusStyle = (status) => {
    switch (status?.toLowerCase()) {
      case "processing":
        return "bg-blue-50 text-blue-600";

      case "confirmed":
        return "bg-purple-50 text-purple-600";

      case "shipped":
        return "bg-orange-50 text-orange-600";

      case "out for delivery":
        return "bg-yellow-50 text-yellow-600";

      case "delivered":
        return "bg-green-50 text-green-600";

      case "cancelled":
        return "bg-red-50 text-red-600";

      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  // Status icon
  const getStatusIcon = (status) => {
    switch (status?.toLowerCase()) {
      case "processing":
        return <Clock size={15} />;

      case "confirmed":
        return <CheckCircle size={15} />;

      case "shipped":
        return <Truck size={15} />;

      case "out for delivery":
        return <Truck size={15} />;

      case "delivered":
        return <CheckCircle size={15} />;

      case "cancelled":
        return <XCircle size={15} />;

      default:
        return <Package size={15} />;
    }
  };

  // Filter orders
  const filteredOrders =
    filter === "All"
      ? orders
      : orders.filter((order) => order.status === filter);

  // Statistics
  const totalOrders = orders.length;

  const processingOrders = orders.filter(
    (order) =>
      order.status === "Processing" ||
      order.status === "Confirmed"
  ).length;

  const shippedOrders = orders.filter(
    (order) =>
      order.status === "Shipped" ||
      order.status === "Out for Delivery"
  ).length;

  const deliveredOrders = orders.filter(
    (order) => order.status === "Delivered"
  ).length;

  const cancelledOrders = orders.filter(
    (order) => order.status === "Cancelled"
  ).length;

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <Link
            to="/buyer/marketplace"
            className="mb-3 inline-flex items-center gap-2 text-sm font-medium text-gray-500 transition hover:text-[#E57036]"
          >
            <ArrowLeft size={17} />
            Continue Shopping
          </Link>

          <h1 className="text-2xl font-bold text-[#343E4F] sm:text-3xl">
            My Orders
          </h1>

          <p className="mt-1 text-gray-500">
            View and track your orders.
          </p>
        </div>

        {/* Statistics */}
        <div className="mb-6 grid grid-cols-2 gap-4 lg:grid-cols-5">
          {/* Total */}
          <div className="rounded-2xl bg-white p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">
                  Total Orders
                </p>
                <p className="mt-1 text-2xl font-bold text-[#343E4F]">
                  {totalOrders}
                </p>
              </div>

              <div className="rounded-xl bg-[#343E4F]/10 p-3">
                <Package
                  size={21}
                  className="text-[#343E4F]"
                />
              </div>
            </div>
          </div>

          {/* Processing */}
          <div className="rounded-2xl bg-white p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">
                  Processing
                </p>
                <p className="mt-1 text-2xl font-bold text-blue-600">
                  {processingOrders}
                </p>
              </div>

              <div className="rounded-xl bg-blue-50 p-3">
                <Clock
                  size={21}
                  className="text-blue-600"
                />
              </div>
            </div>
          </div>

          {/* Shipped */}
          <div className="rounded-2xl bg-white p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">
                  Shipped
                </p>
                <p className="mt-1 text-2xl font-bold text-orange-500">
                  {shippedOrders}
                </p>
              </div>

              <div className="rounded-xl bg-orange-50 p-3">
                <Truck
                  size={21}
                  className="text-orange-500"
                />
              </div>
            </div>
          </div>

          {/* Delivered */}
          <div className="rounded-2xl bg-white p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">
                  Delivered
                </p>
                <p className="mt-1 text-2xl font-bold text-green-600">
                  {deliveredOrders}
                </p>
              </div>

              <div className="rounded-xl bg-green-50 p-3">
                <CheckCircle
                  size={21}
                  className="text-green-600"
                />
              </div>
            </div>
          </div>

          {/* Cancelled */}
          <div className="rounded-2xl bg-white p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">
                  Cancelled
                </p>
                <p className="mt-1 text-2xl font-bold text-red-500">
                  {cancelledOrders}
                </p>
              </div>

              <div className="rounded-xl bg-red-50 p-3">
                <XCircle
                  size={21}
                  className="text-red-500"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Filter */}
        <div className="mb-5 flex flex-wrap gap-2">
          {[
            "All",
            "Processing",
            "Confirmed",
            "Shipped",
            "Out for Delivery",
            "Delivered",
            "Cancelled",
          ].map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`rounded-xl px-4 py-2 text-sm font-medium transition ${
                filter === status
                  ? "bg-[#343E4F] text-white"
                  : "bg-white text-gray-600 hover:bg-gray-100"
              }`}
            >
              {status}
            </button>
          ))}
        </div>

        {/* Orders */}
        {filteredOrders.length === 0 ? (
          <div className="rounded-2xl bg-white px-6 py-16 text-center shadow-sm">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-orange-50">
              <ShoppingBag
                size={38}
                className="text-[#E57036]"
              />
            </div>

            <h2 className="mt-5 text-xl font-bold text-[#343E4F]">
              No Orders Found
            </h2>

            <p className="mt-2 text-gray-500">
              You don't have any orders in this category.
            </p>

            <Link
              to="/buyer/marketplace"
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#E57036] px-6 py-3 font-semibold text-white transition hover:bg-[#d85f29]"
            >
              <ShoppingBag size={18} />
              Browse Marketplace
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredOrders.map((order) => {
              const itemCount = (order.items || []).reduce(
                (total, item) =>
                  total + Number(item.quantity || 0),
                0
              );

              return (
                <div
                  key={order.id}
                  className="rounded-2xl bg-white p-5 shadow-sm transition hover:shadow-md"
                >
                  {/* Order Header */}
                  <div className="flex flex-col gap-4 border-b border-gray-100 pb-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <div className="flex flex-wrap items-center gap-3">
                        <h2 className="font-bold text-[#343E4F]">
                          {order.id}
                        </h2>

                        <span
                          className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${getStatusStyle(
                            order.status
                          )}`}
                        >
                          {getStatusIcon(order.status)}
                          {order.status}
                        </span>
                      </div>

                      <p className="mt-1 text-sm text-gray-500">
                        {order.date || "Date unavailable"}
                      </p>
                    </div>

                    <button
                      onClick={() => setSelectedOrder(order)}
                      className="inline-flex items-center justify-center gap-2 rounded-xl border border-gray-200 px-4 py-2.5 text-sm font-semibold text-[#343E4F] transition hover:bg-gray-50"
                    >
                      <Eye size={17} />
                      View Details
                    </button>
                  </div>

                  {/* Products */}
                  <div className="mt-4 space-y-3">
                    {(order.items || []).slice(0, 3).map((item) => (
                      <div
                        key={`${order.id}-${item.id || item.slug}`}
                        className="flex items-center gap-3"
                      >
                        <img
                          src={
                            item.image ||
                            "/images/product-placeholder.jpg"
                          }
                          alt={item.name}
                          className="h-14 w-14 shrink-0 rounded-xl object-cover"
                          onError={(e) => {
                            e.currentTarget.src =
                              "/images/product-placeholder.jpg";
                          }}
                        />

                        <div className="min-w-0 flex-1">
                          <p className="truncate text-sm font-semibold text-[#343E4F]">
                            {item.name}
                          </p>

                          <p className="text-xs text-gray-500">
                            Qty: {item.quantity}{" "}
                            {item.unit
                              ? `• ${item.unit}`
                              : ""}
                          </p>

                          {item.seller && (
                            <p className="text-xs text-gray-400">
                              Seller: {item.seller}
                            </p>
                          )}
                        </div>

                        <p className="text-sm font-bold text-[#E57036]">
                          ETB{" "}
                          {(
                            Number(item.price || 0) *
                            Number(item.quantity || 0)
                          ).toLocaleString()}
                        </p>
                      </div>
                    ))}

                    {(order.items || []).length > 3 && (
                      <p className="text-xs font-medium text-gray-400">
                        + {(order.items || []).length - 3} more
                        product(s)
                      </p>
                    )}
                  </div>

                  {/* Footer */}
                  <div className="mt-5 flex flex-col gap-3 border-t border-gray-100 pt-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="text-sm text-gray-500">
                      {itemCount}{" "}
                      {itemCount === 1 ? "item" : "items"}
                    </div>

                    <div className="flex items-center justify-between gap-5 sm:justify-end">
                      <span className="text-sm text-gray-500">
                        Total
                      </span>

                      <span className="text-lg font-bold text-[#343E4F]">
                        ETB{" "}
                        {Number(order.total || 0).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* ==========================================
          ORDER DETAILS MODAL
      ========================================== */}

      {selectedOrder && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4 py-6"
          onClick={() => setSelectedOrder(null)}
        >
          <div
            className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white p-6 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold text-[#343E4F]">
                  Order Details
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  {selectedOrder.id}
                </p>
              </div>

              <button
                onClick={() => setSelectedOrder(null)}
                className="rounded-lg p-2 text-gray-400 transition hover:bg-gray-100 hover:text-gray-600"
              >
                <X size={20} />
              </button>
            </div>

            {/* Status */}
            <div className="mt-5 flex flex-wrap items-center gap-3">
              <span
                className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold ${getStatusStyle(
                  selectedOrder.status
                )}`}
              >
                {getStatusIcon(selectedOrder.status)}
                {selectedOrder.status}
              </span>

              <span className="text-sm text-gray-500">
                {selectedOrder.date}
              </span>
            </div>

            {/* Customer */}
            {selectedOrder.customer && (
              <div className="mt-6 rounded-xl bg-gray-50 p-4">
                <h3 className="font-bold text-[#343E4F]">
                  Delivery Information
                </h3>

                <div className="mt-3 grid gap-2 text-sm sm:grid-cols-2">
                  <p>
                    <span className="text-gray-500">
                      Name:
                    </span>{" "}
                    {selectedOrder.customer.fullName}
                  </p>

                  <p>
                    <span className="text-gray-500">
                      Phone:
                    </span>{" "}
                    {selectedOrder.customer.phone}
                  </p>

                  <p>
                    <span className="text-gray-500">
                      Region:
                    </span>{" "}
                    {selectedOrder.customer.region}
                  </p>

                  <p>
                    <span className="text-gray-500">
                      City:
                    </span>{" "}
                    {selectedOrder.customer.city}
                  </p>

                  <p className="sm:col-span-2">
                    <span className="text-gray-500">
                      Address:
                    </span>{" "}
                    {selectedOrder.customer.address}
                  </p>
                </div>
              </div>
            )}

            {/* Products */}
            <div className="mt-6">
              <h3 className="font-bold text-[#343E4F]">
                Products
              </h3>

              <div className="mt-3 space-y-3">
                {(selectedOrder.items || []).map((item) => (
                  <div
                    key={`${selectedOrder.id}-modal-${
                      item.id || item.slug
                    }`}
                    className="flex gap-3 rounded-xl border border-gray-100 p-3"
                  >
                    <img
                      src={
                        item.image ||
                        "/images/product-placeholder.jpg"
                      }
                      alt={item.name}
                      className="h-16 w-16 shrink-0 rounded-lg object-cover"
                      onError={(e) => {
                        e.currentTarget.src =
                          "/images/product-placeholder.jpg";
                      }}
                    />

                    <div className="min-w-0 flex-1">
                      <p className="font-semibold text-[#343E4F]">
                        {item.name}
                      </p>

                      <p className="mt-1 text-xs text-gray-500">
                        Quantity: {item.quantity}
                      </p>

                      {item.seller && (
                        <p className="text-xs text-gray-500">
                          Seller: {item.seller}
                        </p>
                      )}

                      <p className="mt-1 text-sm font-bold text-[#E57036]">
                        ETB{" "}
                        {(
                          Number(item.price || 0) *
                          Number(item.quantity || 0)
                        ).toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Order Information */}
            <div className="mt-6 rounded-xl border border-gray-100 p-4">
              <h3 className="font-bold text-[#343E4F]">
                Order Information
              </h3>

              <div className="mt-3 space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">
                    Subtotal
                  </span>

                  <span className="font-semibold">
                    ETB{" "}
                    {Number(
                      selectedOrder.subtotal || 0
                    ).toLocaleString()}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-500">
                    Delivery
                  </span>

                  <span className="font-semibold">
                    ETB{" "}
                    {Number(
                      selectedOrder.deliveryFee || 0
                    ).toLocaleString()}
                  </span>
                </div>

                <div className="flex justify-between border-t pt-3">
                  <span className="font-bold text-[#343E4F]">
                    Total
                  </span>

                  <span className="font-bold text-[#E57036]">
                    ETB{" "}
                    {Number(
                      selectedOrder.total || 0
                    ).toLocaleString()}
                  </span>
                </div>
              </div>
            </div>

            {/* Delivery + Payment */}
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <div className="rounded-xl bg-gray-50 p-4">
                <p className="text-xs text-gray-500">
                  Delivery Method
                </p>

                <p className="mt-1 font-semibold capitalize text-[#343E4F]">
                  {selectedOrder.deliveryMethod ||
                    "Standard"}
                </p>
              </div>

              <div className="rounded-xl bg-gray-50 p-4">
                <p className="text-xs text-gray-500">
                  Payment Method
                </p>

                <p className="mt-1 font-semibold capitalize text-[#343E4F]">
                  {selectedOrder.paymentMethod ||
                    "Cash on Delivery"}
                </p>
              </div>
            </div>

            {/* Close */}
            <button
              onClick={() => setSelectedOrder(null)}
              className="mt-6 w-full rounded-xl bg-[#343E4F] px-5 py-3 font-semibold text-white transition hover:bg-[#28313f]"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default OrdersPage;