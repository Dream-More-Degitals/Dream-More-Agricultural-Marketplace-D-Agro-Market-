import {
  Truck,
  Clock,
  CheckCircle,
  MapPin,
  DollarSign,
  Package,
  ArrowRight,
} from "lucide-react";
import { Link } from "react-router-dom";

function Dashboard() {
  const deliveries = [
    {
      id: "#DEL-001",
      product: "Premium Teff",
      from: "Jimma",
      to: "Addis Ababa",
      status: "In Transit",
      amount: "2,500 ETB",
    },
    {
      id: "#DEL-002",
      product: "Coffee Beans",
      from: "Jimma",
      to: "Bahir Dar",
      status: "Pending",
      amount: "3,200 ETB",
    },
    {
      id: "#DEL-003",
      product: "Maize",
      from: "Nekemte",
      to: "Addis Ababa",
      status: "Delivered",
      amount: "1,800 ETB",
    },
  ];

  return (
    <div>

      {/* HEADER */}

      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

        <div>
          <p className="text-sm text-gray-500">
            Welcome back
          </p>

          <h1 className="text-2xl font-bold text-[#343E4F] sm:text-3xl">
            Transporter Dashboard
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            Manage your agricultural deliveries and transportation.
          </p>
        </div>

        <Link
          to="/transport/deliveries"
          className="flex items-center justify-center gap-2 rounded-lg bg-[#E57036] px-5 py-3 text-sm font-semibold text-white transition hover:opacity-90"
        >
          <Truck size={18} />
          View Deliveries
        </Link>

      </div>


      {/* STATISTICS */}

      <div className="mb-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">

        <StatCard
          title="Total Deliveries"
          value="48"
          icon={Truck}
        />

        <StatCard
          title="Pending"
          value="6"
          icon={Clock}
        />

        <StatCard
          title="In Transit"
          value="4"
          icon={MapPin}
        />

        <StatCard
          title="Completed"
          value="38"
          icon={CheckCircle}
        />

      </div>


      {/* SECOND STATISTICS */}

      <div className="mb-8 grid gap-5 md:grid-cols-2">

        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">

          <div className="flex items-center gap-3">

            <div className="rounded-lg bg-orange-50 p-3 text-[#E57036]">
              <DollarSign size={22} />
            </div>

            <div>
              <p className="text-sm text-gray-500">
                Total Earnings
              </p>

              <h2 className="text-2xl font-bold text-[#343E4F]">
                85,500 ETB
              </h2>
            </div>

          </div>

          <p className="mt-4 text-xs text-green-600">
            +12.5% from last month
          </p>

        </div>


        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">

          <div className="flex items-center gap-3">

            <div className="rounded-lg bg-orange-50 p-3 text-[#E57036]">
              <Package size={22} />
            </div>

            <div>
              <p className="text-sm text-gray-500">
                Packages Delivered
              </p>

              <h2 className="text-2xl font-bold text-[#343E4F]">
                126
              </h2>
            </div>

          </div>

          <p className="mt-4 text-xs text-gray-500">
            Successfully delivered packages
          </p>

        </div>

      </div>


      {/* RECENT DELIVERIES */}

      <div className="rounded-xl border border-gray-200 bg-white shadow-sm">

        <div className="flex flex-col gap-3 border-b border-gray-100 p-6 sm:flex-row sm:items-center sm:justify-between">

          <div>
            <h2 className="text-lg font-bold text-[#343E4F]">
              Recent Deliveries
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Your latest transportation activities.
            </p>
          </div>

          <Link
            to="/transport/deliveries"
            className="flex items-center gap-1 text-sm font-semibold text-[#E57036]"
          >
            View All
            <ArrowRight size={16} />
          </Link>

        </div>


        <div className="overflow-x-auto">

          <table className="w-full min-w-[700px]">

            <thead className="bg-[#F8F9FA]">

              <tr className="text-left text-xs uppercase tracking-wide text-gray-500">

                <th className="px-6 py-4">
                  Delivery
                </th>

                <th className="px-6 py-4">
                  Product
                </th>

                <th className="px-6 py-4">
                  Route
                </th>

                <th className="px-6 py-4">
                  Status
                </th>

                <th className="px-6 py-4">
                  Earnings
                </th>

              </tr>

            </thead>

            <tbody>

              {deliveries.map((delivery) => (

                <tr
                  key={delivery.id}
                  className="border-t border-gray-100"
                >

                  <td className="px-6 py-4 text-sm font-semibold text-[#343E4F]">
                    {delivery.id}
                  </td>

                  <td className="px-6 py-4 text-sm text-gray-600">
                    {delivery.product}
                  </td>

                  <td className="px-6 py-4 text-sm text-gray-600">
                    {delivery.from} → {delivery.to}
                  </td>

                  <td className="px-6 py-4">

                    <span
                      className={`rounded-full px-3 py-1 text-xs font-medium ${
                        delivery.status === "Delivered"
                          ? "bg-green-50 text-green-600"
                          : delivery.status === "In Transit"
                          ? "bg-blue-50 text-blue-600"
                          : "bg-orange-50 text-[#E57036]"
                      }`}
                    >
                      {delivery.status}
                    </span>

                  </td>

                  <td className="px-6 py-4 text-sm font-semibold text-[#343E4F]">
                    {delivery.amount}
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


function StatCard({ title, value, icon: Icon }) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">

      <div className="flex items-center justify-between">

        <div>
          <p className="text-sm text-gray-500">
            {title}
          </p>

          <h2 className="mt-2 text-2xl font-bold text-[#343E4F]">
            {value}
          </h2>
        </div>

        <div className="rounded-lg bg-orange-50 p-3 text-[#E57036]">
          <Icon size={22} />
        </div>

      </div>

    </div>
  );
}

export default Dashboard;