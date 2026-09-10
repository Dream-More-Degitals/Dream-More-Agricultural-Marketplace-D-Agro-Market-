import { useEffect, useState } from "react";
import {
  Search,
  ShoppingBag,
  Eye,
  X,
  MapPin,
  User,
  Calendar,
  Package,
  Phone,
  Truck,
} from "lucide-react";

export default function FarmerOrders() {
  const [orders, setOrders] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    loadOrders();

    const handleOrdersUpdated = () => {
      loadOrders();
    };

    window.addEventListener("storage", handleOrdersUpdated);
    window.addEventListener("ordersUpdated", handleOrdersUpdated);

    return () => {
      window.removeEventListener("storage", handleOrdersUpdated);
      window.removeEventListener("ordersUpdated", handleOrdersUpdated);
    };
  }, []);

  // ==========================================
  // LOAD ORDERS
  // ==========================================
  const loadOrders = () => {
    try {
      const savedOrders = JSON.parse(
        localStorage.getItem("orders") || "[]"
      );

      const farmerOrders = savedOrders
        .map((order) => {
          const farmerItems = getFarmerItems(order);

          if (farmerItems.length === 0) {
            return null;
          }

          return {
            ...order,
            farmerItems,
          };
        })
        .filter(Boolean);

      setOrders(farmerOrders);
    } catch (error) {
      console.error("Failed to load farmer orders:", error);
      setOrders([]);
    }
  };

  // ==========================================
  // GET FARMER PRODUCTS
  // ==========================================
  const getFarmerItems = (order) => {
    if (!order?.items || !Array.isArray(order.items)) {
      return [];
    }

    return order.items.filter((item) => {
      const seller = String(
        item.sellerType || item.seller || ""
      ).toLowerCase();

      return seller === "farmer";
    });
  };

  // ==========================================
  // ORDER STATUS
  // ==========================================
  const getOrderStatus = (order) => {
    return order?.status || "Pending";
  };

  const getStatusClass = (status) => {
    switch (status) {
      case "Delivered":
      case "Completed":
        return "bg-green-100 text-green-700";

      case "Processing":
        return "bg-blue-100 text-blue-700";

      case "Confirmed":
        return "bg-indigo-100 text-indigo-700";

      case "Shipped":
        return "bg-purple-100 text-purple-700";

      case "Out for Delivery":
        return "bg-orange-100 text-orange-700";

      case "Cancelled":
        return "bg-red-100 text-red-700";

      default:
        return "bg-yellow-100 text-yellow-700";
    }
  };

  // ==========================================
  // FARMER ORDER TOTAL
  // ==========================================
  const getFarmerOrderTotal = (order) => {
    return getFarmerItems(order).reduce((total, item) => {
      const price = Number(item.price || 0);
      const quantity = Number(item.quantity || 1);

      return total + price * quantity;
    }, 0);
  };

  // ==========================================
  // CUSTOMER NAME
  // ==========================================
  const getCustomerName = (order) => {
    return (
      order?.customer?.fullName ||
      order?.customerName ||
      order?.buyerName ||
      order?.buyer?.name ||
      order?.customer ||
      "Buyer"
    );
  };

  // ==========================================
  // CUSTOMER PHONE
  // ==========================================
  const getCustomerPhone = (order) => {
    return (
      order?.customer?.phone ||
      order?.phone ||
      order?.customerPhone ||
      order?.buyer?.phone ||
      "Not provided"
    );
  };

  // ==========================================
  // DELIVERY ADDRESS
  // ==========================================
  const getDeliveryAddress = (order) => {
    const customer = order?.customer;

    if (customer) {
      const parts = [
        customer.address,
        customer.city,
        customer.region,
      ].filter(Boolean);

      if (parts.length > 0) {
        return parts.join(", ");
      }
    }

    if (order?.shippingAddress) {
      if (typeof order.shippingAddress === "string") {
        return order.shippingAddress;
      }

      const parts = [
        order.shippingAddress.address,
        order.shippingAddress.city,
        order.shippingAddress.region,
      ].filter(Boolean);

      if (parts.length > 0) {
        return parts.join(", ");
      }
    }

    return "Address not provided";
  };

  // ==========================================
  // SEARCH + FILTER
  // ==========================================
  const filteredOrders = orders.filter((order) => {
    const orderId = String(
      order?.id ||
        order?.orderId ||
        ""
    ).toLowerCase();

    const customer = getCustomerName(order).toLowerCase();

    const productNames = getFarmerItems(order)
      .map((item) => String(item.name || ""))
      .join(" ")
      .toLowerCase();

    const searchText = search.toLowerCase();

    const searchMatch =
      orderId.includes(searchText) ||
      customer.includes(searchText) ||
      productNames.includes(searchText);

    const statusMatch =
      statusFilter === "All" ||
      getOrderStatus(order) === statusFilter;

    return searchMatch && statusMatch;
  });

  // ==========================================
  // STATISTICS
  // ==========================================
  const totalOrders = orders.length;

  const pendingOrders = orders.filter((order) => {
    const status = getOrderStatus(order);

    return (
      status === "Pending" ||
      status === "Processing" ||
      status === "Confirmed"
    );
  }).length;

  const completedOrders = orders.filter((order) => {
    const status = getOrderStatus(order);

    return (
      status === "Delivered" ||
      status === "Completed"
    );
  }).length;

  const totalRevenue = orders.reduce(
    (total, order) =>
      total + getFarmerOrderTotal(order),
    0
  );

  // ==========================================
  // RENDER
  // ==========================================
  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">

      {/* =====================================
          HEADER
      ===================================== */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-[#343E4F] sm:text-3xl">
          Farmer Orders
        </h1>

        <p className="mt-1 text-sm text-gray-500">
          Manage orders containing your agricultural
          products.
        </p>
      </div>

      {/* =====================================
          STATISTICS
      ===================================== */}
      <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">

        {/* Total Orders */}
        <div className="rounded-2xl bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">
                Total Orders
              </p>

              <p className="mt-2 text-3xl font-bold text-[#343E4F]">
                {totalOrders}
              </p>
            </div>

            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50">
              <ShoppingBag
                size={24}
                className="text-blue-600"
              />
            </div>
          </div>
        </div>

        {/* Pending */}
        <div className="rounded-2xl bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">
                Pending
              </p>

              <p className="mt-2 text-3xl font-bold text-yellow-600">
                {pendingOrders}
              </p>
            </div>

            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-yellow-50">
              <Package
                size={24}
                className="text-yellow-600"
              />
            </div>
          </div>
        </div>

        {/* Completed */}
        <div className="rounded-2xl bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">
                Completed
              </p>

              <p className="mt-2 text-3xl font-bold text-green-600">
                {completedOrders}
              </p>
            </div>

            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-50">
              <ShoppingBag
                size={24}
                className="text-green-600"
              />
            </div>
          </div>
        </div>

        {/* Revenue */}
        <div className="rounded-2xl bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">
                Revenue
              </p>

              <p className="mt-2 text-2xl font-bold text-[#E57036]">
                ETB {totalRevenue.toLocaleString()}
              </p>
            </div>

            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-50">
              <ShoppingBag
                size={24}
                className="text-[#E57036]"
              />
            </div>
          </div>
        </div>
      </div>

      {/* =====================================
          SEARCH + FILTER
      ===================================== */}
      <div className="mb-6 rounded-2xl bg-white p-4 shadow-sm">
        <div className="flex flex-col gap-4 md:flex-row">

          {/* Search */}
          <div className="relative flex-1">
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
              placeholder="Search by order ID, customer or product..."
              className="w-full rounded-xl border border-gray-200 py-3 pl-11 pr-4 text-sm outline-none transition focus:border-[#E57036] focus:ring-2 focus:ring-orange-100"
            />
          </div>

          {/* Status */}
          <select
            value={statusFilter}
            onChange={(e) =>
              setStatusFilter(e.target.value)
            }
            className="rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none focus:border-[#E57036]"
          >
            <option value="All">
              All Statuses
            </option>

            <option value="Pending">
              Pending
            </option>

            <option value="Processing">
              Processing
            </option>

            <option value="Confirmed">
              Confirmed
            </option>

            <option value="Shipped">
              Shipped
            </option>

            <option value="Out for Delivery">
              Out for Delivery
            </option>

            <option value="Delivered">
              Delivered
            </option>

            <option value="Completed">
              Completed
            </option>

            <option value="Cancelled">
              Cancelled
            </option>
          </select>
        </div>
      </div>

      {/* =====================================
          ORDERS
      ===================================== */}
      <div className="overflow-hidden rounded-2xl bg-white shadow-sm">

        <div className="border-b px-5 py-4">
          <h2 className="font-bold text-[#343E4F]">
            Orders
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            {filteredOrders.length} order
            {filteredOrders.length !== 1
              ? "s"
              : ""}
          </p>
        </div>

        {filteredOrders.length > 0 ? (
          <div className="divide-y">

            {filteredOrders.map((order, index) => {
              const farmerItems =
                getFarmerItems(order);

              const status =
                getOrderStatus(order);

              const orderId =
                order.id ||
                order.orderId ||
                `ORD-${1000 + index + 1}`;

              const customer =
                getCustomerName(order);

              const orderDate =
                order.createdAt ||
                order.date ||
                order.orderDate;

              return (
                <div
                  key={orderId}
                  className="p-5 transition hover:bg-gray-50"
                >
                  <div className="flex flex-col gap-5 lg:flex-row lg:items-center">

                    {/* Order Information */}
                    <div className="flex min-w-0 flex-1 items-start gap-4">

                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-orange-50">
                        <ShoppingBag
                          size={22}
                          className="text-[#E57036]"
                        />
                      </div>

                      <div className="min-w-0">

                        <h3 className="font-bold text-[#343E4F]">
                          {orderId}
                        </h3>

                        <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-gray-500">

                          <span className="flex items-center gap-1">
                            <User size={13} />
                            {customer}
                          </span>

                          {orderDate && (
                            <span className="flex items-center gap-1">
                              <Calendar size={13} />

                              {new Date(
                                orderDate
                              ).toLocaleDateString()}
                            </span>
                          )}
                        </div>

                        {/* Farmer Products */}
                        <div className="mt-3 space-y-1">
                          {farmerItems
                            .slice(0, 2)
                            .map(
                              (
                                item,
                                itemIndex
                              ) => (
                                <p
                                  key={itemIndex}
                                  className="text-sm text-gray-600"
                                >
                                  {item.name ||
                                    "Product"}{" "}
                                  ×{" "}
                                  {item.quantity ||
                                    1}
                                </p>
                              )
                            )}

                          {farmerItems.length >
                            2 && (
                            <p className="text-xs text-gray-400">
                              +
                              {farmerItems.length -
                                2}{" "}
                              more product
                              {farmerItems.length -
                                2 !==
                              1
                                ? "s"
                                : ""}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Farmer Total */}
                    <div className="lg:w-36 lg:text-right">
                      <p className="text-xs text-gray-400">
                        Farmer Total
                      </p>

                      <p className="mt-1 font-bold text-[#E57036]">
                        ETB{" "}
                        {getFarmerOrderTotal(
                          order
                        ).toLocaleString()}
                      </p>
                    </div>

                    {/* Status */}
                    <div className="lg:w-32">
                      <span
                        className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${getStatusClass(
                          status
                        )}`}
                      >
                        {status}
                      </span>
                    </div>

                    {/* View */}
                    <button
                      onClick={() =>
                        setSelectedOrder(order)
                      }
                      className="flex items-center justify-center gap-2 rounded-xl border border-gray-200 px-4 py-2.5 text-sm font-semibold text-[#343E4F] transition hover:border-[#E57036] hover:text-[#E57036]"
                    >
                      <Eye size={17} />
                      View
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="px-5 py-16 text-center">

            <ShoppingBag
              size={48}
              className="mx-auto mb-4 text-gray-300"
            />

            <h3 className="font-semibold text-[#343E4F]">
              No orders found
            </h3>

            <p className="mt-1 text-sm text-gray-500">
              {orders.length === 0
                ? "You don't have any orders containing your products yet."
                : "Try changing your search or status filter."}
            </p>
          </div>
        )}
      </div>

      {/* =====================================
          ORDER DETAILS MODAL
      ===================================== */}
      {selectedOrder && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
          onClick={() =>
            setSelectedOrder(null)
          }
        >
          <div
            className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white shadow-xl"
            onClick={(e) =>
              e.stopPropagation()
            }
          >

            {/* Modal Header */}
            <div className="flex items-center justify-between border-b p-5">
              <div>
                <h2 className="text-xl font-bold text-[#343E4F]">
                  Order Details
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  {selectedOrder.id ||
                    selectedOrder.orderId ||
                    "Order"}
                </p>
              </div>

              <button
                onClick={() =>
                  setSelectedOrder(null)
                }
                className="rounded-lg p-2 text-gray-400 transition hover:bg-gray-100 hover:text-gray-700"
              >
                <X size={22} />
              </button>
            </div>

            {/* Modal Content */}
            <div className="space-y-6 p-5">

              {/* Customer */}
              <div className="rounded-xl bg-gray-50 p-4">
                <div className="flex items-start gap-3">
                  <User
                    size={19}
                    className="mt-0.5 text-[#E57036]"
                  />

                  <div>
                    <p className="text-xs text-gray-400">
                      Customer
                    </p>

                    <p className="font-semibold text-[#343E4F]">
                      {getCustomerName(
                        selectedOrder
                      )}
                    </p>

                    <div className="mt-2 flex items-center gap-2 text-sm text-gray-500">
                      <Phone size={15} />

                      {getCustomerPhone(
                        selectedOrder
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Delivery Address */}
              <div className="rounded-xl bg-gray-50 p-4">
                <div className="flex items-start gap-3">
                  <MapPin
                    size={19}
                    className="mt-0.5 text-[#E57036]"
                  />

                  <div>
                    <p className="text-xs text-gray-400">
                      Delivery Address
                    </p>

                    <p className="mt-1 text-sm text-[#343E4F]">
                      {getDeliveryAddress(
                        selectedOrder
                      )}
                    </p>
                  </div>
                </div>
              </div>

              {/* Delivery Method */}
              <div className="rounded-xl bg-gray-50 p-4">
                <div className="flex items-center gap-3">
                  <Truck
                    size={19}
                    className="text-[#E57036]"
                  />

                  <div>
                    <p className="text-xs text-gray-400">
                      Delivery Method
                    </p>

                    <p className="font-semibold capitalize text-[#343E4F]">
                      {selectedOrder.deliveryMethod ||
                        "Standard"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Farmer Products */}
              <div>
                <h3 className="mb-3 font-bold text-[#343E4F]">
                  Your Products
                </h3>

                <div className="space-y-3">
                  {getFarmerItems(
                    selectedOrder
                  ).map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between rounded-xl border border-gray-100 p-4"
                    >
                      <div>
                        <p className="font-semibold text-[#343E4F]">
                          {item.name ||
                            "Product"}
                        </p>

                        <p className="mt-1 text-sm text-gray-500">
                          Quantity:{" "}
                          {item.quantity || 1}
                        </p>

                        <p className="mt-1 text-xs text-gray-400">
                          ETB{" "}
                          {Number(
                            item.price || 0
                          ).toLocaleString()}{" "}
                          per unit
                        </p>
                      </div>

                      <p className="font-bold text-[#E57036]">
                        ETB{" "}
                        {(
                          Number(
                            item.price || 0
                          ) *
                          Number(
                            item.quantity || 1
                          )
                        ).toLocaleString()}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Farmer Total */}
              <div className="flex items-center justify-between border-t pt-5">
                <span className="font-bold text-[#343E4F]">
                  Farmer Order Total
                </span>

                <span className="text-xl font-bold text-[#E57036]">
                  ETB{" "}
                  {getFarmerOrderTotal(
                    selectedOrder
                  ).toLocaleString()}
                </span>
              </div>

              {/* Order Status */}
              <div className="flex items-center justify-between rounded-xl bg-gray-50 p-4">
                <span className="text-sm text-gray-500">
                  Order Status
                </span>

                <span
                  className={`rounded-full px-3 py-1 text-xs font-semibold ${getStatusClass(
                    getOrderStatus(
                      selectedOrder
                    )
                  )}`}
                >
                  {getOrderStatus(
                    selectedOrder
                  )}
                </span>
              </div>

              {/* Order Date */}
              {(selectedOrder.createdAt ||
                selectedOrder.date) && (
                <div className="flex items-center justify-between border-t pt-4 text-sm">
                  <span className="text-gray-500">
                    Order Date
                  </span>

                  <span className="font-medium text-[#343E4F]">
                    {new Date(
                      selectedOrder.createdAt ||
                        selectedOrder.date
                    ).toLocaleDateString()}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}