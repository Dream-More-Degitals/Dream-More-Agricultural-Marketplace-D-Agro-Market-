import { useEffect, useState } from "react";
import {
  Plus,
  Search,
  Pencil,
  Trash2,
  ImagePlus,
  X,
} from "lucide-react";
import { compressImage } from "../../utils/imageUtils";

const defaultProducts = [
  {
    id: "supplier-1",
    name: "Organic Fertilizer",
    category: "Fertilizer",
    price: 850,
    stock: 120,
    location: "Jimma, Oromia",
    unit: "bag",
    description: "High-quality organic fertilizer for healthy crop production.",
    image: "/images/product-placeholder.jpg",
  },
  {
    id: "supplier-2",
    name: "Maize Seeds",
    category: "Seeds",
    price: 450,
    stock: 80,
    location: "Bahir Dar, Amhara",
    unit: "kg",
    description: "High-yield maize seeds suitable for Ethiopian farmers.",
    image: "/images/product-placeholder.jpg",
  },
];

const emptyForm = {
  name: "",
  category: "Seeds",
  price: "",
  stock: "",
  location: "",
  unit: "kg",
  description: "",
  image: "",
};

export default function SupplierProducts() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState(emptyForm);
  const [imageError, setImageError] = useState("");

  useEffect(() => {
    const savedProducts = localStorage.getItem("supplierProducts");

    if (savedProducts) {
      setProducts(JSON.parse(savedProducts));
    } else {
      localStorage.setItem(
        "supplierProducts",
        JSON.stringify(defaultProducts)
      );
      setProducts(defaultProducts);
    }
  }, []);

  const saveProducts = (updatedProducts) => {
    setProducts(updatedProducts);
    localStorage.setItem(
      "supplierProducts",
      JSON.stringify(updatedProducts)
    );
  };

  const openAddModal = () => {
    setEditingProduct(null);
    setFormData(emptyForm);
    setImageError("");
    setShowModal(true);
  };

  const openEditModal = (product) => {
    setEditingProduct(product);

    setFormData({
      name: product.name || "",
      category: product.category || "Seeds",
      price: product.price || "",
      stock: product.stock || "",
      location: product.location || "",
      unit: product.unit || "kg",
      description: product.description || "",
      image: product.image || "",
    });

    setImageError("");
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingProduct(null);
    setFormData(emptyForm);
    setImageError("");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = async (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    try {
      setImageError("");

      const compressedImage = await compressImage(file);

      setFormData((prev) => ({
        ...prev,
        image: compressedImage,
      }));
    } catch (error) {
      setImageError(error.message);
    }
  };

  const removeImage = () => {
    setFormData((prev) => ({
      ...prev,
      image: "",
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      alert("Please enter the product name.");
      return;
    }

    if (!formData.price || Number(formData.price) <= 0) {
      alert("Please enter a valid price.");
      return;
    }

    if (formData.stock === "" || Number(formData.stock) < 0) {
      alert("Please enter a valid stock quantity.");
      return;
    }

    if (!formData.location.trim()) {
      alert("Please enter the product location.");
      return;
    }

    if (editingProduct) {
      const updatedProducts = products.map((product) =>
        product.id === editingProduct.id
          ? {
              ...product,
              name: formData.name.trim(),
              category: formData.category,
              price: Number(formData.price),
              stock: Number(formData.stock),
              location: formData.location.trim(),
              unit: formData.unit,
              description: formData.description.trim(),
              image:
                formData.image ||
                "/images/product-placeholder.jpg",
            }
          : product
      );

      saveProducts(updatedProducts);
    } else {
      const newProduct = {
        id: `supplier-${Date.now()}`,
        name: formData.name.trim(),
        category: formData.category,
        price: Number(formData.price),
        stock: Number(formData.stock),
        location: formData.location.trim(),
        unit: formData.unit,
        description: formData.description.trim(),
        image:
          formData.image ||
          "/images/product-placeholder.jpg",
        seller: "Supplier",
      };

      saveProducts([...products, newProduct]);
    }

    closeModal();
  };

  const deleteProduct = (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (!confirmed) return;

    const updatedProducts = products.filter(
      (product) => product.id !== id
    );

    saveProducts(updatedProducts);
  };

  const filteredProducts = products.filter((product) => {
    const searchText = search.toLowerCase();

    return (
      product.name.toLowerCase().includes(searchText) ||
      product.category.toLowerCase().includes(searchText) ||
      product.location.toLowerCase().includes(searchText)
    );
  });

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#343E4F]">
            My Products
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            Manage your agricultural products and images.
          </p>
        </div>

        <button
          onClick={openAddModal}
          className="flex items-center justify-center gap-2 rounded-xl bg-[#E57036] px-5 py-3 font-semibold text-white transition hover:bg-[#cf5f2b]"
        >
          <Plus size={20} />
          Add Product
        </button>
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
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-xl border border-gray-200 py-3 pl-12 pr-4 outline-none transition focus:border-[#E57036]"
          />
        </div>
      </div>

      {/* Products */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className="overflow-hidden rounded-2xl bg-white shadow-sm"
          >
            {/* Image */}
            <div className="relative h-52 bg-gray-100">
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

              <span className="absolute left-3 top-3 rounded-full bg-white px-3 py-1 text-xs font-semibold text-[#343E4F] shadow">
                {product.category}
              </span>
            </div>

            {/* Details */}
            <div className="p-5">
              <h2 className="text-lg font-bold text-[#343E4F]">
                {product.name}
              </h2>

              <p className="mt-2 line-clamp-2 text-sm text-gray-500">
                {product.description ||
                  "No product description available."}
              </p>

              <div className="mt-4 space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">
                    Price
                  </span>

                  <span className="font-bold text-[#E57036]">
                    ETB {Number(product.price).toLocaleString()}
                    /{product.unit}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-500">
                    Stock
                  </span>

                  <span
                    className={
                      Number(product.stock) <= 50
                        ? "font-semibold text-red-500"
                        : "font-semibold text-green-600"
                    }
                  >
                    {product.stock} {product.unit}
                  </span>
                </div>

                <div className="flex justify-between gap-4">
                  <span className="text-gray-500">
                    Location
                  </span>

                  <span className="text-right font-medium text-gray-700">
                    {product.location}
                  </span>
                </div>
              </div>

              {/* Buttons */}
              <div className="mt-5 flex gap-3">
                <button
                  onClick={() => openEditModal(product)}
                  className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-gray-200 px-4 py-2.5 text-sm font-semibold text-[#343E4F] transition hover:bg-gray-50"
                >
                  <Pencil size={17} />
                  Edit
                </button>

                <button
                  onClick={() => deleteProduct(product.id)}
                  className="flex items-center justify-center rounded-xl bg-red-50 px-4 py-2.5 text-red-500 transition hover:bg-red-100"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="rounded-2xl bg-white py-16 text-center shadow-sm">
          <p className="text-gray-500">
            No products found.
          </p>
        </div>
      )}

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="max-h-[95vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white shadow-xl">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b p-5">
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
                onClick={closeModal}
                className="rounded-full p-2 text-gray-500 hover:bg-gray-100"
              >
                <X size={22} />
              </button>
            </div>

            {/* Form */}
            <form
              onSubmit={handleSubmit}
              className="space-y-5 p-5"
            >
              {/* Image Upload */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-[#343E4F]">
                  Product Image
                </label>

                {formData.image ? (
                  <div className="relative overflow-hidden rounded-2xl border">
                    <img
                      src={formData.image}
                      alt="Product preview"
                      className="h-64 w-full object-cover"
                    />

                    <button
                      type="button"
                      onClick={removeImage}
                      className="absolute right-3 top-3 rounded-full bg-red-500 p-2 text-white shadow"
                    >
                      <X size={18} />
                    </button>
                  </div>
                ) : (
                  <label className="flex h-52 cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-gray-300 bg-gray-50 transition hover:border-[#E57036] hover:bg-orange-50">
                    <ImagePlus
                      size={40}
                      className="mb-3 text-[#E57036]"
                    />

                    <span className="font-semibold text-[#343E4F]">
                      Choose Product Image
                    </span>

                    <span className="mt-1 text-xs text-gray-500">
                      JPG, PNG, JPEG or WEBP — max 5 MB
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
                  <p className="mt-2 text-sm text-red-500">
                    {imageError}
                  </p>
                )}
              </div>

              {/* Name */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-[#343E4F]">
                  Product Name
                </label>

                <input
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Example: Organic Maize"
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-[#E57036]"
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
                    <option>Seeds</option>
                    <option>Fertilizer</option>
                    <option>Grains & Legumes</option>
                    <option>Coffee</option>
                    <option>Vegetables</option>
                    <option>Fruits</option>
                    <option>Equipment</option>
                    <option>Pesticides</option>
                    <option>Tools</option>
                    <option>Oils & Seeds</option>
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
                    <option value="liter">liter</option>
                    <option value="piece">piece</option>
                    <option value="ton">ton</option>
                    <option value="quintal">quintal</option>
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
                    placeholder="850"
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
                  placeholder="Describe your product..."
                  className="w-full resize-none rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-[#E57036]"
                />
              </div>

              {/* Actions */}
              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={closeModal}
                  className="flex-1 rounded-xl border border-gray-200 px-5 py-3 font-semibold text-gray-600 hover:bg-gray-50"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="flex-1 rounded-xl bg-[#E57036] px-5 py-3 font-semibold text-white hover:bg-[#cf5f2b]"
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