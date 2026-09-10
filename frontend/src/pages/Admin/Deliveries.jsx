import { useMemo, useState } from "react";
import {
  Search,
  Eye,
  X,
  Truck,
  Package,
  CheckCircle,
  Clock,
  MapPin,
} from "lucide-react";

const initialDeliveries = [
  {
    id: "DEL-1001",
    orderId: "ORD-1001",
    customer: "Abebe Kebede",
    transporter: "Dawit Transport",
    phone: "0911223344",
    pickup: "Jimma",
    destination: "Addis Ababa",
    status: "Pending",
    date: "09/09/2026",
  },
  {
    id: "DEL-1002",
    orderId: "ORD-1002",
    customer: "Hanna Ali",
    transporter: "Oromia Logistics",
    phone: "0922334455",
    pickup: "Gedeo",
    destination: "Addis Ababa",
    status: "Accepted",
    date: "08/09/2026",
  },
  {
    id: "DEL-1003",
    orderId: "ORD-1003",
    customer: "Mohammed Ahmed",
    transporter: "Fast Agro Transport",
    phone: "0933445566",
    pickup: "Meki",
    destination: "Adama",
    status: "In Transit",
    date: "07/09/2026",
  },
  {
    id: "DEL-1004",
    orderId: "ORD-1004",
    customer: "Fatuma Omar",
    transporter: "East Logistics",
    phone: "0944556677",
    pickup: "Wollega",
    destination: "Dire Dawa",
    status: "Delivered",
    date: "06/09/2026",
  },
];

const statusOptions = [
  "Pending",
  "Accepted",
  "Picked Up",
  "In Transit",
  "Delivered",
  "Cancelled",
];

function Deliveries() {
  const [deliveries, setDeliveries] =
    useState(initialDeliveries);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] =
    useState("All");
  const [selectedDelivery, setSelectedDelivery] =
    useState(null);

  const filteredDeliveries = useMemo(() => {
    const query = search.toLowerCase();

    return deliveries.filter((delivery) => {
      const matchesSearch =
        delivery.id.toLowerCase().includes(query) ||
        delivery.orderId.toLowerCase().includes(query) ||
        delivery.customer.toLowerCase().includes(query) ||
        delivery.transporter
          .toLowerCase()
          .includes(query) ||
        delivery.pickup.toLowerCase().includes(query) ||
        delivery.destination
          .toLowerCase()
          .includes(query);

      const matchesStatus =
        statusFilter === "All" ||
        delivery.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [deliveries, search, statusFilter]);

  const updateStatus = (id, newStatus) => {
    setDeliveries((prev) =>
      prev.map((delivery) =>
        delivery.id === id
          ? { ...delivery, status: newStatus }
          : delivery
      )
    );

    setSelectedDelivery((prev) =>
      prev && prev.id === id
        ? { ...prev, status: newStatus }
        : prev
    );
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case "Pending":
        return "bg-yellow-100 text-yellow-700";

      case "Accepted":
        return "bg-blue-100 text-blue-700";

      case "Picked Up":
        return "bg-indigo-100 text-indigo-700";

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
      case "Pending":
        return <Clock size={15} />;

      case "Accepted":
        return <CheckCircle size={15} />;

      case "Picked Up":
        return <Package size={15} />;

      case "In Transit":
        return <Truck size={15} />;

      case "Delivered":
        return <CheckCircle size={15} />;

      default:
        return null;
    }
  };

  const totalDeliveries = deliveries.length;

  const pendingDeliveries = deliveries.filter(
    (item) => item.status === "Pending"
  ).length;

  const inTransitDeliveries = deliveries.filter(
    (item) => item.status === "In Transit"
  ).length;

  const deliveredDeliveries = deliveries.filter(
    (item) => item.status === "Delivered"
  ).length;

  const activeDeliveries = deliveries.filter(
    (item) =>
      item.status !== "Delivered" &&
      item.status !== "Cancelled"
  ).length;

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-[#343E4F] sm:text-3xl">
          Delivery Management
        </h1>

        <p className="mt-1 text-sm text-gray-500">
          Monitor and manage agricultural product deliveries.
        </p>
      </div>

      {/* Statistics */}
      <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
        <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="rounded-xl bg-blue-50 p-3">
              <Truck
                size={22}
                className="text-blue-600"
              />
            </div>

            <div>
              <p className="text-sm text-gray-500">
                Total Deliveries
              </p>

              <p className="text-2xl font-bold text-[#343E4F]">
                {totalDeliveries}
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
          <p className="text-sm text-gray-500">
            Pending
          </p>

          <p className="mt-2 text-2xl font-bold text-yellow-600">
            {pendingDeliveries}
          </p>
        </div>

        <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
          <p className="text-sm text-gray-500">
            Active
          </p>

          <p className="mt-2 text-2xl font-bold text-indigo-600">
            {activeDeliveries}
          </p>
        </div>

        <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
          <p className="text-sm text-gray-500">
            In Transit
          </p>

          <p className="mt-2 text-2xl font-bold text-orange-600">
            {inTransitDeliveries}
          </p>
        </div>

        <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
          <p className="text-sm text-gray-500">
            Delivered
          </p>

          <p className="mt-2 text-2xl font-bold text-green-600">
            {deliveredDeliveries}
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="mb-6 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
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
              placeholder="Search delivery, order, customer..."
              className="w-full rounded-xl border border-gray-200 py-3 pl-11 pr-4 text-sm outline-none focus:border-[#E57036] focus:ring-2 focus:ring-[#E57036]/20"
            />
          </div>

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

      {/* Delivery Table */}
      <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
        <div className="border-b border-gray-100 p-6">
          <h2 className="font-bold text-[#343E4F]">
            Delivery Requests
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            {filteredDeliveries.length} delivery
            {filteredDeliveries.length !== 1
              ? "ies"
              : ""}{" "}
            found.
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[1050px]">
            <thead className="bg-[#343E4F] text-left text-xs uppercase text-white">
              <tr>
                <th className="px-6 py-4">
                  Delivery
                </th>

                <th className="px-6 py-4">
                  Order
                </th>

                <th className="px-6 py-4">
                  Customer
                </th>

                <th className="px-6 py-4">
                  Transporter
                </th>

                <th className="px-6 py-4">
                  Route
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
              {filteredDeliveries.map(
                (delivery) => (
                  <tr
                    key={delivery.id}
                    className="transition hover:bg-gray-50"
                  >
                    <td className="px-6 py-4">
                      <p className="font-semibold text-[#343E4F]">
                        {delivery.id}
                      </p>
                    </td>

                    <td className="px-6 py-4 text-sm font-medium text-gray-600">
                      {delivery.orderId}
                    </td>

                    <td className="px-6 py-4">
                      <p className="font-medium text-gray-700">
                        {delivery.customer}
                      </p>

                      <p className="text-xs text-gray-400">
                        {delivery.phone}
                      </p>
                    </td>

                    <td className="px-6 py-4 text-sm text-gray-600">
                      {delivery.transporter}
                    </td>

                    <td className="px-6 py-4">
                      <div className="text-sm">
                        <p className="font-medium text-gray-700">
                          {delivery.pickup}
                        </p>

                        <p className="text-xs text-gray-400">
                          → {delivery.destination}
                        </p>
                      </div>
                    </td>

                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${getStatusStyle(
                          delivery.status
                        )}`}
                      >
                        {getStatusIcon(
                          delivery.status
                        )}

                        {delivery.status}
                      </span>
                    </td>

                    <td className="px-6 py-4 text-sm text-gray-500">
                      {delivery.date}
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex justify-end">
                        <button
                          onClick={() =>
                            setSelectedDelivery(
                              delivery
                            )
                          }
                          className="flex items-center gap-2 rounded-lg bg-gray-100 px-3 py-2 text-sm font-semibold text-[#343E4F] hover:bg-gray-200"
                        >
                          <Eye size={16} />
                          View
                        </button>
                      </div>
                    </td>
                  </tr>
                )
              )}

              {filteredDeliveries.length ===
                0 && (
                <tr>
                  <td
                    colSpan="8"
                    className="px-6 py-12 text-center"
                  >
                    <Truck
                      size={42}
                      className="mx-auto mb-3 text-gray-300"
                    />

                    <p className="font-semibold text-gray-500">
                      No deliveries found
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
                className="rounded-lg p-2 text-gray-500 hover:bg-gray-100"
              >
                <X size={20} />
              </button>
            </div>

            <div className="space-y-6 p-6">
              {/* Status */}
              <div className="rounded-xl bg-gray-50 p-5">
                <p className="mb-3 text-sm font-semibold text-gray-500">
                  Delivery Status
                </p>

                <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                  <select
                    value={
                      selectedDelivery.status
                    }
                    onChange={(e) =>
                      updateStatus(
                        selectedDelivery.id,
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
                      selectedDelivery.status
                    )}`}
                  >
                    {getStatusIcon(
                      selectedDelivery.status
                    )}

                    {selectedDelivery.status}
                  </span>
                </div>
              </div>

              {/* Route */}
              <div>
                <h3 className="mb-3 font-bold text-[#343E4F]">
                  Delivery Route
                </h3>

                <div className="rounded-xl border border-gray-100 p-5">
                  <div className="flex items-start gap-4">
                    <div className="flex flex-col items-center">
                      <div className="rounded-full bg-blue-100 p-2">
                        <MapPin
                          size={18}
                          className="text-blue-600"
                        />
                      </div>

                      <div className="my-1 h-8 border-l-2 border-dashed border-gray-200" />

                      <div className="rounded-full bg-orange-100 p-2">
                        <MapPin
                          size={18}
                          className="text-orange-600"
                        />
                      </div>
                    </div>

                    <div className="flex-1">
                      <div>
                        <p className="text-xs text-gray-400">
                          Pickup Location
                        </p>

                        <p className="font-semibold text-gray-700">
                          {selectedDelivery.pickup}
                        </p>
                      </div>

                      <div className="mt-5">
                        <p className="text-xs text-gray-400">
                          Destination
                        </p>

                        <p className="font-semibold text-gray-700">
                          {selectedDelivery.destination}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Customer + Transporter */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="rounded-xl bg-gray-50 p-5">
                  <p className="text-xs text-gray-400">
                    Customer
                  </p>

                  <p className="mt-1 font-semibold text-gray-700">
                    {selectedDelivery.customer}
                  </p>

                  <p className="mt-1 text-sm text-gray-500">
                    {selectedDelivery.phone}
                  </p>
                </div>

                <div className="rounded-xl bg-gray-50 p-5">
                  <p className="text-xs text-gray-400">
                    Transporter
                  </p>

                  <p className="mt-1 font-semibold text-gray-700">
                    {selectedDelivery.transporter}
                  </p>
                </div>
              </div>

              {/* Order */}
              <div className="rounded-xl border border-gray-100 p-5">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-gray-400">
                      Related Order
                    </p>

                    <p className="mt-1 font-bold text-[#343E4F]">
                      {selectedDelivery.orderId}
                    </p>
                  </div>

                  <div className="text-right">
                    <p className="text-xs text-gray-400">
                      Date
                    </p>

                    <p className="mt-1 font-semibold text-gray-700">
                      {selectedDelivery.date}
                    </p>
                  </div>
                </div>
              </div>

              <button
                onClick={() =>
                  setSelectedDelivery(null)
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
        Delivery data is currently frontend demo data.
        It will be connected to the backend and database later.
      </div>
    </div>
  );
}

export default Deliveries;