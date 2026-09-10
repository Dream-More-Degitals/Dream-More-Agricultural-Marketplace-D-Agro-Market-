import { useEffect, useState } from "react";
import {
  Plus,
  Search,
  Pencil,
  Trash2,
  ImagePlus,
  X,
  Package,
  MapPin,
} from "lucide-react";
import { compressImage } from "../../utils/imageUtils";

const defaultProducts = [
  {
    id: "farmer-default-1",
    name: "White Teff",
    category: "Grains & Legumes",
    price: 180,
    stock: 100,
    location: "Jimma, Oromia",
    unit: "kg",
    description:
      "High-quality white teff produced by local farmers.",
    image: "/images/teff.jpg",
    seller: "Farmer",
  },
];

const emptyForm = {
  name: "",
  category: "Grains & Legumes",
  price: "",
  stock: "",
  location: "",
  unit: "kg",
  description: "",
  image: "",
};

export default function FarmerProducts() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState(emptyForm);
  const [imageError, setImageError] = useState("");

  // Load products
  useEffect(() => {
    try {
      const savedProducts = localStorage.getItem(
        "farmerProducts"
      );

      if (savedProducts) {
        setProducts(JSON.parse(savedProducts));
      } else {
        localStorage.setItem(
          "farmerProducts",
          JSON.stringify(defaultProducts)
        );

        setProducts(defaultProducts);
      }
    } catch (error) {
      console.error("Failed to load farmer products:", error);

      setProducts(defaultProducts);
    }
  }, []);

  // Save products
  const saveProducts = (updatedProducts) => {
    try {
      localStorage.setItem(
        "farmerProducts",
        JSON.stringify(updatedProducts)
      );

      setProducts(updatedProducts);
    } catch (error) {
      console.error("Failed to save products:", error);

      alert(
        "Could not save the product. The image may be too large."
      );
    }
  };

  // Open Add modal
  const openAddModal = () => {
    setEditingProduct(null);
    setFormData(emptyForm);
    setImageError("");
    setShowModal(true);
  };

  // Open Edit modal
  const openEditModal = (product) => {
    setEditingProduct(product);

    setFormData({
      name: product.name || "",
      category: product.category || "Grains & Legumes",
      price: product.price ?? "",
      stock: product.stock ?? "",
      location: product.location || "",
      unit: product.unit || "kg",
      description: product.description || "",
      image: product.image || "",
    });

    setImageError("");
    setShowModal(true);
  };

  // Close modal
  const closeModal = () => {
    setShowModal(false);
    setEditingProduct(null);
    setFormData(emptyForm);
    setImageError("");
  };

  // Handle text inputs
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  // Handle image
  const handleImageChange = async (e) => {
    const file = e.target.files?.[0];

    if (!file) {
      return;
    }

    try {
      setImageError("");

      const image = await compressImage(file);

      setFormData((previous) => ({
        ...previous,
        image,
      }));
    } catch (error) {
      console.error(error);

      setImageError(
        error.message || "Unable to upload image."
      );
    }

    // Allow selecting the same image again
    e.target.value = "";
  };

  // Remove image
  const removeImage = () => {
    setFormData((previous) => ({
      ...previous,
      image: "",
    }));
  };

  // Add or update product
  const handleSubmit = (e) => {
    e.preventDefault();

    const name = formData.name.trim();
    const location = formData.location.trim();
    const description = formData.description.trim();

    const price = Number(formData.price);
    const stock = Number(formData.stock);

    if (!name) {
      alert("Please enter the product name.");
      return;
    }

    if (!price || price <= 0) {
      alert("Please enter a valid price.");
      return;
    }

    if (
      formData.stock === "" ||
      Number.isNaN(stock) ||
      stock < 0
    ) {
      alert("Please enter a valid stock quantity.");
      return;
    }

    if (!location) {
      alert("Please enter the product location.");
      return;
    }

    const productImage =
      formData.image ||
      "/images/product-placeholder.jpg";

    if (editingProduct) {
      const updatedProducts = products.map((product) => {
        if (product.id !== editingProduct.id) {
          return product;
        }

        return {
          ...product,
          name,
          category: formData.category,
          price,
          stock,
          location,
          unit: formData.unit,
          description,
          image: productImage,
          seller: "Farmer",
        };
      });

      saveProducts(updatedProducts);
    } else {
      const newProduct = {
        id: `farmer-${Date.now()}`,
        name,
        category: formData.category,
        price,
        stock,
        location,
        unit: formData.unit,
        description,
        image: productImage,
        seller: "Farmer",
        createdAt: new Date().toISOString(),
      };

      saveProducts([
        ...products,
        newProduct,
      ]);
    }

    closeModal();
  };

  // Delete
  const deleteProduct = (id) => {
    const product = products.find(
      (item) => item.id === id
    );

    const confirmed = window.confirm(
      `Delete "${product?.name || "this product"}"?`
    );

    if (!confirmed) {
      return;
    }

    const updatedProducts = products.filter(
      (item) => item.id !== id
    );

    saveProducts(updatedProducts);
  };

  // Search
  const filteredProducts = products.filter((product) => {
    const searchText = search.toLowerCase().trim();

    if (!searchText) {
      return true;
    }

    return (
      product.name
        ?.toLowerCase()
        .includes(searchText) ||
      product.category
        ?.toLowerCase()
        .includes(searchText) ||
      product.location
        ?.toLowerCase()
        .includes(searchText) ||
      product.description
        ?.toLowerCase()
        .includes(searchText)
    );
  });

  // Statistics
  const totalProducts = products.length;

  const totalStock = products.reduce(
    (total, product) =>
      total + Number(product.stock || 0),
    0
  );

  const lowStock = products.filter(
    (product) =>
      Number(product.stock || 0) > 0 &&
      Number(product.stock || 0) <= 50
  ).length;

  const outOfStock = products.filter(
    (product) =>
      Number(product.stock || 0) === 0
  ).length;

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">

      {/* ========================================
          HEADER
      ======================================== */}
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#343E4F] sm:text-3xl">
            My Products
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            Manage the agricultural products you sell.
          </p>
        </div>

        <button
          type="button"
          onClick={openAddModal}
          className="flex items-center justify-center gap-2 rounded-xl bg-[#E57036] px-5 py-3 font-semibold text-white shadow-sm transition hover:bg-[#cf5f2b]"
        >
          <Plus size={20} />
          Add Product
        </button>
      </div>

      {/* ========================================
          STATISTICS
      ======================================== */}
      <div className="mb-8 grid grid-cols-2 gap-4 lg:grid-cols-4">

        <div className="rounded-2xl bg-white p-5 shadow-sm">
          <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-orange-50">
            <Package
              size={21}
              className="text-[#E57036]"
            />
          </div>

          <p className="text-sm text-gray-500">
            Total Products
          </p>

          <p className="mt-1 text-2xl font-bold text-[#343E4F]">
            {totalProducts}
          </p>
        </div>

        <div className="rounded-2xl bg-white p-5 shadow-sm">
          <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50">
            <Package
              size={21}
              className="text-blue-600"
            />
          </div>

          <p className="text-sm text-gray-500">
            Total Stock
          </p>

          <p className="mt-1 text-2xl font-bold text-[#343E4F]">
            {totalStock}
          </p>
        </div>

        <div className="rounded-2xl bg-white p-5 shadow-sm">
          <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-yellow-50">
            <Package
              size={21}
              className="text-yellow-600"
            />
          </div>

          <p className="text-sm text-gray-500">
            Low Stock
          </p>

          <p className="mt-1 text-2xl font-bold text-[#343E4F]">
            {lowStock}
          </p>
        </div>

        <div className="rounded-2xl bg-white p-5 shadow-sm">
          <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-red-50">
            <Package
              size={21}
              className="text-red-500"
            />
          </div>

          <p className="text-sm text-gray-500">
            Out of Stock
          </p>

          <p className="mt-1 text-2xl font-bold text-[#343E4F]">
            {outOfStock}
          </p>
        </div>
      </div>

      {/* ========================================
          SEARCH
      ======================================== */}
      <div className="mb-8 rounded-2xl bg-white p-4 shadow-sm">
        <div className="relative">
          <Search
            size={20}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search products..."
            className="w-full rounded-xl border border-gray-200 py-3 pl-12 pr-4 text-sm outline-none transition focus:border-[#E57036] focus:ring-2 focus:ring-orange-100"
          />
        </div>
      </div>

      {/* ========================================
          PRODUCTS
      ======================================== */}
      {filteredProducts.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="overflow-hidden rounded-2xl bg-white shadow-sm transition hover:shadow-md"
            >
              {/* Image */}
              <div className="relative h-56 bg-gray-100">
                <img
                  src={
                    product.image ||
                    "/images/product-placeholder.jpg"
                  }
                  alt={product.name}
                  className="h-full w-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src =
                      "/images/product-placeholder.jpg";
                  }}
                />

                {/* Category */}
                <span className="absolute left-3 top-3 rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-[#343E4F] shadow">
                  {product.category}
                </span>

                {/* Stock status */}
                {Number(product.stock) === 0 ? (
                  <span className="absolute right-3 top-3 rounded-full bg-red-500 px-3 py-1.5 text-xs font-semibold text-white">
                    Out of Stock
                  </span>
                ) : Number(product.stock) <= 50 ? (
                  <span className="absolute right-3 top-3 rounded-full bg-yellow-500 px-3 py-1.5 text-xs font-semibold text-white">
                    Low Stock
                  </span>
                ) : (
                  <span className="absolute right-3 top-3 rounded-full bg-green-500 px-3 py-1.5 text-xs font-semibold text-white">
                    Available
                  </span>
                )}
              </div>

              {/* Content */}
              <div className="p-5">
                <h2 className="line-clamp-1 text-lg font-bold text-[#343E4F]">
                  {product.name}
                </h2>

                <p className="mt-2 line-clamp-2 min-h-[40px] text-sm text-gray-500">
                  {product.description ||
                    "No description available."}
                </p>

                {/* Location */}
                <div className="mt-4 flex items-center gap-2 text-sm text-gray-500">
                  <MapPin
                    size={16}
                    className="shrink-0 text-[#E57036]"
                  />

                  <span className="line-clamp-1">
                    {product.location}
                  </span>
                </div>

                {/* Price */}
                <div className="mt-4 flex items-end justify-between">
                  <div>
                    <p className="text-xs text-gray-400">
                      Price
                    </p>

                    <p className="text-xl font-bold text-[#E57036]">
                      ETB{" "}
                      {Number(
                        product.price || 0
                      ).toLocaleString()}
                      <span className="text-sm font-medium text-gray-400">
                        /{product.unit}
                      </span>
                    </p>
                  </div>

                  <div className="text-right">
                    <p className="text-xs text-gray-400">
                      Stock
                    </p>

                    <p className="text-sm font-semibold text-[#343E4F]">
                      {product.stock} {product.unit}
                    </p>
                  </div>
                </div>

                {/* Actions */}
                <div className="mt-5 flex gap-3">
                  <button
                    type="button"
                    onClick={() =>
                      openEditModal(product)
                    }
                    className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-gray-200 px-4 py-2.5 text-sm font-semibold text-[#343E4F] transition hover:bg-gray-50"
                  >
                    <Pencil size={17} />
                    Edit
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      deleteProduct(product.id)
                    }
                    className="flex items-center justify-center rounded-xl bg-red-50 px-4 py-2.5 text-red-500 transition hover:bg-red-100"
                    title="Delete product"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="rounded-2xl bg-white py-20 text-center shadow-sm">
          <Package
            size={50}
            className="mx-auto mb-4 text-gray-300"
          />

          <h3 className="text-lg font-bold text-[#343E4F]">
            No products found
          </h3>

          <p className="mt-1 text-sm text-gray-500">
            Add your first agricultural product.
          </p>

          <button
            type="button"
            onClick={openAddModal}
            className="mt-5 rounded-xl bg-[#E57036] px-5 py-3 text-sm font-semibold text-white"
          >
            Add Product
          </button>
        </div>
      )}

      {/* ========================================
          ADD / EDIT MODAL
      ======================================== */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">

          <div className="max-h-[95vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white shadow-2xl">

            {/* Modal Header */}
            <div className="sticky top-0 z-10 flex items-center justify-between border-b bg-white p-5">
              <div>
                <h2 className="text-xl font-bold text-[#343E4F]">
                  {editingProduct
                    ? "Edit Product"
                    : "Add Product"}
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  Add your product information and image.
                </p>
              </div>

              <button
                type="button"
                onClick={closeModal}
                className="rounded-full p-2 text-gray-500 transition hover:bg-gray-100"
              >
                <X size={22} />
              </button>
            </div>

            {/* Form */}
            <form
              onSubmit={handleSubmit}
              className="space-y-5 p-5"
            >

              {/* ========================================
                  IMAGE
              ======================================== */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-[#343E4F]">
                  Product Image
                </label>

                {formData.image ? (
                  <div className="relative overflow-hidden rounded-2xl border border-gray-200">
                    <img
                      src={formData.image}
                      alt="Product preview"
                      className="h-64 w-full object-cover"
                    />

                    <button
                      type="button"
                      onClick={removeImage}
                      className="absolute right-3 top-3 rounded-full bg-red-500 p-2 text-white shadow-md transition hover:bg-red-600"
                      title="Remove image"
                    >
                      <X size={18} />
                    </button>
                  </div>
                ) : (
                  <label className="flex h-56 cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-gray-300 bg-gray-50 transition hover:border-[#E57036] hover:bg-orange-50">
                    <ImagePlus
                      size={42}
                      className="mb-3 text-[#E57036]"
                    />

                    <span className="font-semibold text-[#343E4F]">
                      Choose Product Image
                    </span>

                    <span className="mt-1 text-xs text-gray-500">
                      JPG, PNG, JPEG or WEBP
                    </span>

                    <span className="mt-1 text-xs text-gray-400">
                      Maximum original size: 5 MB
                    </span>

                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                  </label>
                )}

                {imageError && (
                  <p className="mt-2 rounded-lg bg-red-50 p-2 text-sm text-red-500">
                    {imageError}
                  </p>
                )}
              </div>

              {/* Product Name */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-[#343E4F]">
                  Product Name
                </label>

                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Example: White Teff"
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none transition focus:border-[#E57036] focus:ring-2 focus:ring-orange-100"
                  required
                />
              </div>

              {/* Category + Unit */}
              <div className="grid gap-4 sm:grid-cols-2">

                <div>
                  <label className="mb-2 block text-sm font-semibold text-[#343E4F]">
                    Category
                  </label>

                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-[#E57036]"
                  >
                    <option>
                      Grains & Legumes
                    </option>
                    <option>Seeds</option>
                    <option>Coffee</option>
                    <option>Vegetables</option>
                    <option>Fruits</option>
                    <option>Oils & Seeds</option>
                    <option>Fertilizer</option>
                    <option>Equipment</option>
                    <option>Pesticides</option>
                    <option>Tools</option>
                    <option>Other</option>
                  </select>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-[#343E4F]">
                    Unit
                  </label>

                  <select
                    name="unit"
                    value={formData.unit}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-[#E57036]"
                  >
                    <option value="kg">kg</option>
                    <option value="bag">bag</option>
                    <option value="liter">
                      liter
                    </option>
                    <option value="piece">
                      piece
                    </option>
                    <option value="ton">ton</option>
                    <option value="quintal">
                      quintal
                    </option>
                  </select>
                </div>
              </div>

              {/* Price + Stock */}
              <div className="grid gap-4 sm:grid-cols-2">

                <div>
                  <label className="mb-2 block text-sm font-semibold text-[#343E4F]">
                    Price (ETB)
                  </label>

                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    min="0"
                    step="0.01"
                    placeholder="180"
                    className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-[#E57036]"
                    required
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-[#343E4F]">
                    Stock
                  </label>

                  <input
                    type="number"
                    name="stock"
                    value={formData.stock}
                    onChange={handleChange}
                    min="0"
                    placeholder="100"
                    className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-[#E57036]"
                    required
                  />
                </div>
              </div>

              {/* Location */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-[#343E4F]">
                  Location
                </label>

                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="Example: Jimma, Oromia"
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-[#E57036]"
                  required
                />
              </div>

              {/* Description */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-[#343E4F]">
                  Description
                </label>

                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows="4"
                  placeholder="Describe your agricultural product..."
                  className="w-full resize-none rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-[#E57036]"
                />
              </div>

              {/* Buttons */}
              <div className="flex gap-3 border-t pt-5">

                <button
                  type="button"
                  onClick={closeModal}
                  className="flex-1 rounded-xl border border-gray-200 px-5 py-3 font-semibold text-gray-600 transition hover:bg-gray-50"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="flex-1 rounded-xl bg-[#E57036] px-5 py-3 font-semibold text-white transition hover:bg-[#cf5f2b]"
                >
                  {editingProduct
                    ? "Update Product"
                    : "Add Product"}
                </button>

              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}