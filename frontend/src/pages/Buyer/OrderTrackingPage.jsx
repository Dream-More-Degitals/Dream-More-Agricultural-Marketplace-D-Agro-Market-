import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  ArrowLeft,
  CheckCircle,
  Clock,
  Package,
  Truck,
  MapPin,
} from "lucide-react";

const steps = [
  {
    status: "Processing",
    title: "Order Placed",
    description: "Your order has been received.",
    icon: <Clock size={20} />,
  },
  {
    status: "Confirmed",
    title: "Order Confirmed",
    description: "The seller has confirmed your order.",
    icon: <CheckCircle size={20} />,
  },
  {
    status: "Preparing",
    title: "Preparing Order",
    description: "The products are being prepared.",
    icon: <Package size={20} />,
  },
  {
    status: "In Transit",
    title: "In Transit",
    description: "Your order is on the way.",
    icon: <Truck size={20} />,
  },
  {
    status: "Delivered",
    title: "Delivered",
    description: "Your order has been delivered.",
    icon: <CheckCircle size={20} />,
  },
];

function OrderTrackingPage() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const orders =
      JSON.parse(localStorage.getItem("orders")) || [];

    const foundOrder = orders.find(
      (item) => item.id === id
    );

    setOrder(foundOrder);
  }, [id]);

  if (!order) {
    return (
      <div className="flex min-h-[70vh] flex-col items-center justify-center text-center">
        <Package size={50} className="text-gray-300" />

        <h1 className="mt-4 text-2xl font-bold text-[#343E4F]">
          Order Not Found
        </h1>

        <p className="mt-2 text-gray-500">
          We couldn't find this order.
        </p>

        <Link
          to="/buyer/orders"
          className="mt-6 rounded-xl bg-[#E57036] px-6 py-3 font-semibold text-white"
        >
          Back to My Orders
        </Link>
      </div>
    );
  }

  const currentIndex = steps.findIndex(
    (step) => step.status === order.status
  );

  return (
    <div className="mx-auto max-w-5xl">
      {/* Header */}
      <div className="mb-6">
        <Link
          to="/buyer/orders"
          className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-[#E57036]"
        >
          <ArrowLeft size={17} />
          Back to My Orders
        </Link>

        <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-[#343E4F]">
              Track Order
            </h1>

            <p className="mt-1 text-sm text-gray-500">
              Order ID: {order.id}
            </p>
          </div>

          <span className="w-fit rounded-full bg-orange-50 px-4 py-2 text-sm font-semibold text-[#E57036]">
            {order.status}
          </span>
        </div>
      </div>

      {/* Tracking Timeline */}
      <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-bold text-[#343E4F]">
          Delivery Progress
        </h2>

        <div className="mt-7">
          {steps.map((step, index) => {
            const completed = index <= currentIndex;
            const active = index === currentIndex;

            return (
              <div
                key={step.status}
                className="relative flex gap-4 pb-8 last:pb-0"
              >
                {/* Line */}
                {index < steps.length - 1 && (
                  <div
                    className={`absolute left-[19px] top-10 h-full w-0.5 ${
                      index < currentIndex
                        ? "bg-[#E57036]"
                        : "bg-gray-200"
                    }`}
                  />
                )}

                {/* Icon */}
                <div
                  className={`relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${
                    completed
                      ? "bg-[#E57036] text-white"
                      : "bg-gray-100 text-gray-400"
                  } ${active ? "ring-4 ring-orange-100" : ""}`}
                >
                  {step.icon}
                </div>

                {/* Text */}
                <div className="pt-1">
                  <h3
                    className={`font-semibold ${
                      completed
                        ? "text-[#343E4F]"
                        : "text-gray-400"
                    }`}
                  >
                    {step.title}
                  </h3>

                  <p className="mt-1 text-sm text-gray-500">
                    {step.description}
                  </p>

                  {active && (
                    <span className="mt-2 inline-block text-xs font-semibold text-[#E57036]">
                      Current Status
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Order & Delivery Details */}
      <div className="mt-6 grid gap-6 md:grid-cols-2">
        {/* Products */}
        <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
          <h2 className="font-bold text-[#343E4F]">
            Order Items
          </h2>

          <div className="mt-5 space-y-4">
            {order.items.map((item) => (
              <div
                key={item.slug}
                className="flex gap-3"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-16 w-16 rounded-xl object-cover"
                />

                <div className="min-w-0 flex-1">
                  <p className="font-semibold text-[#343E4F]">
                    {item.name}
                  </p>

                  <p className="text-sm text-gray-500">
                    Quantity: {item.quantity}
                  </p>
                </div>

                <p className="font-semibold text-[#E57036]">
                  ETB{" "}
                  {(
                    item.price * item.quantity
                  ).toLocaleString()}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-5 border-t pt-4">
            <div className="flex justify-between">
              <span className="font-bold text-[#343E4F]">
                Total
              </span>

              <span className="font-bold text-[#E57036]">
                ETB {order.total.toLocaleString()}
              </span>
            </div>
          </div>
        </div>

        {/* Delivery */}
        <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
          <h2 className="font-bold text-[#343E4F]">
            Delivery Details
          </h2>

          <div className="mt-5 space-y-5">
            <div className="flex gap-3">
              <MapPin
                size={20}
                className="mt-1 text-[#E57036]"
              />

              <div>
                <p className="text-sm font-semibold text-[#343E4F]">
                  Delivery Address
                </p>

                <p className="mt-1 text-sm text-gray-500">
                  {order.customer.address}
                </p>

                <p className="text-sm text-gray-500">
                  {order.customer.city},{" "}
                  {order.customer.region}
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <Truck
                size={20}
                className="mt-1 text-[#E57036]"
              />

              <div>
                <p className="text-sm font-semibold text-[#343E4F]">
                  Delivery Method
                </p>

                <p className="mt-1 text-sm capitalize text-gray-500">
                  {order.customer.deliveryMethod} delivery
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <Package
                size={20}
                className="mt-1 text-[#E57036]"
              />

              <div>
                <p className="text-sm font-semibold text-[#343E4F]">
                  Customer
                </p>

                <p className="mt-1 text-sm text-gray-500">
                  {order.customer.fullName}
                </p>

                <p className="text-sm text-gray-500">
                  {order.customer.phone}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderTrackingPage;