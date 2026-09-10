import { useState } from "react";
import {
  Truck,
  Search,
  Eye,
  X,
  MapPin,
  Phone,
  User,
  Package,
  Calendar,
  CheckCircle,
} from "lucide-react";

const initialDeliveries = [
  {
    id: "DEL-1001",
    orderId: "ORD-1001",
    customer: "Abebe Kebede",
    phone: "0911223344",
    pickup: "Jimma, Oromia",
    destination: "Bedele, Oromia",
    product: "Organic Fertilizer",
    quantity: 10,
    date: "09/08/2026",
    status: "Ready for Pickup",
  },
  {
    id: "DEL-1002",
    orderId: "ORD-1002",
    customer: "Hanna Ali",
    phone: "0922334455",
    pickup: "Addis Ababa",
    destination: "Adama, Oromia",
    product: "Maize Seeds",
    quantity: 5,
    date: "08/08/2026",
    status: "In Transit",
  },
  {
    id: "DEL-1003",
    orderId: "ORD-1003",
    customer: "Mohammed Ahmed",
    phone: "0933445566",
    pickup: "Nekemte, Oromia",
    destination: "Jimma, Oromia",
    product: "Irrigation Pipe",
    quantity: 2,
    date: "07/08/2026",
    status: "Delivered",
  },
];

function Deliveries() {
  const [deliveries, setDeliveries] =
    useState(initialDeliveries);

  const [search, setSearch] = useState("");
  const [selectedDelivery, setSelectedDelivery] =
    useState(null);

  const updateStatus = (id, newStatus) => {
    setDeliveries((prev) =>
      prev.map((delivery) =>
        delivery.id === id
          ? { ...delivery, status: newStatus }
          : delivery
      )
    );

    setSelectedDelivery((prev) =>
      prev?.id === id
        ? { ...prev, status: newStatus }
        : prev
    );
  };

  const filteredDeliveries = deliveries.filter(
    (delivery) => {
      const text = search.toLowerCase();

      return (
        delivery.id.toLowerCase().includes(text) ||
        delivery.orderId.toLowerCase().includes(text) ||
        delivery.customer.toLowerCase().includes(text) ||
        delivery.product.toLowerCase().includes(text) ||
        delivery.pickup.toLowerCase().includes(text) ||
        delivery.destination
          .toLowerCase()
          .includes(text)
      );
    }
  );

  const getStatusStyle = (status) => {
    switch (status) {
      case "Ready for Pickup":
        return "bg-yellow-100 text-yellow-700";

      case "Accepted":
        return "bg-blue-100 text-blue-700";

      case "Picked Up":
        return "bg-indigo-100 text-indigo-700";

      case "In Transit":
        return "bg-purple-100 text-purple-700";

      case "Delivered":
        return "bg-green-100 text-green-700";

      case "Completed":
        return "bg-gray-100 text-gray-700";

      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-[#343E4F] sm:text-3xl">
          Deliveries
        </h1>

        <p className="mt-1 text-sm text-gray-500">
          Manage pickup, transportation, and delivery
          requests.
        </p>
      </div>

      {/* Statistics */}
      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
        <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
          <p className="text-sm text-gray-500">
            Total
          </p>

          <p className="mt-1 text-2xl font-bold text-[#343E4F]">
            {deliveries.length}
          </p>
        </div>

        <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
          <p className="text-sm text-gray-500">
            Ready
          </p>

          <p className="mt-1 text-2xl font-bold text-yellow-600">
            {
              deliveries.filter(
                (d) => d.status === "Ready for Pickup"
              ).length
            }
          </p>
        </div>

        <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
          <p className="text-sm text-gray-500">
            In Transit
          </p>

          <p className="mt-1 text-2xl font-bold text-purple-600">
            {
              deliveries.filter(
                (d) => d.status === "In Transit"
              ).length
            }
          </p>
        </div>

        <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
          <p className="text-sm text-gray-500">
            Delivered
          </p>

          <p className="mt-1 text-2xl font-bold text-green-600">
            {
              deliveries.filter(
                (d) => d.status === "Delivered"
              ).length
            }
          </p>
        </div>

        <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
          <p className="text-sm text-gray-500">
            Completed
          </p>

          <p className="mt-1 text-2xl font-bold text-gray-600">
            {
              deliveries.filter(
                (d) => d.status === "Completed"
              ).length
            }
          </p>
        </div>
      </div>

      {/* Search */}
      <div className="mb-6 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
        <div className="relative">
          <Search
            size={20}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            type="text"
            placeholder="Search delivery, order, customer, or location..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-xl border border-gray-200 py-3 pl-12 pr-4 text-sm outline-none transition focus:border-[#E57036] focus:ring-2 focus:ring-[#E57036]/20"
          />
        </div>
      </div>

      {/* Delivery Table */}
      <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1000px]">
            <thead className="bg-[#343E4F] text-left text-sm text-white">
              <tr>
                <th className="px-6 py-4">
                  Delivery
                </th>

                <th className="px-6 py-4">
                  Customer
                </th>

                <th className="px-6 py-4">
                  Route
                </th>

                <th className="px-6 py-4">
                  Product
                </th>

                <th className="px-6 py-4">
                  Date
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
              {filteredDeliveries.length > 0 ? (
                filteredDeliveries.map((delivery) => (
                  <tr
                    key={delivery.id}
                    className="transition hover:bg-gray-50"
                  >
                    {/* Delivery */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="rounded-xl bg-orange-50 p-3">
                          <Truck
                            size={20}
                            className="text-[#E57036]"
                          />
                        </div>

                        <div>
                          <p className="font-semibold text-[#343E4F]">
                            {delivery.id}
                          </p>

                          <p className="text-xs text-gray-400">
                            {delivery.orderId}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Customer */}
                    <td className="px-6 py-4">
                      <p className="font-medium text-gray-700">
                        {delivery.customer}
                      </p>

                      <p className="text-xs text-gray-400">
                        {delivery.phone}
                      </p>
                    </td>

                    {/* Route */}
                    <td className="px-6 py-4">
                      <div className="space-y-1 text-sm">
                        <div className="flex items-center gap-2 text-gray-600">
                          <MapPin
                            size={15}
                            className="text-[#E57036]"
                          />
                          {delivery.pickup}
                        </div>

                        <div className="ml-1 border-l border-dashed border-gray-300 pl-4 text-xs text-gray-400">
                          to
                        </div>

                        <div className="flex items-center gap-2 text-gray-600">
                          <MapPin
                            size={15}
                            className="text-green-600"
                          />
                          {delivery.destination}
                        </div>
                      </div>
                    </td>

                    {/* Product */}
                    <td className="px-6 py-4">
                      <p className="text-sm font-medium text-gray-700">
                        {delivery.product}
                      </p>

                      <p className="text-xs text-gray-400">
                        Quantity: {delivery.quantity}
                      </p>
                    </td>

                    {/* Date */}
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {delivery.date}
                    </td>

                    {/* Status */}
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${getStatusStyle(
                          delivery.status
                        )}`}
                      >
                        {delivery.status}
                      </span>
                    </td>

                    {/* Action */}
                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={() =>
                          setSelectedDelivery(
                            delivery
                          )
                        }
                        className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold text-blue-600 transition hover:bg-blue-50"
                      >
                        <Eye size={17} />
                        View
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="7"
                    className="px-6 py-12 text-center"
                  >
                    <Truck
                      size={42}
                      className="mx-auto mb-3 text-gray-300"
                    />

                    <p className="font-semibold text-gray-500">
                      No deliveries found
                    </p>

                    <p className="mt-1 text-sm text-gray-400">
                      Try another search.
                    </p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Details Modal */}
      {selectedDelivery && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white shadow-2xl">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-gray-100 p-6">
              <div>
                <h2 className="text-xl font-bold text-[#343E4F]">
                  Delivery Details
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  {selectedDelivery.id}
                </p>
              </div>

              <button
                onClick={() =>
                  setSelectedDelivery(null)
                }
                className="rounded-lg p-2 text-gray-500 transition hover:bg-gray-100"
              >
                <X size={20} />
              </button>
            </div>

            <div className="space-y-6 p-6">
              {/* Customer */}
              <div className="rounded-xl bg-gray-50 p-5">
                <h3 className="mb-4 font-semibold text-[#343E4F]">
                  Customer Information
                </h3>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="flex gap-3">
                    <User
                      size={18}
                      className="mt-1 text-[#E57036]"
                    />

                    <div>
                      <p className="text-xs text-gray-400">
                        Customer
                      </p>

                      <p className="text-sm font-medium text-gray-700">
                        {selectedDelivery.customer}
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <Phone
                      size={18}
                      className="mt-1 text-[#E57036]"
                    />

                    <div>
                      <p className="text-xs text-gray-400">
                        Phone
                      </p>

                      <p className="text-sm font-medium text-gray-700">
                        {selectedDelivery.phone}
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <Calendar
                      size={18}
                      className="mt-1 text-[#E57036]"
                    />

                    <div>
                      <p className="text-xs text-gray-400">
                        Date
                      </p>

                      <p className="text-sm font-medium text-gray-700">
                        {selectedDelivery.date}
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <Package
                      size={18}
                      className="mt-1 text-[#E57036]"
                    />

                    <div>
                      <p className="text-xs text-gray-400">
                        Product
                      </p>

                      <p className="text-sm font-medium text-gray-700">
                        {selectedDelivery.product}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Route */}
              <div className="rounded-xl border border-gray-100 p-5">
                <h3 className="mb-5 font-semibold text-[#343E4F]">
                  Delivery Route
                </h3>

                <div className="relative space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="rounded-full bg-orange-100 p-2">
                      <MapPin
                        size={18}
                        className="text-[#E57036]"
                      />
                    </div>

                    <div>
                      <p className="text-xs text-gray-400">
                        Pickup Location
                      </p>

                      <p className="font-medium text-gray-700">
                        {selectedDelivery.pickup}
                      </p>
                    </div>
                  </div>

                  <div className="ml-5 h-6 border-l-2 border-dashed border-gray-300" />

                  <div className="flex items-start gap-4">
                    <div className="rounded-full bg-green-100 p-2">
                      <MapPin
                        size={18}
                        className="text-green-600"
                      />
                    </div>

                    <div>
                      <p className="text-xs text-gray-400">
                        Destination
                      </p>

                      <p className="font-medium text-gray-700">
                        {selectedDelivery.destination}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Delivery Status */}
              <div>
                <h3 className="mb-4 font-semibold text-[#343E4F]">
                  Delivery Status
                </h3>

                <div className="space-y-3">
                  {[
                    "Ready for Pickup",
                    "Accepted",
                    "Picked Up",
                    "In Transit",
                    "Delivered",
                    "Completed",
                  ].map((status, index) => {
                    const isActive =
                      selectedDelivery.status === status;

                    return (
                      <button
                        key={status}
                        onClick={() =>
                          updateStatus(
                            selectedDelivery.id,
                            status
                          )
                        }
                        className={`flex w-full items-center gap-4 rounded-xl border p-4 text-left transition ${
                          isActive
                            ? "border-[#E57036] bg-orange-50"
                            : "border-gray-100 hover:bg-gray-50"
                        }`}
                      >
                        <div
                          className={`flex h-8 w-8 items-center justify-center rounded-full ${
                            isActive
                              ? "bg-[#E57036] text-white"
                              : "bg-gray-100 text-gray-400"
                          }`}
                        >
                          {isActive ? (
                            <CheckCircle size={18} />
                          ) : (
                            <span className="text-xs font-bold">
                              {index + 1}
                            </span>
                          )}
                        </div>

                        <div>
                          <p
                            className={`text-sm font-semibold ${
                              isActive
                                ? "text-[#E57036]"
                                : "text-gray-600"
                            }`}
                          >
                            {status}
                          </p>

                          {isActive && (
                            <p className="text-xs text-gray-400">
                              Current delivery status
                            </p>
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="border-t border-gray-100 p-6">
              <button
                onClick={() =>
                  setSelectedDelivery(null)
                }
                className="w-full rounded-xl bg-[#343E4F] px-5 py-3 font-semibold text-white transition hover:bg-[#293241]"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Deliveries;