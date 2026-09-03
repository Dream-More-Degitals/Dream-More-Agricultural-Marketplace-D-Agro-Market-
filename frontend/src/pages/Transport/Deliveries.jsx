import { useState } from "react";
import {
  Search,
  Truck,
  MapPin,
  Package,
  CheckCircle,
  Clock,
} from "lucide-react";

function Deliveries() {
  const [search, setSearch] = useState("");

  const [deliveries, setDeliveries] = useState([
    {
      id: "#DEL-001",
      product: "Premium Teff",
      quantity: "20 Bags",
      from: "Jimma",
      to: "Addis Ababa",
      customer: "Abebe Trading",
      status: "Pending",
      payment: "2,500 ETB",
    },
    {
      id: "#DEL-002",
      product: "Coffee Beans",
      quantity: "10 Bags",
      from: "Jimma",
      to: "Bahir Dar",
      customer: "Green Coffee PLC",
      status: "Accepted",
      payment: "3,200 ETB",
    },
    {
      id: "#DEL-003",
      product: "Maize",
      quantity: "30 Bags",
      from: "Nekemte",
      to: "Addis Ababa",
      customer: "Ethiopian Foods",
      status: "In Transit",
      payment: "1,800 ETB",
    },
    {
      id: "#DEL-004",
      product: "Wheat",
      quantity: "15 Bags",
      from: "Bale",
      to: "Adama",
      customer: "Agro Market",
      status: "Delivered",
      payment: "2,100 ETB",
    },
  ]);

  const updateStatus = (id, newStatus) => {
    setDeliveries(
      deliveries.map((delivery) =>
        delivery.id === id
          ? { ...delivery, status: newStatus }
          : delivery
      )
    );
  };

  const filteredDeliveries = deliveries.filter((delivery) =>
    `${delivery.product} ${delivery.from} ${delivery.to} ${delivery.customer}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div>

      {/* HEADER */}

      <div className="mb-8">

        <h1 className="text-2xl font-bold text-[#343E4F] sm:text-3xl">
          Deliveries
        </h1>

        <p className="mt-2 text-sm text-gray-500">
          Manage your delivery requests and transportation orders.
        </p>

      </div>


      {/* SUMMARY */}

      <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

        <SummaryCard
          title="All Deliveries"
          value={deliveries.length}
          icon={Truck}
        />

        <SummaryCard
          title="Pending"
          value={
            deliveries.filter(
              (item) => item.status === "Pending"
            ).length
          }
          icon={Clock}
        />

        <SummaryCard
          title="In Transit"
          value={
            deliveries.filter(
              (item) => item.status === "In Transit"
            ).length
          }
          icon={MapPin}
        />

        <SummaryCard
          title="Delivered"
          value={
            deliveries.filter(
              (item) => item.status === "Delivered"
            ).length
          }
          icon={CheckCircle}
        />

      </div>


      {/* SEARCH */}

      <div className="mb-6 flex items-center gap-3 rounded-xl border border-gray-200 bg-white px-4 shadow-sm">

        <Search
          size={19}
          className="text-gray-400"
        />

        <input
          type="text"
          placeholder="Search deliveries..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-transparent py-4 text-sm outline-none"
        />

      </div>


      {/* DELIVERY CARDS */}

      <div className="grid gap-5 xl:grid-cols-2">

        {filteredDeliveries.map((delivery) => (

          <div
            key={delivery.id}
            className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm"
          >

            {/* TOP */}

            <div className="flex items-start justify-between gap-4">

              <div className="flex items-center gap-3">

                <div className="rounded-lg bg-orange-50 p-3 text-[#E57036]">
                  <Package size={22} />
                </div>

                <div>

                  <h2 className="font-bold text-[#343E4F]">
                    {delivery.product}
                  </h2>

                  <p className="text-xs text-gray-400">
                    {delivery.id}
                  </p>

                </div>

              </div>

              <StatusBadge status={delivery.status} />

            </div>


            {/* ROUTE */}

            <div className="my-6 rounded-lg bg-[#F8F9FA] p-4">

              <div className="flex items-center gap-3">

                <MapPin
                  size={20}
                  className="text-[#E57036]"
                />

                <div>

                  <p className="text-xs text-gray-400">
                    Pickup
                  </p>

                  <p className="text-sm font-semibold text-[#343E4F]">
                    {delivery.from}
                  </p>

                </div>

              </div>


              <div className="ml-2 my-2 h-6 border-l border-dashed border-gray-300" />


              <div className="flex items-center gap-3">

                <MapPin
                  size={20}
                  className="text-[#E57036]"
                />

                <div>

                  <p className="text-xs text-gray-400">
                    Destination
                  </p>

                  <p className="text-sm font-semibold text-[#343E4F]">
                    {delivery.to}
                  </p>

                </div>

              </div>

            </div>


            {/* DETAILS */}

            <div className="grid grid-cols-2 gap-4 text-sm">

              <div>

                <p className="text-xs text-gray-400">
                  Customer
                </p>

                <p className="mt-1 font-medium text-[#343E4F]">
                  {delivery.customer}
                </p>

              </div>

              <div>

                <p className="text-xs text-gray-400">
                  Quantity
                </p>

                <p className="mt-1 font-medium text-[#343E4F]">
                  {delivery.quantity}
                </p>

              </div>

              <div>

                <p className="text-xs text-gray-400">
                  Delivery Fee
                </p>

                <p className="mt-1 font-bold text-[#E57036]">
                  {delivery.payment}
                </p>

              </div>

            </div>


            {/* ACTIONS */}

            <div className="mt-6 flex gap-3 border-t border-gray-100 pt-5">

              {delivery.status === "Pending" && (

                <button
                  onClick={() =>
                    updateStatus(
                      delivery.id,
                      "Accepted"
                    )
                  }
                  className="flex-1 rounded-lg bg-[#E57036] px-4 py-3 text-sm font-semibold text-white hover:opacity-90"
                >
                  Accept Delivery
                </button>

              )}

              {delivery.status === "Accepted" && (

                <button
                  onClick={() =>
                    updateStatus(
                      delivery.id,
                      "In Transit"
                    )
                  }
                  className="flex-1 rounded-lg bg-[#343E4F] px-4 py-3 text-sm font-semibold text-white hover:opacity-90"
                >
                  Start Delivery
                </button>

              )}

              {delivery.status === "In Transit" && (

                <button
                  onClick={() =>
                    updateStatus(
                      delivery.id,
                      "Delivered"
                    )
                  }
                  className="flex-1 rounded-lg bg-green-600 px-4 py-3 text-sm font-semibold text-white hover:opacity-90"
                >
                  Mark as Delivered
                </button>

              )}

              {delivery.status === "Delivered" && (

                <div className="flex w-full items-center justify-center gap-2 rounded-lg bg-green-50 px-4 py-3 text-sm font-semibold text-green-600">
                  <CheckCircle size={18} />
                  Delivery Completed
                </div>

              )}

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}


function SummaryCard({ title, value, icon: Icon }) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">

      <div className="flex items-center justify-between">

        <div>

          <p className="text-sm text-gray-500">
            {title}
          </p>

          <p className="mt-2 text-2xl font-bold text-[#343E4F]">
            {value}
          </p>

        </div>

        <div className="rounded-lg bg-orange-50 p-3 text-[#E57036]">
          <Icon size={21} />
        </div>

      </div>

    </div>
  );
}


function StatusBadge({ status }) {
  const styles = {
    Pending: "bg-orange-50 text-[#E57036]",
    Accepted: "bg-blue-50 text-blue-600",
    "In Transit": "bg-purple-50 text-purple-600",
    Delivered: "bg-green-50 text-green-600",
  };

  return (
    <span
      className={`rounded-full px-3 py-1 text-xs font-medium ${
        styles[status]
      }`}
    >
      {status}
    </span>
  );
}

export default Deliveries;