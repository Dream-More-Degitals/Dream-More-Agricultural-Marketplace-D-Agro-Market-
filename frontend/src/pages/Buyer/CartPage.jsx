import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  ShoppingCart,
  Plus,
  Minus,
  Trash2,
  ArrowLeft,
  ShoppingBag,
  X,
} from "lucide-react";

const PLACEHOLDER_IMAGE = "/images/product-placeholder.jpg";

export default function CartPage() {
  const [cart, setCart] = useState([]);

  // Load cart from localStorage
  const loadCart = () => {
    try {
      const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
      setCart(Array.isArray(savedCart) ? savedCart : []);
    } catch (error) {
      console.error("Failed to load cart:", error);
      setCart([]);
    }
  };

  useEffect(() => {
    loadCart();

    // Listen for cart changes from other parts of the app
    const handleCartUpdate = () => loadCart();
    const handleStorage = (event) => {
      if (event.key === "cart") {
        loadCart();
      }
    };

    window.addEventListener("cartUpdated", handleCartUpdate);
    window.addEventListener("storage", handleStorage);

    return () => {
      window.removeEventListener("cartUpdated", handleCartUpdate);
      window.removeEventListener("storage", handleStorage);
    };
  }, []);

  // Save cart
  const saveCart = (updatedCart) => {
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));

    window.dispatchEvent(new Event("cartUpdated"));
  };

  // Increase quantity
  const increaseQuantity = (id) => {
    const updatedCart = cart.map((item) => {
      if (String(item.id) !== String(id)) return item;

      const stock = Number(item.stock) || 999999;

      if (item.quantity >= stock) {
        return item;
      }

      return {
        ...item,
        quantity: item.quantity + 1,
      };
    });

    saveCart(updatedCart);
  };

  // Decrease quantity
  const decreaseQuantity = (id) => {
    const updatedCart = cart
      .map((item) => {
        if (String(item.id) !== String(id)) return item;

        return {
          ...item,
          quantity: Math.max(1, item.quantity - 1),
        };
      });

    saveCart(updatedCart);
  };

  // Remove product
  const removeItem = (id) => {
    const updatedCart = cart.filter(
      (item) => String(item.id) !== String(id)
    );

    saveCart(updatedCart);
  };

  // Clear cart
  const clearCart = () => {
    if (cart.length === 0) return;

    const confirmed = window.confirm(
      "Are you sure you want to remove all items from your cart?"
    );

    if (!confirmed) return;

    saveCart([]);
  };

  // Calculate total items
  const totalItems = cart.reduce(
    (total, item) => total + Number(item.quantity || 0),
    0
  );

  // Calculate subtotal
  const subtotal = cart.reduce((total, item) => {
    const price = Number(item.price) || 0;
    const quantity = Number(item.quantity) || 0;

    return total + price * quantity;
  }, 0);

  // Delivery fee
  const deliveryFee = cart.length > 0 ? 100 : 0;

  // Grand total
  const grandTotal = subtotal + deliveryFee;

  // Empty cart
  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 px-4 py-10">
        <div className="mx-auto max-w-5xl">
          <Link
            to="/buyer/marketplace"
            className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-[#343E4F] hover:text-[#E57036]"
          >
            <ArrowLeft size={18} />
            Continue Shopping
          </Link>

          <div className="rounded-3xl bg-white px-6 py-16 text-center shadow-sm">
            <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-[#343E4F]/10">
              <ShoppingCart size={42} className="text-[#343E4F]" />
            </div>

            <h1 className="text-2xl font-bold text-[#343E4F]">
              Your cart is empty
            </h1>

            <p className="mx-auto mt-3 max-w-md text-gray-500">
              You haven't added any agricultural products yet. Browse the
              marketplace and find products from farmers and suppliers.
            </p>

            <Link
              to="/buyer/marketplace"
              className="mt-7 inline-flex items-center gap-2 rounded-xl bg-[#E57036] px-6 py-3 font-semibold text-white transition hover:bg-[#d85f29]"
            >
              <ShoppingBag size={19} />
              Browse Marketplace
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <Link
              to="/buyer/marketplace"
              className="mb-3 inline-flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-[#E57036]"
            >
              <ArrowLeft size={17} />
              Continue Shopping
            </Link>

            <h1 className="flex items-center gap-3 text-2xl font-bold text-[#343E4F] sm:text-3xl">
              <ShoppingCart className="text-[#E57036]" />
              Shopping Cart
            </h1>

            <p className="mt-1 text-gray-500">
              {totalItems} {totalItems === 1 ? "item" : "items"} in your cart
            </p>
          </div>

          <button
            onClick={clearCart}
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-red-200 px-4 py-2.5 text-sm font-semibold text-red-500 transition hover:bg-red-50"
          >
            <Trash2 size={17} />
            Clear Cart
          </button>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Cart Products */}
          <div className="space-y-4 lg:col-span-2">
            {cart.map((item) => {
              const price = Number(item.price) || 0;
              const quantity = Number(item.quantity) || 1;
              const stock = Number(item.stock) || 999999;
              const itemTotal = price * quantity;

              return (
                <div
                  key={item.id}
                  className="rounded-2xl bg-white p-4 shadow-sm transition hover:shadow-md sm:p-5"
                >
                  <div className="flex gap-4">
                    {/* Product Image */}
                    <Link
                      to={`/buyer/product/${item.slug || item.id}`}
                      className="h-24 w-24 shrink-0 overflow-hidden rounded-xl bg-gray-100 sm:h-32 sm:w-32"
                    >
                      <img
                        src={item.image || PLACEHOLDER_IMAGE}
                        alt={item.name}
                        className="h-full w-full object-cover"
                        onError={(e) => {
                          e.currentTarget.src = PLACEHOLDER_IMAGE;
                        }}
                      />
                    </Link>

                    {/* Product Information */}
                    <div className="min-w-0 flex-1">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <Link
                            to={`/buyer/product/${item.slug || item.id}`}
                            className="line-clamp-2 text-base font-bold text-[#343E4F] hover:text-[#E57036] sm:text-lg"
                          >
                            {item.name}
                          </Link>

                          {item.category && (
                            <p className="mt-1 text-xs text-gray-500">
                              {item.category}
                            </p>
                          )}

                          {item.seller && (
                            <p className="mt-1 text-xs text-gray-500">
                              Seller:{" "}
                              <span className="font-medium text-[#343E4F]">
                                {item.seller}
                              </span>
                            </p>
                          )}
                        </div>

                        {/* Remove */}
                        <button
                          onClick={() => removeItem(item.id)}
                          title="Remove item"
                          className="shrink-0 rounded-lg p-2 text-gray-400 transition hover:bg-red-50 hover:text-red-500"
                        >
                          <X size={19} />
                        </button>
                      </div>

                      {/* Price */}
                      <div className="mt-3">
                        <span className="font-bold text-[#E57036]">
                          {price.toLocaleString()} ETB
                        </span>

                        {item.unit && (
                          <span className="ml-1 text-xs text-gray-500">
                            / {item.unit}
                          </span>
                        )}
                      </div>

                      {/* Quantity + Total */}
                      <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                        <div className="flex items-center rounded-xl border border-gray-200">
                          <button
                            onClick={() => decreaseQuantity(item.id)}
                            disabled={quantity <= 1}
                            className="p-2.5 text-gray-600 transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40"
                          >
                            <Minus size={16} />
                          </button>

                          <span className="min-w-10 text-center text-sm font-semibold text-[#343E4F]">
                            {quantity}
                          </span>

                          <button
                            onClick={() => increaseQuantity(item.id)}
                            disabled={quantity >= stock}
                            className="p-2.5 text-gray-600 transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40"
                          >
                            <Plus size={16} />
                          </button>
                        </div>

                        <div className="text-right">
                          <p className="text-xs text-gray-500">Item total</p>
                          <p className="font-bold text-[#343E4F]">
                            {itemTotal.toLocaleString()} ETB
                          </p>
                        </div>
                      </div>

                      {/* Stock warning */}
                      {stock !== 999999 && quantity >= stock && (
                        <p className="mt-2 text-xs font-medium text-orange-500">
                          Maximum available stock reached ({stock})
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-6 rounded-2xl bg-white p-5 shadow-sm sm:p-6">
              <h2 className="text-lg font-bold text-[#343E4F]">
                Order Summary
              </h2>

              <div className="mt-6 space-y-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">
                    Subtotal ({totalItems} items)
                  </span>
                  <span className="font-semibold text-[#343E4F]">
                    {subtotal.toLocaleString()} ETB
                  </span>
                </div>

                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Delivery fee</span>
                  <span className="font-semibold text-[#343E4F]">
                    {deliveryFee.toLocaleString()} ETB
                  </span>
                </div>

                <div className="border-t border-gray-100 pt-4">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-[#343E4F]">
                      Total
                    </span>

                    <span className="text-xl font-bold text-[#E57036]">
                      {grandTotal.toLocaleString()} ETB
                    </span>
                  </div>
                </div>
              </div>

              <Link
                to="/buyer/checkout"
                className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-[#E57036] px-5 py-3.5 font-semibold text-white transition hover:bg-[#d85f29]"
              >
                Proceed to Checkout
                <ArrowLeft className="rotate-180" size={18} />
              </Link>

              <Link
                to="/buyer/marketplace"
                className="mt-3 flex w-full items-center justify-center rounded-xl border border-[#343E4F]/20 px-5 py-3 font-semibold text-[#343E4F] transition hover:bg-gray-50"
              >
                Continue Shopping
              </Link>

              <div className="mt-5 rounded-xl bg-[#343E4F]/5 p-4">
                <p className="text-xs leading-5 text-gray-600">
                  Delivery fees are currently calculated as a demo fee of
                  <span className="font-semibold"> 100 ETB</span>. This can
                  later be connected to the transport and delivery system.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}