import { useEffect, useMemo, useState } from "react";
import { Search, MapPin, ShoppingCart, UserRound } from "lucide-react";
import { Link } from "react-router-dom";

const defaultProducts = [
  {
    id: "default-teff",
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
    seller: "Farmer",
  },
  {
    id: "default-coffee",
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
    seller: "Farmer",
  },
  {
    id: "default-onions",
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
    seller: "Farmer",
  },
  {
    id: "default-niger-oil",
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
    seller: "Supplier",
  },
];

export default function MarketplacePage() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const loadProducts = () => {
    let farmerProducts = [];
    let supplierProducts = [];

    try {
      farmerProducts = JSON.parse(
        localStorage.getItem("farmerProducts") || "[]"
      );
    } catch {
      farmerProducts = [];
    }

    try {
      supplierProducts = JSON.parse(
        localStorage.getItem("supplierProducts") || "[]"
      );
    } catch {
      supplierProducts = [];
    }

    // Convert farmer products to marketplace format
    const farmers = farmerProducts.map((product) => ({
      ...product,
      id: `farmer-${product.id}`,
      slug: `farmer-${product.id}`,
      price: Number(product.price) || 0,
      stock: Number(product.stock) || 0,
      seller: "Farmer",
      badge: product.badge || "",
      image:
        product.image ||
        "/images/product-placeholder.jpg",
    }));

    // Convert supplier products to marketplace format
    const suppliers = supplierProducts.map((product) => ({
      ...product,
      id: `supplier-${product.id}`,
      slug: `supplier-${product.id}`,
      price: Number(product.price) || 0,
      stock: Number(product.stock) || 0,
      seller: "Supplier",
      badge: product.badge || "",
      image:
        product.image ||
        "/images/product-placeholder.jpg",
    }));

    /*
      Keep default products and add products
      created by farmers and suppliers.
    */
    setProducts([
      ...defaultProducts,
      ...farmers,
      ...suppliers,
    ]);
  };

  useEffect(() => {
    loadProducts();

    // Reload when user returns to this page
    const handleFocus = () => {
      loadProducts();
    };

    window.addEventListener("focus", handleFocus);

    return () => {
      window.removeEventListener("focus", handleFocus);
    };
  }, []);

  // Categories
  const categories = useMemo(() => {
    const allCategories = products.map(
      (product) => product.category
    );

    return ["All", ...new Set(allCategories)];
  }, [products]);

  // Filter products
  const filteredProducts = useMemo(() => {
    const searchText = search.toLowerCase().trim();

    return products.filter((product) => {
      const matchesSearch =
        product.name?.toLowerCase().includes(searchText) ||
        product.category?.toLowerCase().includes(searchText) ||
        product.location?.toLowerCase().includes(searchText) ||
        product.description?.toLowerCase().includes(searchText);

      const matchesCategory =
        selectedCategory === "All" ||
        product.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [products, search, selectedCategory]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-[#343E4F] px-4 py-10 text-white sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <h1 className="text-3xl font-bold sm:text-4xl">
            Agricultural Marketplace
          </h1>

          <p className="mt-2 max-w-2xl text-sm text-white/70 sm:text-base">
            Buy fresh agricultural products directly from
            Ethiopian farmers and suppliers.
          </p>

          {/* Search */}
          <div className="mt-7 max-w-3xl">
            <div className="relative">
              <Search
                size={21}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <input
                type="text"
                placeholder="Search products, categories or locations..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full rounded-2xl bg-white py-4 pl-12 pr-4 text-gray-800 outline-none"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Main */}
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Category filters */}
        <div className="mb-8 overflow-x-auto">
          <div className="flex min-w-max gap-3">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() =>
                  setSelectedCategory(category)
                }
                className={`rounded-full px-5 py-2.5 text-sm font-semibold transition ${
                  selectedCategory === category
                    ? "bg-[#E57036] text-white"
                    : "bg-white text-[#343E4F] shadow-sm hover:bg-gray-100"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Results header */}
        <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-xl font-bold text-[#343E4F]">
              Available Products
            </h2>

            <p className="text-sm text-gray-500">
              {filteredProducts.length} product
              {filteredProducts.length !== 1 ? "s" : ""}
              {" "}available
            </p>
          </div>
        </div>

        {/* Products */}
        {filteredProducts.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
              />
            ))}
          </div>
        ) : (
          <div className="rounded-2xl bg-white py-20 text-center shadow-sm">
            <Search
              size={45}
              className="mx-auto mb-4 text-gray-300"
            />

            <h3 className="text-lg font-bold text-[#343E4F]">
              No products found
            </h3>

            <p className="mt-1 text-sm text-gray-500">
              Try another search or category.
            </p>

            <button
              onClick={() => {
                setSearch("");
                setSelectedCategory("All");
              }}
              className="mt-5 rounded-xl bg-[#E57036] px-5 py-3 text-sm font-semibold text-white"
            >
              Clear Filters
            </button>
          </div>
        )}
      </main>
    </div>
  );
}

/* Product Card */
function ProductCard({ product }) {
  const [imageSrc, setImageSrc] = useState(
    product.image ||
      "/images/product-placeholder.jpg"
  );

  const addToCart = () => {
    try {
      const existingCart = JSON.parse(
        localStorage.getItem("cart") || "[]"
      );

      const existingProductIndex =
        existingCart.findIndex(
          (item) => item.id === product.id
        );

      if (existingProductIndex >= 0) {
        existingCart[existingProductIndex].quantity += 1;
      } else {
        existingCart.push({
          ...product,
          quantity: 1,
        });
      }

      localStorage.setItem(
        "cart",
        JSON.stringify(existingCart)
      );

      alert(`${product.name} added to cart.`);
    } catch (error) {
      console.error("Could not add product to cart:", error);
    }
  };

  return (
    <div className="group overflow-hidden rounded-2xl bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
      {/* Image */}
      <div className="relative h-56 overflow-hidden bg-gray-100">
        <img
          src={imageSrc}
          alt={product.name}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          onError={() =>
            setImageSrc(
              "/images/product-placeholder.jpg"
            )
          }
        />

        {/* Badge */}
        {product.badge && (
          <span className="absolute left-3 top-3 rounded-full bg-[#E57036] px-3 py-1.5 text-[10px] font-bold text-white">
            {product.badge}
          </span>
        )}

        {/* Seller */}
        <span className="absolute right-3 top-3 flex items-center gap-1 rounded-full bg-white/95 px-3 py-1.5 text-xs font-semibold text-[#343E4F] shadow">
          <UserRound size={13} />

          {product.seller === "Farmer"
            ? "Farmer"
            : "Supplier"}
        </span>
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="mb-2">
          <span className="text-xs font-semibold uppercase tracking-wide text-[#E57036]">
            {product.category}
          </span>
        </div>

        <h3 className="line-clamp-1 text-lg font-bold text-[#343E4F]">
          {product.name}
        </h3>

        <p className="mt-2 line-clamp-2 min-h-[40px] text-sm text-gray-500">
          {product.description ||
            "Quality agricultural product available on D-Agro Marketplace."}
        </p>

        {/* Location */}
        <div className="mt-3 flex items-center gap-1.5 text-sm text-gray-500">
          <MapPin
            size={16}
            className="text-[#E57036]"
          />

          <span className="line-clamp-1">
            {product.location || "Ethiopia"}
          </span>
        </div>

        {/* Price */}
        <div className="mt-4 flex items-end justify-between">
          <div>
            <p className="text-xs text-gray-400">
              Price
            </p>

            <p className="text-xl font-bold text-[#343E4F]">
              ETB{" "}
              {Number(product.price).toLocaleString()}
              <span className="text-sm font-medium text-gray-400">
                /{product.unit || "kg"}
              </span>
            </p>
          </div>

          {product.stock !== undefined && (
            <span
              className={`text-xs font-semibold ${
                Number(product.stock) > 0
                  ? "text-green-600"
                  : "text-red-500"
              }`}
            >
              {Number(product.stock) > 0
                ? `${product.stock} available`
                : "Out of stock"}
            </span>
          )}
        </div>

        {/* Buttons */}
        <div className="mt-5 flex gap-2">
          <Link
            to={`/buyer/product/${product.slug || product.id}`}
            state={{ product }}
            className="flex-1 rounded-xl border border-gray-200 px-3 py-3 text-center text-sm font-semibold text-[#343E4F] transition hover:bg-gray-50"
          >
            View Details
          </Link>

          <button
            onClick={addToCart}
            disabled={
              product.stock !== undefined &&
              Number(product.stock) <= 0
            }
            className="flex items-center justify-center rounded-xl bg-[#E57036] px-4 py-3 text-white transition hover:bg-[#cf5f2b] disabled:cursor-not-allowed disabled:bg-gray-300"
            title="Add to cart"
          >
            <ShoppingCart size={19} />
          </button>
        </div>
      </div>
    </div>
  );
}