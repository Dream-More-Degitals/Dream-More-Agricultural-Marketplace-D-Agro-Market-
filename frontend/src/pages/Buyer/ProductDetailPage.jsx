import { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import {
  ArrowLeft,
  MapPin,
  Package,
  ShoppingCart,
  Minus,
  Plus,
  CheckCircle,
} from "lucide-react";

const defaultProducts = [
  {
    id: "white-teff-magna",
    slug: "white-teff-magna",
    name: "White Teff (Magna)",
    category: "Grains & Legumes",
    location: "Gojam, Amhara Region",
    description:
      "High-grade Magna Teff, iron-rich and gluten-free.",
    price: 180,
    unit: "kg",
    stock: 100,
    seller: "D-Agro Farmer",
    image: "/images/teff.jpg",
  },
  {
    id: "yirgacheffe-coffee",
    slug: "yirgacheffe-coffee",
    name: "Yirgacheffe Coffee",
    category: "Coffee",
    location: "Gedeo, SNNPR",
    description:
      "Grade 1 Arabica beans with distinct floral and citrus notes.",
    price: 850,
    unit: "kg",
    stock: 50,
    seller: "D-Agro Farmer",
    image: "/images/coffee.jpg",
  },
  {
    id: "red-onions",
    slug: "red-onions",
    name: "Red Onions",
    category: "Vegetables",
    location: "Meki, Oromia Region",
    description:
      "Firm, high-flavor red onions. Bulk discount available.",
    price: 120,
    unit: "kg",
    stock: 200,
    seller: "D-Agro Farmer",
    image: "/images/onions.jpg",
  },
  {
    id: "niger-seed-oil",
    slug: "niger-seed-oil",
    name: "Niger Seed Oil (Nug)",
    category: "Oils & Seeds",
    location: "Wollega, Oromia",
    description:
      "Cold-pressed pure Nug oil. Rich in Omega-3.",
    price: 450,
    unit: "liter",
    stock: 80,
    seller: "D-Agro Farmer",
    image: "/images/niger-oil.jpg",
  },
];

export default function ProductDetailPage() {
  const { id } = useParams();
  const location = useLocation();

  const [product, setProduct] = useState(
    location.state?.product || null
  );

  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    // If Marketplace already sent the product,
    // use it directly.
    if (location.state?.product) {
      setProduct(location.state.product);
      return;
    }

    try {
      const farmerProducts = JSON.parse(
        localStorage.getItem("farmerProducts") || "[]"
      );

      const supplierProducts = JSON.parse(
        localStorage.getItem("supplierProducts") || "[]"
      );

      const allProducts = [
        ...defaultProducts,
        ...farmerProducts.map((item) => ({
          ...item,
          slug: `farmer-${item.id}`,
          seller: item.seller || "Farmer",
        })),
        ...supplierProducts.map((item) => ({
          ...item,
          slug: `supplier-${item.id}`,
          seller: item.seller || "Supplier",
        })),
      ];

      const foundProduct = allProducts.find(
        (item) =>
          String(item.id) === String(id) ||
          String(item.slug) === String(id)
      );

      setProduct(foundProduct || null);
    } catch (error) {
      console.error(
        "Failed to load product:",
        error
      );

      setProduct(null);
    }
  }, [id, location.state]);

  const increaseQuantity = () => {
    if (!product) return;

    const stock = Number(product.stock || 0);

    setQuantity((current) =>
      current < stock ? current + 1 : current
    );
  };

  const decreaseQuantity = () => {
    setQuantity((current) =>
      current > 1 ? current - 1 : 1
    );
  };

  const addToCart = () => {
    if (!product) return;

    try {
      const existingCart = JSON.parse(
        localStorage.getItem("cart") || "[]"
      );

      const productId =
        product.id || product.slug;

      const existingItemIndex =
        existingCart.findIndex(
          (item) =>
            String(item.id || item.slug) ===
            String(productId)
        );

      if (existingItemIndex !== -1) {
        existingCart[
          existingItemIndex
        ].quantity += quantity;
      } else {
        existingCart.push({
          ...product,
          id: productId,
          quantity,
        });
      }

      localStorage.setItem(
        "cart",
        JSON.stringify(existingCart)
      );

      setAdded(true);

      setTimeout(() => {
        setAdded(false);
      }, 2500);
    } catch (error) {
      console.error(
        "Failed to add product to cart:",
        error
      );
    }
  };

  // ==========================================
  // PRODUCT NOT FOUND
  // ==========================================

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="mx-auto max-w-3xl py-20 text-center">

          <Package
            size={60}
            className="mx-auto mb-5 text-gray-300"
          />

          <h1 className="text-2xl font-bold text-[#343E4F]">
            Product Not Found
          </h1>

          <p className="mt-2 text-gray-500">
            This product may have been removed or is
            no longer available.
          </p>

          <Link
            to="/buyer/marketplace"
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#E57036] px-5 py-3 font-semibold text-white"
          >
            <ArrowLeft size={18} />
            Back to Marketplace
          </Link>
        </div>
      </div>
    );
  }

  const stock = Number(product.stock || 0);

  const totalPrice =
    Number(product.price || 0) * quantity;

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">

      {/* ==========================================
          BACK
      ========================================== */}
      <div className="mx-auto mb-6 max-w-6xl">
        <Link
          to="/buyer/marketplace"
          className="inline-flex items-center gap-2 text-sm font-semibold text-[#343E4F] transition hover:text-[#E57036]"
        >
          <ArrowLeft size={18} />
          Back to Marketplace
        </Link>
      </div>

      {/* ==========================================
          PRODUCT
      ========================================== */}
      <div className="mx-auto max-w-6xl overflow-hidden rounded-2xl bg-white shadow-sm">

        <div className="grid lg:grid-cols-2">

          {/* ========================================
              IMAGE
          ======================================== */}
          <div className="flex min-h-[350px] items-center justify-center bg-gray-100 p-5 sm:min-h-[500px]">

            <img
              src={
                product.image ||
                "/images/product-placeholder.jpg"
              }
              alt={product.name}
              className="h-full max-h-[500px] w-full rounded-xl object-contain"
              onError={(e) => {
                e.currentTarget.src =
                  "/images/product-placeholder.jpg";
              }}
            />
          </div>

          {/* ========================================
              INFORMATION
          ======================================== */}
          <div className="flex flex-col p-6 sm:p-8 lg:p-10">

            {/* Category */}
            <span className="mb-4 w-fit rounded-full bg-orange-50 px-3 py-1 text-xs font-semibold text-[#E57036]">
              {product.category || "Agricultural Product"}
            </span>

            {/* Name */}
            <h1 className="text-3xl font-bold text-[#343E4F] sm:text-4xl">
              {product.name}
            </h1>

            {/* Seller */}
            <p className="mt-3 text-sm text-gray-500">
              Sold by{" "}
              <span className="font-semibold text-[#343E4F]">
                {product.seller || "Farmer"}
              </span>
            </p>

            {/* Location */}
            {product.location && (
              <div className="mt-4 flex items-center gap-2 text-sm text-gray-500">
                <MapPin
                  size={18}
                  className="text-[#E57036]"
                />

                {product.location}
              </div>
            )}

            {/* Divider */}
            <div className="my-6 border-t border-gray-100" />

            {/* Price */}
            <div>
              <p className="text-3xl font-bold text-[#E57036]">
                ETB{" "}
                {Number(
                  product.price || 0
                ).toLocaleString()}
              </p>

              <p className="mt-1 text-sm text-gray-400">
                per {product.unit || "kg"}
              </p>
            </div>

            {/* Description */}
            <div className="mt-7">
              <h2 className="font-bold text-[#343E4F]">
                Product Description
              </h2>

              <p className="mt-2 text-sm leading-6 text-gray-600">
                {product.description ||
                  "No description has been provided for this product."}
              </p>
            </div>

            {/* Stock */}
            <div className="mt-6 flex items-center gap-2">
              <Package
                size={18}
                className={
                  stock > 0
                    ? "text-green-600"
                    : "text-red-500"
                }
              />

              <span
                className={`text-sm font-semibold ${
                  stock > 0
                    ? "text-green-600"
                    : "text-red-500"
                }`}
              >
                {stock > 0
                  ? `${stock} ${product.unit || "units"} available`
                  : "Out of stock"}
              </span>
            </div>

            {/* Quantity */}
            {stock > 0 && (
              <div className="mt-7">

                <label className="mb-2 block text-sm font-semibold text-[#343E4F]">
                  Quantity
                </label>

                <div className="flex w-fit items-center rounded-xl border border-gray-200">

                  <button
                    type="button"
                    onClick={decreaseQuantity}
                    disabled={quantity <= 1}
                    className="p-3 text-gray-500 transition hover:text-[#E57036] disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    <Minus size={18} />
                  </button>

                  <span className="min-w-12 text-center font-semibold text-[#343E4F]">
                    {quantity}
                  </span>

                  <button
                    type="button"
                    onClick={increaseQuantity}
                    disabled={quantity >= stock}
                    className="p-3 text-gray-500 transition hover:text-[#E57036] disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    <Plus size={18} />
                  </button>
                </div>
              </div>
            )}

            {/* Total */}
            {stock > 0 && (
              <div className="mt-6 flex items-center justify-between rounded-xl bg-gray-50 p-4">
                <span className="text-sm text-gray-500">
                  Total
                </span>

                <span className="text-xl font-bold text-[#343E4F]">
                  ETB {totalPrice.toLocaleString()}
                </span>
              </div>
            )}

            {/* Add Cart */}
            <button
              type="button"
              onClick={addToCart}
              disabled={stock <= 0}
              className="mt-6 flex items-center justify-center gap-2 rounded-xl bg-[#E57036] px-5 py-4 font-bold text-white transition hover:bg-[#cf5f2b] disabled:cursor-not-allowed disabled:bg-gray-300"
            >
              <ShoppingCart size={20} />

              {stock <= 0
                ? "Out of Stock"
                : "Add to Cart"}
            </button>

            {/* Success */}
            {added && (
              <div className="mt-4 flex items-center gap-2 rounded-xl border border-green-200 bg-green-50 p-4 text-sm font-medium text-green-700">
                <CheckCircle size={19} />
                Product added to your cart.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}