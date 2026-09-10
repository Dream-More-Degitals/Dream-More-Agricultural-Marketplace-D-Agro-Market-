import { useEffect, useMemo, useState } from "react";
import {
  Package,
  Search,
  Plus,
  Edit3,
  Trash2,
  X,
  Save,
  Eye,
  AlertTriangle,
} from "lucide-react";

const defaultProducts = [
  {
    id: 1,
    name: "Organic Fertilizer",
    category: "Fertilizer",
    price: 2500,
    stock: 120,
    seller: "Green Farm Supplies",
    status: "Active",
    image: "/images/fertilizer.jpg",
  },
  {
    id: 2,
    name: "Maize Seeds",
    category: "Seeds",
    price: 1200,
    stock: 300,
    seller: "Oromia Seed Farm",
    status: "Active",
    image: "/images/maize-seeds.jpg",
  },
  {
    id: 3,
    name: "Irrigation Pipe",
    category: "Equipment",
    price: 3500,
    stock: 45,
    seller: "Agro Tech Ethiopia",
    status: "Low Stock",
    image: "/images/irrigation.jpg",
  },
  {
    id: 4,
    name: "Wheat Seeds",
    category: "Seeds",
    price: 1500,
    stock: 180,
    seller: "Highland Farmers",
    status: "Active",
    image: "/images/wheat-seeds.jpg",
  },
];

function ProductsPage() {
  const [products, setProducts] = useState(() => {
    const saved = localStorage.getItem("adminProducts");

    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return defaultProducts;
      }
    }

    return defaultProducts;
  });

  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");

  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [editingProduct, setEditingProduct] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    category: "Seeds",
    price: "",
    stock: "",
    seller: "",
    status: "Active",
    image: "",
  });

  useEffect(() => {
    localStorage.setItem(
      "adminProducts",
      JSON.stringify(products)
    );
  }, [products]);

  const filteredProducts = useMemo(() => {
    const text = search.toLowerCase();

    return products.filter((product) => {
      const matchesSearch =
        product.name.toLowerCase().includes(text) ||
        product.category.toLowerCase().includes(text) ||
        product.seller.toLowerCase().includes(text);

      const matchesCategory =
        categoryFilter === "All" ||
        product.category === categoryFilter;

      const matchesStatus =
        statusFilter === "All" ||
        product.status === statusFilter;

      return (
        matchesSearch &&
        matchesCategory &&
        matchesStatus
      );
    });
  }, [
    products,
    search,
    categoryFilter,
    statusFilter,
  ]);

  const openAddModal = () => {
    setEditingProduct(null);

    setFormData({
      name: "",
      category: "Seeds",
      price: "",
      stock: "",
      seller: "",
      status: "Active",
      image: "",
    });

    setShowModal(true);
  };

  const openEditModal = (product) => {
    setEditingProduct(product);

    setFormData({
      name: product.name,
      category: product.category,
      price: product.price,
      stock: product.stock,
      seller: product.seller,
      status: product.status,
      image: product.image || "",
    });

    setShowModal(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const stock = Number(formData.stock);
    const price = Number(formData.price);

    const product = {
      id: editingProduct
        ? editingProduct.id
        : Date.now(),
      name: formData.name.trim(),
      category: formData.category,
      price,
      stock,
      seller: formData.seller.trim(),
      status:
        stock <= 50 ? "Low Stock" : formData.status,
      image:
        formData.image.trim() ||
        "/images/product-placeholder.jpg",
    };

    if (editingProduct) {
      setProducts((prev) =>
        prev.map((item) =>
          item.id === editingProduct.id
            ? product
            : item
        )
      );
    } else {
      setProducts((prev) => [
        product,
        ...prev,
      ]);
    }

    setShowModal(false);
    setEditingProduct(null);
  };

  const deleteProduct = (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (!confirmed) return;

    setProducts((prev) =>
      prev.filter((product) => product.id !== id)
    );

    setSelectedProduct(null);
  };

  const activeProducts = products.filter(
    (product) => product.status === "Active"
  ).length;

  const lowStockProducts = products.filter(
    (product) => product.status === "Low Stock"
  ).length;

  const totalStock = products.reduce(
    (sum, product) => sum + Number(product.stock),
    0
  );

  const categories = [
    ...new Set(
      products.map((product) => product.category)
    ),
  ];

  const getStatusStyle = (status) => {
    if (status === "Active") {
      return "bg-green-100 text-green-700";
    }

    if (status === "Low Stock") {
      return "bg-yellow-100 text-yellow-700";
    }

    return "bg-gray-100 text-gray-600";
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#343E4F] sm:text-3xl">
            Product Management
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            Manage products listed across the D-Agro marketplace.
          </p>
        </div>

        <button
          onClick={openAddModal}
          className="flex items-center justify-center gap-2 rounded-xl bg-[#E57036] px-5 py-3 font-semibold text-white transition hover:bg-[#d9632d]"
        >
          <Plus size={19} />
          Add Product
        </button>
      </div>

      {/* Statistics */}
      <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="rounded-xl bg-blue-50 p-3">
              <Package
                size={22}
                className="text-blue-600"
              />
            </div>

            <div>
              <p className="text-sm text-gray-500">
                Total Products
              </p>

              <p className="text-2xl font-bold text-[#343E4F]">
                {products.length}
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="rounded-xl bg-green-50 p-3">
              <Package
                size={22}
                className="text-green-600"
              />
            </div>

            <div>
              <p className="text-sm text-gray-500">
                Active Products
              </p>

              <p className="text-2xl font-bold text-[#343E4F]">
                {activeProducts}
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="rounded-xl bg-yellow-50 p-3">
              <AlertTriangle
                size={22}
                className="text-yellow-600"
              />
            </div>

            <div>
              <p className="text-sm text-gray-500">
                Low Stock
              </p>

              <p className="text-2xl font-bold text-[#343E4F]">
                {lowStockProducts}
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="rounded-xl bg-orange-50 p-3">
              <Package
                size={22}
                className="text-orange-600"
              />
            </div>

            <div>
              <p className="text-sm text-gray-500">
                Total Stock
              </p>

              <p className="text-2xl font-bold text-[#343E4F]">
                {totalStock.toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="mb-6 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          {/* Search */}
          <div className="relative">
            <Search
              size={19}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              type="text"
              placeholder="Search products or sellers..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              className="w-full rounded-xl border border-gray-200 py-3 pl-11 pr-4 text-sm outline-none transition focus:border-[#E57036] focus:ring-2 focus:ring-[#E57036]/20"
            />
          </div>

          {/* Category */}
          <select
            value={categoryFilter}
            onChange={(e) =>
              setCategoryFilter(e.target.value)
            }
            className="rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-600 outline-none focus:border-[#E57036] focus:ring-2 focus:ring-[#E57036]/20"
          >
            <option value="All">
              All Categories
            </option>

            {categories.map((category) => (
              <option
                key={category}
                value={category}
              >
                {category}
              </option>
            ))}
          </select>

          {/* Status */}
          <select
            value={statusFilter}
            onChange={(e) =>
              setStatusFilter(e.target.value)
            }
            className="rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-600 outline-none focus:border-[#E57036] focus:ring-2 focus:ring-[#E57036]/20"
          >
            <option value="All">
              All Statuses
            </option>

            <option value="Active">
              Active
            </option>

            <option value="Low Stock">
              Low Stock
            </option>
          </select>
        </div>
      </div>

      {/* Products Table */}
      <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
        <div className="border-b border-gray-100 p-6">
          <h2 className="font-bold text-[#343E4F]">
            Marketplace Products
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            {filteredProducts.length} product
            {filteredProducts.length !== 1
              ? "s"
              : ""}{" "}
            found.
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[950px]">
            <thead className="bg-[#343E4F] text-left text-xs uppercase text-white">
              <tr>
                <th className="px-6 py-4">
                  Product
                </th>

                <th className="px-6 py-4">
                  Category
                </th>

                <th className="px-6 py-4">
                  Seller
                </th>

                <th className="px-6 py-4">
                  Price
                </th>

                <th className="px-6 py-4">
                  Stock
                </th>

                <th className="px-6 py-4">
                  Status
                </th>

                <th className="px-6 py-4 text-right">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">
              {filteredProducts.map((product) => (
                <tr
                  key={product.id}
                  className="transition hover:bg-gray-50"
                >
                  {/* Product */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="h-14 w-14 overflow-hidden rounded-xl bg-gray-100">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="h-full w-full object-cover"
                          onError={(e) => {
                            e.currentTarget.style.display =
                              "none";
                          }}
                        />
                      </div>

                      <div>
                        <p className="font-semibold text-[#343E4F]">
                          {product.name}
                        </p>

                        <p className="text-xs text-gray-400">
                          ID: {product.id}
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* Category */}
                  <td className="px-6 py-4">
                    <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-600">
                      {product.category}
                    </span>
                  </td>

                  {/* Seller */}
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {product.seller}
                  </td>

                  {/* Price */}
                  <td className="px-6 py-4 text-sm font-bold text-[#343E4F]">
                    {Number(
                      product.price
                    ).toLocaleString()}{" "}
                    ETB
                  </td>

                  {/* Stock */}
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {product.stock}
                  </td>

                  {/* Status */}
                  <td className="px-6 py-4">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${getStatusStyle(
                        product.status
                      )}`}
                    >
                      {product.status}
                    </span>
                  </td>

                  {/* Actions */}
                  <td className="px-6 py-4">
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() =>
                          setSelectedProduct(
                            product
                          )
                        }
                        title="View product"
                        className="rounded-lg p-2 text-blue-600 transition hover:bg-blue-50"
                      >
                        <Eye size={17} />
                      </button>

                      <button
                        onClick={() =>
                          openEditModal(product)
                        }
                        title="Edit product"
                        className="rounded-lg p-2 text-orange-600 transition hover:bg-orange-50"
                      >
                        <Edit3 size={17} />
                      </button>

                      <button
                        onClick={() =>
                          deleteProduct(product.id)
                        }
                        title="Delete product"
                        className="rounded-lg p-2 text-red-600 transition hover:bg-red-50"
                      >
                        <Trash2 size={17} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {filteredProducts.length === 0 && (
                <tr>
                  <td
                    colSpan="7"
                    className="px-6 py-12 text-center"
                  >
                    <Package
                      size={42}
                      className="mx-auto mb-3 text-gray-300"
                    />

                    <p className="font-semibold text-gray-500">
                      No products found
                    </p>

                    <p className="mt-1 text-sm text-gray-400">
                      Try changing your search or filters.
                    </p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="max-h-[90vh] w-full max-w-xl overflow-y-auto rounded-2xl bg-white shadow-2xl">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-gray-100 p-6">
              <div>
                <h2 className="text-xl font-bold text-[#343E4F]">
                  {editingProduct
                    ? "Edit Product"
                    : "Add Product"}
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  {editingProduct
                    ? "Update product information."
                    : "Add a new marketplace product."}
                </p>
              </div>

              <button
                onClick={() =>
                  setShowModal(false)
                }
                className="rounded-lg p-2 text-gray-500 hover:bg-gray-100"
              >
                <X size={20} />
              </button>
            </div>

            {/* Form */}
            <form
              onSubmit={handleSubmit}
              className="space-y-5 p-6"
            >
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
                  placeholder="e.g. Maize Seeds"
                  required
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-[#E57036] focus:ring-2 focus:ring-[#E57036]/20"
                />
              </div>

              {/* Category */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-[#343E4F]">
                  Category
                </label>

                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none focus:border-[#E57036] focus:ring-2 focus:ring-[#E57036]/20"
                >
                  <option value="Seeds">
                    Seeds
                  </option>

                  <option value="Fertilizer">
                    Fertilizer
                  </option>

                  <option value="Equipment">
                    Equipment
                  </option>

                  <option value="Grains & Legumes">
                    Grains & Legumes
                  </option>

                  <option value="Coffee">
                    Coffee
                  </option>

                  <option value="Vegetables">
                    Vegetables
                  </option>

                  <option value="Oils & Seeds">
                    Oils & Seeds
                  </option>
                </select>
              </div>

              {/* Price + Stock */}
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
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
                    required
                    className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-[#E57036] focus:ring-2 focus:ring-[#E57036]/20"
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
                    required
                    className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-[#E57036] focus:ring-2 focus:ring-[#E57036]/20"
                  />
                </div>
              </div>

              {/* Seller */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-[#343E4F]">
                  Seller
                </label>

                <input
                  type="text"
                  name="seller"
                  value={formData.seller}
                  onChange={handleChange}
                  placeholder="Seller or supplier name"
                  required
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-[#E57036] focus:ring-2 focus:ring-[#E57036]/20"
                />
              </div>

              {/* Status */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-[#343E4F]">
                  Status
                </label>

                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none focus:border-[#E57036] focus:ring-2 focus:ring-[#E57036]/20"
                >
                  <option value="Active">
                    Active
                  </option>

                  <option value="Low Stock">
                    Low Stock
                  </option>
                </select>
              </div>

              {/* Image */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-[#343E4F]">
                  Image Path
                </label>

                <input
                  type="text"
                  name="image"
                  value={formData.image}
                  onChange={handleChange}
                  placeholder="/images/product.jpg"
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-[#E57036] focus:ring-2 focus:ring-[#E57036]/20"
                />

                <p className="mt-1 text-xs text-gray-400">
                  Optional. Example:
                  /images/maize-seeds.jpg
                </p>
              </div>

              {/* Buttons */}
              <div className="flex flex-col-reverse gap-3 pt-2 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  onClick={() =>
                    setShowModal(false)
                  }
                  className="flex items-center justify-center gap-2 rounded-xl border border-gray-200 px-5 py-3 font-semibold text-gray-600 hover:bg-gray-50"
                >
                  <X size={18} />
                  Cancel
                </button>

                <button
                  type="submit"
                  className="flex items-center justify-center gap-2 rounded-xl bg-[#E57036] px-5 py-3 font-semibold text-white hover:bg-[#d9632d]"
                >
                  <Save size={18} />

                  {editingProduct
                    ? "Save Changes"
                    : "Add Product"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* View Product Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-lg overflow-hidden rounded-2xl bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-gray-100 p-6">
              <h2 className="text-xl font-bold text-[#343E4F]">
                Product Details
              </h2>

              <button
                onClick={() =>
                  setSelectedProduct(null)
                }
                className="rounded-lg p-2 text-gray-500 hover:bg-gray-100"
              >
                <X size={20} />
              </button>
            </div>

            <div className="p-6">
              <div className="mb-5 h-52 overflow-hidden rounded-2xl bg-gray-100">
                <img
                  src={selectedProduct.image}
                  alt={selectedProduct.name}
                  className="h-full w-full object-cover"
                  onError={(e) => {
                    e.currentTarget.style.display =
                      "none";
                  }}
                />
              </div>

              <h3 className="text-2xl font-bold text-[#343E4F]">
                {selectedProduct.name}
              </h3>

              <div className="mt-4 grid grid-cols-2 gap-4">
                <div className="rounded-xl bg-gray-50 p-4">
                  <p className="text-xs text-gray-400">
                    Category
                  </p>

                  <p className="mt-1 font-semibold text-gray-700">
                    {selectedProduct.category}
                  </p>
                </div>

                <div className="rounded-xl bg-gray-50 p-4">
                  <p className="text-xs text-gray-400">
                    Seller
                  </p>

                  <p className="mt-1 font-semibold text-gray-700">
                    {selectedProduct.seller}
                  </p>
                </div>

                <div className="rounded-xl bg-gray-50 p-4">
                  <p className="text-xs text-gray-400">
                    Price
                  </p>

                  <p className="mt-1 font-semibold text-gray-700">
                    {Number(
                      selectedProduct.price
                    ).toLocaleString()}{" "}
                    ETB
                  </p>
                </div>

                <div className="rounded-xl bg-gray-50 p-4">
                  <p className="text-xs text-gray-400">
                    Stock
                  </p>

                  <p className="mt-1 font-semibold text-gray-700">
                    {selectedProduct.stock}
                  </p>
                </div>
              </div>

              <div className="mt-5 flex items-center justify-between">
                <span
                  className={`rounded-full px-3 py-1 text-xs font-semibold ${getStatusStyle(
                    selectedProduct.status
                  )}`}
                >
                  {selectedProduct.status}
                </span>

                <button
                  onClick={() => {
                    setSelectedProduct(null);
                    openEditModal(
                      selectedProduct
                    );
                  }}
                  className="flex items-center gap-2 rounded-xl bg-[#343E4F] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#293241]"
                >
                  <Edit3 size={16} />
                  Edit
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="mt-6 text-xs text-gray-400">
        Product data is currently stored in browser localStorage.
        It will be connected to the backend and database later.
      </div>
    </div>
  );
}

export default ProductsPage;