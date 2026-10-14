import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Truck,
  Package,
  Clock,
  CheckCircle,
  MapPin,
  ArrowRight,
  Navigation,
} from "lucide-react";
import { deliveryAPI } from "../../services/api";

const statusStyles = {
  Delivered: "bg-green-100 text-green-700",
  Completed: "bg-green-100 text-green-700",
  "In Transit": "bg-purple-100 text-purple-700",
  "Picked Up": "bg-purple-100 text-purple-700",
  Accepted: "bg-blue-100 text-blue-700",
  Cancelled: "bg-red-100 text-red-700",
};

function Dashboard() {
  const [deliveries, setDeliveries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;

    const loadDeliveries = async () => {
      try {
        const res = await deliveryAPI.getAll();
        if (!cancelled) setDeliveries(res?.deliveries || []);
      } catch (err) {
        if (!cancelled) setError(err.message || "Failed to load deliveries.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    loadDeliveries();

    return () => {
      cancelled = true;
    };
  }, []);

  const readyCount = deliveries.filter(
    (delivery) => delivery.status === "Ready for Pickup"
  ).length;

  const transitCount = deliveries.filter(
    (delivery) =>
      delivery.status === "In Transit" || delivery.status === "Picked Up"
  ).length;

  const deliveredCount = deliveries.filter(
    (delivery) =>
      delivery.status === "Delivered" || delivery.status === "Completed"
  ).length;

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-[#343E4F] sm:text-3xl">
          Transporter Dashboard
        </h1>

        <p className="mt-1 text-sm text-gray-500">
          Manage your deliveries and track transportation
          activities.
        </p>
      </div>

      {/* Statistics */}
      <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {/* Total Deliveries */}
        <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="rounded-xl bg-blue-50 p-3">
              <Truck size={24} className="text-blue-600" />
            </div>

            <div>
              <p className="text-sm text-gray-500">Total Deliveries</p>

              <p className="text-2xl font-bold text-[#343E4F]">
                {deliveries.length}
              </p>
            </div>
          </div>
        </div>

        {/* Ready */}
        <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="rounded-xl bg-orange-50 p-3">
              <Package size={24} className="text-orange-600" />
            </div>

            <div>
              <p className="text-sm text-gray-500">Ready for Pickup</p>

              <p className="text-2xl font-bold text-[#343E4F]">
                {readyCount}
              </p>
            </div>
          </div>
        </div>

        {/* In Transit */}
        <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="rounded-xl bg-purple-50 p-3">
              <Clock size={24} className="text-purple-600" />
            </div>

            <div>
              <p className="text-sm text-gray-500">In Transit</p>

              <p className="text-2xl font-bold text-[#343E4F]">
                {transitCount}
              </p>
            </div>
          </div>
        </div>

        {/* Delivered */}
        <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="rounded-xl bg-green-50 p-3">
              <CheckCircle size={24} className="text-green-600" />
            </div>

            <div>
              <p className="text-sm text-gray-500">Delivered</p>

              <p className="text-2xl font-bold text-[#343E4F]">
                {deliveredCount}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mb-8">
        <h2 className="mb-4 text-lg font-bold text-[#343E4F]">
          Quick Actions
        </h2>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Link
            to="/transport/deliveries"
            className="group rounded-2xl bg-[#343E4F] p-6 text-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
          >
            <div className="flex items-center justify-between">
              <div>
                <div className="mb-3 inline-flex rounded-xl bg-white/10 p-3">
                  <Truck size={24} />
                </div>

                <h3 className="font-semibold">Manage Deliveries</h3>

                <p className="mt-1 text-sm text-white/60">
                  View and update delivery requests.
                </p>
              </div>

              <ArrowRight
                size={22}
                className="transition group-hover:translate-x-1"
              />
            </div>
          </Link>

          <Link
            to="/transport/profile"
            className="group rounded-2xl bg-[#E57036] p-6 text-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
          >
            <div className="flex items-center justify-between">
              <div>
                <div className="mb-3 inline-flex rounded-xl bg-white/10 p-3">
                  <Navigation size={24} />
                </div>

                <h3 className="font-semibold">Transporter Profile</h3>

                <p className="mt-1 text-sm text-white/70">
                  Manage your transportation information.
                </p>
              </div>

              <ArrowRight
                size={22}
                className="transition group-hover:translate-x-1"
              />
            </div>
          </Link>
        </div>
      </div>

      {/* Recent Deliveries */}
      <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
        <div className="flex items-center justify-between border-b border-gray-100 p-6">
          <div>
            <h2 className="font-bold text-[#343E4F]">Recent Deliveries</h2>

            <p className="mt-1 text-sm text-gray-500">
              Your latest transportation activities.
            </p>
          </div>

          <Link
            to="/transport/deliveries"
            className="text-sm font-semibold text-[#E57036] hover:underline"
          >
            View All
          </Link>
        </div>

        {loading ? (
          <p className="p-6 text-sm text-gray-500">Loading deliveries...</p>
        ) : error ? (
          <p className="p-6 text-sm text-red-600">{error}</p>
        ) : deliveries.length === 0 ? (
          <p className="p-6 text-sm text-gray-500">
            No deliveries yet. New buyer orders will appear here.
          </p>
        ) : (
          <div className="divide-y divide-gray-100">
            {deliveries.slice(0, 5).map((delivery) => (
              <div
                key={delivery._id}
                className="flex flex-col gap-4 p-6 lg:flex-row lg:items-center lg:justify-between"
              >
                {/* Delivery Info */}
                <div className="flex items-start gap-4">
                  <div className="rounded-xl bg-gray-100 p-3">
                    <Truck size={22} className="text-[#343E4F]" />
                  </div>

                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="font-semibold text-[#343E4F]">
                        {delivery.deliveryId}
                      </h3>

                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${
                          statusStyles[delivery.status] ||
                          "bg-orange-100 text-orange-700"
                        }`}
                      >
                        {delivery.status}
                      </span>
                    </div>

                    <p className="mt-1 text-sm text-gray-500">
                      Order: {delivery.orderId || delivery.orderNumber}
                    </p>

                    <p className="mt-1 text-sm font-medium text-gray-700">
                      {delivery.customer}
                    </p>
                  </div>
                </div>

                {/* Route */}
                <div className="flex flex-col gap-2 text-sm lg:min-w-[320px]">
                  <div className="flex items-center gap-2 text-gray-600">
                    <MapPin size={17} className="text-[#E57036]" />

                    <span>{delivery.pickup}</span>
                  </div>

                  <div className="ml-2 border-l border-dashed border-gray-300 pl-4 text-xs text-gray-400">
                    Delivery route
                  </div>

                  <div className="flex items-center gap-2 text-gray-600">
                    <MapPin size={17} className="text-green-600" />

                    <span>{delivery.destination}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;