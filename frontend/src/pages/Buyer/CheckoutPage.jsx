import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  MapPin,
  Truck,
  CreditCard,
  ShoppingBag,
  CheckCircle,
} from "lucide-react";

function CheckoutPage() {
  const navigate = useNavigate();

  const [cart, setCart] = useState([]);
  const [orderPlaced, setOrderPlaced] = useState(false);

  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    region: "",
    city: "",
    address: "",
    deliveryMethod: "standard",
    paymentMethod: "cash",
  });

  // Load cart
  useEffect(() => {
    try {
      const savedCart = JSON.parse(localStorage.getItem("cart")) || [];

      if (Array.isArray(savedCart)) {
        setCart(savedCart);
      } else {
        setCart([]);
      }
    } catch (error) {
      console.error("Failed to load cart:", error);
      setCart([]);
    }
  }, []);

  // Handle form changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((previousForm) => ({
      ...previousForm,
      [name]: value,
    }));
  };

  // Calculate subtotal
  const subtotal = cart.reduce((total, item) => {
    const price = Number(item.price || 0);
    const quantity = Number(item.quantity || 0);

    return total + price * quantity;
  }, 0);

  // Delivery fee
  const deliveryFee =
    form.deliveryMethod === "express" ? 300 : 150;

  // Final total
  const total = subtotal + deliveryFee;

  // Place order
  const handlePlaceOrder = (e) => {
    e.preventDefault();

    if (cart.length === 0) {
      alert("Your cart is empty.");
      navigate("/buyer/marketplace");
      return;
    }

    const newOrder = {
      id: `ORD-${Date.now()}`,

      // Products purchased
      items: cart,

      // Buyer information
      customer: {
        fullName: form.fullName,
        phone: form.phone,
        region: form.region,
        city: form.city,
        address: form.address,
      },

      // Delivery information
      deliveryMethod: form.deliveryMethod,
      deliveryFee,

      // Payment information
      paymentMethod: form.paymentMethod,

      // Prices
      subtotal,
      total,

      // Order status
      status: "Processing",

      // Date
      date: new Date().toLocaleDateString(),

      // Exact timestamp
      createdAt: new Date().toISOString(),
    };

    // Get existing orders
    let existingOrders = [];

    try {
      existingOrders =
        JSON.parse(localStorage.getItem("orders")) || [];

      if (!Array.isArray(existingOrders)) {
        existingOrders = [];
      }
    } catch (error) {
      console.error("Failed to load existing orders:", error);
      existingOrders = [];
    }

    // Save new order
    localStorage.setItem(
      "orders",
      JSON.stringify([newOrder, ...existingOrders])
    );

    // Remove cart
    localStorage.removeItem("cart");

    // Notify other components that cart changed
    window.dispatchEvent(new Event("cartUpdated"));

    // Show success page
    setOrderPlaced(true);
  };

  // --------------------------------------------------
  // ORDER SUCCESS PAGE
  // --------------------------------------------------

  if (orderPlaced) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center px-4 py-10">
        <div className="w-full max-w-lg rounded-3xl bg-white p-8 text-center shadow-sm">
          {/* Success Icon */}
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-50">
            <CheckCircle
              size={45}
              className="text-green-600"
            />
          </div>

          {/* Title */}
          <h1 className="mt-6 text-2xl font-bold text-[#343E4F]">
            Order Placed Successfully!
          </h1>

          {/* Description */}
          <p className="mt-3 text-gray-500">
            Your order has been received and is now being
            processed.
          </p>

          {/* Information */}
          <div className="mt-6 rounded-xl bg-gray-50 p-4 text-sm text-gray-600">
            You can track your order from the{" "}
            <span className="font-semibold text-[#E57036]">
              My Orders
            </span>{" "}
            section.
          </div>

          {/* Buttons */}
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Link
              to="/buyer/orders"
              className="flex-1 rounded-xl bg-[#E57036] px-5 py-3 font-semibold text-white transition hover:bg-[#d85f29]"
            >
              View My Orders
            </Link>

            <Link
              to="/buyer/marketplace"
              className="flex-1 rounded-xl border border-gray-200 px-5 py-3 font-semibold text-[#343E4F] transition hover:bg-gray-50"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // --------------------------------------------------
  // EMPTY CART
  // --------------------------------------------------

  if (cart.length === 0) {
    return (
      <div className="flex min-h-[70vh] flex-col items-center justify-center px-4 text-center">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-orange-50">
          <ShoppingBag
            size={40}
            className="text-[#E57036]"
          />
        </div>

        <h1 className="mt-5 text-2xl font-bold text-[#343E4F]">
          Your Cart is Empty
        </h1>

        <p className="mt-2 text-gray-500">
          Add products to your cart before checkout.
        </p>

        <Link
          to="/buyer/marketplace"
          className="mt-6 rounded-xl bg-[#E57036] px-6 py-3 font-semibold text-white transition hover:bg-[#d85f29]"
        >
          Browse Marketplace
        </Link>
      </div>
    );
  }

  // --------------------------------------------------
  // CHECKOUT PAGE
  // --------------------------------------------------

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-6">
        <Link
          to="/buyer/cart"
          className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 transition hover:text-[#E57036]"
        >
          <ArrowLeft size={17} />
          Back to Cart
        </Link>

        <h1 className="mt-3 text-2xl font-bold text-[#343E4F] sm:text-3xl">
          Checkout
        </h1>

        <p className="mt-1 text-gray-500">
          Complete your delivery and payment information.
        </p>
      </div>

      <form onSubmit={handlePlaceOrder}>
        <div className="grid gap-6 lg:grid-cols-3">
          {/* ==========================================
              LEFT SIDE
          ========================================== */}

          <div className="space-y-6 lg:col-span-2">
            {/* ========================================
                DELIVERY INFORMATION
            ======================================== */}

            <section className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm sm:p-6">
              <div className="mb-5 flex items-center gap-3">
                <div className="rounded-lg bg-orange-50 p-2">
                  <MapPin
                    size={20}
                    className="text-[#E57036]"
                  />
                </div>

                <div>
                  <h2 className="font-bold text-[#343E4F]">
                    Delivery Information
                  </h2>

                  <p className="text-sm text-gray-500">
                    Where should we deliver your order?
                  </p>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                {/* Full Name */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Full Name
                  </label>

                  <input
                    required
                    type="text"
                    name="fullName"
                    value={form.fullName}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none transition focus:border-[#E57036] focus:ring-2 focus:ring-[#E57036]/10"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Phone Number
                  </label>

                  <input
                    required
                    type="tel"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="09XXXXXXXX"
                    className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none transition focus:border-[#E57036] focus:ring-2 focus:ring-[#E57036]/10"
                  />
                </div>

                {/* Region */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Region
                  </label>

                  <input
                    required
                    type="text"
                    name="region"
                    value={form.region}
                    onChange={handleChange}
                    placeholder="e.g. Oromia"
                    className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none transition focus:border-[#E57036] focus:ring-2 focus:ring-[#E57036]/10"
                  />
                </div>

                {/* City */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    City
                  </label>

                  <input
                    required
                    type="text"
                    name="city"
                    value={form.city}
                    onChange={handleChange}
                    placeholder="e.g. Jimma"
                    className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none transition focus:border-[#E57036] focus:ring-2 focus:ring-[#E57036]/10"
                  />
                </div>

                {/* Address */}
                <div className="sm:col-span-2">
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Delivery Address
                  </label>

                  <textarea
                    required
                    name="address"
                    value={form.address}
                    onChange={handleChange}
                    rows="3"
                    placeholder="Enter your detailed delivery address"
                    className="w-full resize-none rounded-xl border border-gray-200 px-4 py-3 outline-none transition focus:border-[#E57036] focus:ring-2 focus:ring-[#E57036]/10"
                  />
                </div>
              </div>
            </section>

            {/* ========================================
                DELIVERY METHOD
            ======================================== */}

            <section className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm sm:p-6">
              <div className="mb-5 flex items-center gap-3">
                <div className="rounded-lg bg-orange-50 p-2">
                  <Truck
                    size={20}
                    className="text-[#E57036]"
                  />
                </div>

                <div>
                  <h2 className="font-bold text-[#343E4F]">
                    Delivery Method
                  </h2>

                  <p className="text-sm text-gray-500">
                    Choose how you want to receive your order.
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                {/* Standard */}
                <label
                  className={`flex cursor-pointer items-center justify-between rounded-xl border p-4 transition ${
                    form.deliveryMethod === "standard"
                      ? "border-[#E57036] bg-orange-50/50"
                      : "border-gray-200 hover:bg-gray-50"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="deliveryMethod"
                      value="standard"
                      checked={
                        form.deliveryMethod === "standard"
                      }
                      onChange={handleChange}
                      className="accent-[#E57036]"
                    />

                    <div>
                      <p className="font-semibold text-[#343E4F]">
                        Standard Delivery
                      </p>

                      <p className="text-sm text-gray-500">
                        2–5 business days
                      </p>
                    </div>
                  </div>

                  <span className="font-semibold text-[#343E4F]">
                    ETB 150
                  </span>
                </label>

                {/* Express */}
                <label
                  className={`flex cursor-pointer items-center justify-between rounded-xl border p-4 transition ${
                    form.deliveryMethod === "express"
                      ? "border-[#E57036] bg-orange-50/50"
                      : "border-gray-200 hover:bg-gray-50"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="deliveryMethod"
                      value="express"
                      checked={
                        form.deliveryMethod === "express"
                      }
                      onChange={handleChange}
                      className="accent-[#E57036]"
                    />

                    <div>
                      <p className="font-semibold text-[#343E4F]">
                        Express Delivery
                      </p>

                      <p className="text-sm text-gray-500">
                        1–2 business days
                      </p>
                    </div>
                  </div>

                  <span className="font-semibold text-[#343E4F]">
                    ETB 300
                  </span>
                </label>
              </div>
            </section>

            {/* ========================================
                PAYMENT METHOD
            ======================================== */}

            <section className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm sm:p-6">
              <div className="mb-5 flex items-center gap-3">
                <div className="rounded-lg bg-orange-50 p-2">
                  <CreditCard
                    size={20}
                    className="text-[#E57036]"
                  />
                </div>

                <div>
                  <h2 className="font-bold text-[#343E4F]">
                    Payment Method
                  </h2>

                  <p className="text-sm text-gray-500">
                    Select your preferred payment method.
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                {/* Cash */}
                <label
                  className={`flex cursor-pointer items-center gap-3 rounded-xl border p-4 transition ${
                    form.paymentMethod === "cash"
                      ? "border-[#E57036] bg-orange-50/50"
                      : "border-gray-200 hover:bg-gray-50"
                  }`}
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="cash"
                    checked={
                      form.paymentMethod === "cash"
                    }
                    onChange={handleChange}
                    className="accent-[#E57036]"
                  />

                  <div>
                    <p className="font-semibold text-[#343E4F]">
                      Cash on Delivery
                    </p>

                    <p className="text-sm text-gray-500">
                      Pay when your order arrives.
                    </p>
                  </div>
                </label>

                {/* Telebirr */}
                <label
                  className={`flex cursor-pointer items-center gap-3 rounded-xl border p-4 transition ${
                    form.paymentMethod === "telebirr"
                      ? "border-[#E57036] bg-orange-50/50"
                      : "border-gray-200 hover:bg-gray-50"
                  }`}
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="telebirr"
                    checked={
                      form.paymentMethod === "telebirr"
                    }
                    onChange={handleChange}
                    className="accent-[#E57036]"
                  />

                  <div>
                    <p className="font-semibold text-[#343E4F]">
                      Telebirr
                    </p>

                    <p className="text-sm text-gray-500">
                      Pay using Telebirr.
                    </p>
                  </div>
                </label>
              </div>
            </section>
          </div>

          {/* ==========================================
              RIGHT SIDE — ORDER SUMMARY
          ========================================== */}

          <div className="h-fit rounded-2xl border border-gray-100 bg-white p-5 shadow-sm lg:sticky lg:top-6 sm:p-6">
            <h2 className="text-lg font-bold text-[#343E4F]">
              Order Summary
            </h2>

            {/* Products */}
            <div className="mt-5 space-y-4">
              {cart.map((item) => {
                const price = Number(item.price || 0);
                const quantity = Number(item.quantity || 0);

                return (
                  <div
                    key={item.id || item.slug}
                    className="flex gap-3"
                  >
                    {/* Image */}
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

                    {/* Details */}
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-semibold text-[#343E4F]">
                        {item.name}
                      </p>

                      <p className="text-xs text-gray-500">
                        {quantity} × ETB{" "}
                        {price.toLocaleString()}
                      </p>

                      <p className="mt-1 text-sm font-bold text-[#E57036]">
                        ETB{" "}
                        {(price * quantity).toLocaleString()}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Divider */}
            <div className="my-5 border-t border-gray-100" />

            {/* Totals */}
            <div className="space-y-3 text-sm">
              {/* Subtotal */}
              <div className="flex justify-between">
                <span className="text-gray-500">
                  Subtotal
                </span>

                <span className="font-semibold text-[#343E4F]">
                  ETB {subtotal.toLocaleString()}
                </span>
              </div>

              {/* Delivery */}
              <div className="flex justify-between">
                <span className="text-gray-500">
                  Delivery
                </span>

                <span className="font-semibold text-[#343E4F]">
                  ETB {deliveryFee.toLocaleString()}
                </span>
              </div>

              {/* Total */}
              <div className="border-t border-gray-100 pt-4">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-[#343E4F]">
                    Total
                  </span>

                  <span className="text-xl font-bold text-[#E57036]">
                    ETB {total.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>

            {/* Place Order */}
            <button
              type="submit"
              className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-[#E57036] px-5 py-3.5 font-semibold text-white transition hover:bg-[#d85f29] active:scale-[0.99]"
            >
              <CheckCircle size={19} />
              Place Order
            </button>

            <p className="mt-3 text-center text-xs leading-5 text-gray-400">
              Your order information will be saved securely.
            </p>
          </div>
        </div>
      </form>
    </div>
  );
}

export default CheckoutPage;