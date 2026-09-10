import { useEffect, useState } from "react";
import {
  Search,
  MapPin,
  ShoppingCart,
  Star,
} from "lucide-react";
import { Link } from "react-router-dom";

const products = [
  {
    slug: "white-teff-magna",
    name: "White Teff (Magna)",
    category: "Grains & Legumes",
    location: "Gojam, Amhara Region",
    description:
      "High-grade Magna Teff, iron-rich and gluten-free.",
    price: 180,
    unit: "kg",
    badge: "PREMIUM QUALITY",
    image: "/images/teff.jpg",
  },
  {
    slug: "yirgacheffe-coffee",
    name: "Yirgacheffe Coffee",
    category: "Coffee",
    location: "Gedeo, SNNPR",
    description:
      "Grade 1 Arabica beans with distinct floral and citrus notes.",
    price: 850,
    unit: "kg",
    badge: "ORGANIC CERTIFIED",
    image: "/images/coffee.jpg",
  },
  {
    slug: "red-onions",
    name: "Red Onions",
    category: "Vegetables",
    location: "Meki, Oromia Region",
    description:
      "Firm, high-flavor red onions. Bulk discount available.",
    price: 120,
    unit: "kg",
    badge: "",
    image: "/images/onions.jpg",
  },
  {
    slug: "niger-seed-oil",
    name: "Niger Seed Oil (Nug)",
    category: "Oils & Seeds",
    location: "Wollega, Oromia",
    description:
      "Cold-pressed pure Nug oil. Rich in Omega-3.",
    price: 450,
    unit: "liter",
    badge: "",
    image: "/images/niger-oil.jpg",
  },
];

const categories = [
  "All Products",
  "Grains & Legumes",
  "Coffee",
  "Vegetables",
  "Oils & Seeds",
  "Seeds",
  "Fertilizer",
  "Equipment",
  "Pesticides",
  "Tools",
  "Other",
];

function MarketplacePage() {
  const [marketplaceProducts, setMarketplaceProducts] =
    useState(products);

  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] =
    useState("All Products");

  useEffect(() => {
    try {
      const savedSupplierProducts = JSON.parse(
        localStorage.getItem("supplierProducts") || "[]"
      );

      if (
        Array.isArray(savedSupplierProducts) &&
        savedSupplierProducts.length > 0
      ) {
        const convertedProducts =
          savedSupplierProducts.map((product) => ({
            slug: `supplier-${product.id}`,

            name: product.name,

            category: product.category,

            location: product.location || "Ethiopia",

            description:
              product.description ||
              "Quality agricultural product available from a D-Agro supplier.",

            price:
              Number(
                String(product.price || "")
                  .replace(/,/g, "")
                  .replace(" ETB", "")
              ) || 0,

            unit: product.unit || "piece",

            badge:
              product.status === "Low Stock"
                ? "LOW STOCK"
                : "AVAILABLE",

            image:
              product.image ||
              "/images/product-placeholder.jpg",

            stock: Number(product.stock) || 0,

            seller: "D-Agro Supplier",
          }));

        setMarketplaceProducts([
          ...convertedProducts,
          ...products,
        ]);
      } else {
        setMarketplaceProducts(products);
      }
    } catch (error) {
      console.error(
        "Error loading supplier products:",
        error
      );

      setMarketplaceProducts(products);
    }
  }, []);

  const addToCart = (product) => {
    try {
      const existingCart = JSON.parse(
        localStorage.getItem("cart") || "[]"
      );

      const existingItem = existingCart.find(
        (item) => item.slug === product.slug
      );

      let updatedCart;

      if (existingItem) {
        updatedCart = existingCart.map((item) =>
          item.slug === product.slug
            ? {
                ...item,
                quantity: item.quantity + 1,
              }
            : item
        );
      } else {
        updatedCart = [
          ...existingCart,
          {
            ...product,
            quantity: 1,
          },
        ];
      }

      localStorage.setItem(
        "cart",
        JSON.stringify(updatedCart)
      );

      alert(`${product.name} added to cart.`);
    } catch (error) {
      console.error("Error adding product to cart:", error);
    }
  };

  const filteredProducts = marketplaceProducts.filter(
    (product) => {
      const searchText = search.toLowerCase();

      const matchesSearch =
        product.name
          .toLowerCase()
          .includes(searchText) ||
        product.location
          .toLowerCase()
          .includes(searchText) ||
        product.category
          .toLowerCase()
          .includes(searchText);

      const matchesCategory =
        selectedCategory === "All Products" ||
        product.category === selectedCategory;

      return matchesSearch && matchesCategory;
    }
  );

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="mb-8">
        <div>
          <h1 className="text-2xl font-bold text-[#343E4F] sm:text-3xl">
            Marketplace
          </h1>

          <p className="mt-2 text-gray-500">
            Discover quality agricultural products
            from Ethiopian farmers and suppliers.
          </p>
        </div>
      </div>

      {/* Search */}
      <div className="mb-6 rounded-2xl bg-white p-4 shadow-sm">
        <div className="relative">
          <Search
            size={20}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            type="text"
            placeholder="Search products, categories or locations..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-xl border border-gray-200 py-3 pl-12 pr-4 outline-none transition focus:border-[#E57036] focus:ring-2 focus:ring-[#E57036]/20"
          />
        </div>
      </div>

      {/* Categories */}
      <div className="mb-8 overflow-x-auto">
        <div className="flex min-w-max gap-3">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() =>
                setSelectedCategory(category)
              }
              className={`rounded-full px-5 py-2.5 text-sm font-medium transition ${
                selectedCategory === category
                  ? "bg-[#E57036] text-white"
                  : "bg-white text-gray-600 shadow-sm hover:bg-gray-100"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Results Header */}
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-[#343E4F]">
            Available Products
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            {filteredProducts.length} product
            {filteredProducts.length !== 1
              ? "s"
              : ""}{" "}
            found
          </p>
        </div>
      </div>

      {/* Products */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredProducts.map((product) => (
            <div
              key={product.slug}
              className="group overflow-hidden rounded-2xl bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
            >
              {/* Image */}
              <div className="relative h-52 overflow-hidden bg-gray-100">
                <img
                  src={
                    product.image ||
                    "/images/product-placeholder.jpg"
                  }
                  alt={product.name}
                  className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                  onError={(e) => {
                    e.currentTarget.src =
                      "/images/product-placeholder.jpg";
                  }}
                />

                {product.badge && (
                  <span
                    className={`absolute left-3 top-3 rounded-full px-3 py-1 text-xs font-bold ${
                      product.badge === "LOW STOCK"
                        ? "bg-red-500 text-white"
                        : "bg-white text-[#E57036]"
                    }`}
                  >
                    {product.badge}
                  </span>
                )}
              </div>

              {/* Content */}
              <div className="p-5">
                <div className="mb-2 flex items-start justify-between gap-3">
                  <div>
                    <p className="text-xs font-medium uppercase tracking-wide text-[#E57036]">
                      {product.category}
                    </p>

                    <h3 className="mt-1 line-clamp-2 text-lg font-bold text-[#343E4F]">
                      {product.name}
                    </h3>
                  </div>
                </div>

                {/* Location */}
                <div className="mb-3 flex items-center gap-1.5 text-sm text-gray-500">
                  <MapPin size={16} />

                  <span className="line-clamp-1">
                    {product.location}
                  </span>
                </div>

                {/* Description */}
                <p className="mb-4 line-clamp-2 text-sm leading-6 text-gray-500">
                  {product.description}
                </p>

                {/* Rating */}
                <div className="mb-4 flex items-center gap-1">
                  <Star
                    size={16}
                    className="fill-yellow-400 text-yellow-400"
                  />

                  <span className="text-sm font-semibold text-gray-700">
                    4.8
                  </span>

                  <span className="text-xs text-gray-400">
                    (24)
                  </span>
                </div>

                {/* Price */}
                <div className="mb-4">
                  <span className="text-xl font-bold text-[#343E4F]">
                    {Number(product.price).toLocaleString()}{" "}
                    ETB
                  </span>

                  <span className="ml-1 text-sm text-gray-400">
                    / {product.unit || "piece"}
                  </span>
                </div>

                {/* Stock */}
                {product.stock !== undefined && (
                  <p
                    className={`mb-4 text-xs font-medium ${
                      Number(product.stock) <= 50
                        ? "text-red-500"
                        : "text-green-600"
                    }`}
                  >
                    {Number(product.stock) <= 50
                      ? `Only ${product.stock} ${product.unit || "units"} left`
                      : `${product.stock} ${product.unit || "units"} available`}
                  </p>
                )}

                {/* Actions */}
                <div className="flex gap-2">
                  <Link
                    to={`/buyer/product/${product.slug}`}
                    className="flex-1 rounded-xl border border-[#E57036] px-3 py-3 text-center text-sm font-semibold text-[#E57036] transition hover:bg-orange-50"
                  >
                    View Details
                  </Link>

                  <button
                    onClick={() => addToCart(product)}
                    disabled={
                      product.stock !== undefined &&
                      Number(product.stock) <= 0
                    }
                    className="flex items-center justify-center rounded-xl bg-[#E57036] px-4 py-3 text-white transition hover:bg-[#d95f29] disabled:cursor-not-allowed disabled:bg-gray-300"
                    title="Add to cart"
                  >
                    <ShoppingCart size={19} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="rounded-2xl bg-white px-6 py-16 text-center shadow-sm">
          <Search
            size={45}
            className="mx-auto mb-4 text-gray-300"
          />

          <h3 className="text-lg font-bold text-[#343E4F]">
            No products found
          </h3>

          <p className="mt-2 text-sm text-gray-500">
            Try changing your search or selecting another
            category.
          </p>
        </div>
      )}

      {/* Market Insight */}
      <div className="mt-10 rounded-2xl bg-[#343E4F] p-6 text-white sm:p-8">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-xl font-bold sm:text-2xl">
              Market Insight
            </h2>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-300">
              Explore agricultural products from different
              regions of Ethiopia and connect with farmers
              and suppliers through D-Agro.
            </p>
          </div>

          <Link
            to="/buyer/ai-advisor"
            className="inline-flex items-center justify-center rounded-xl bg-[#E57036] px-5 py-3 font-semibold text-white transition hover:bg-[#d95f29]"
          >
            Ask AI Advisor
          </Link>
        </div>
      </div>
    </div>
  );
}

export default MarketplacePage;