import { useState } from "react";
import {
  Plus,
  Search,
  Edit,
  Trash2,
  Package,
  X,
} from "lucide-react";

function Products() {
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);

  const [products, setProducts] = useState([
    {
      id: 1,
      name: "Organic Fertilizer",
      category: "Fertilizer",
      price: "2,500 ETB",
      stock: 120,
      status: "Active",
      image: "/images/fertilizer.jpg",
    },
    {
      id: 2,
      name: "Maize Seeds",
      category: "Seeds",
      price: "1,200 ETB",
      stock: 300,
      status: "Active",
      image: "/images/maize-seeds.jpg",
    },
    {
      id: 3,
      name: "Irrigation Pipe",
      category: "Equipment",
      price: "3,500 ETB",
      stock: 45,
      status: "Low Stock",
      image: "/images/irrigation.jpg",
    },
    {
      id: 4,
      name: "Wheat Seeds",
      category: "Seeds",
      price: "1,500 ETB",
      stock: 180,
      status: "Active",
      image: "/images/wheat-seeds.jpg",
    },
  ]);

  const [newProduct, setNewProduct] = useState({
    name: "",
    category: "",
    price: "",
    stock: "",
  });

  /* =========================
     SEARCH
  ========================= */

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  /* =========================
     ADD PRODUCT
  ========================= */

  const handleAddProduct = (e) => {
    e.preventDefault();

    if (
      !newProduct.name ||
      !newProduct.category ||
      !newProduct.price ||
      !newProduct.stock
    ) {
      return;
    }

    const product = {
      id: Date.now(),
      name: newProduct.name,
      category: newProduct.category,
      price: `${newProduct.price} ETB`,
      stock: Number(newProduct.stock),
      status: Number(newProduct.stock) <= 50 ? "Low Stock" : "Active",
      image: "/images/product-placeholder.jpg",
    };

    setProducts([...products, product]);

    setNewProduct({
      name: "",
      category: "",
      price: "",
      stock: "",
    });

    setShowModal(false);
  };

  /* =========================
     DELETE PRODUCT
  ========================= */

  const handleDelete = (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (confirmed) {
      setProducts(products.filter((product) => product.id !== id));
    }
  };

  return (
    <div>

      {/* =========================
          HEADER
      ========================= */}

      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

        <div>
          <h1 className="text-2xl font-bold text-[#343E4F] sm:text-3xl">
            My Products
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            Manage the agricultural products you provide to buyers.
          </p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="flex items-center justify-center gap-2 rounded-lg bg-[#E57036] px-5 py-3 text-sm font-semibold text-white transition hover:opacity-90"
        >
          <Plus size={18} />
          Add Product
        </button>

      </div>


      {/* =========================
          SEARCH + SUMMARY
      ========================= */}

      <div className="mb-6 grid gap-4 lg:grid-cols-[1fr_auto_auto]">

        {/* SEARCH */}

        <div className="flex items-center gap-3 rounded-xl border border-gray-200 bg-white px-4 shadow-sm">

          <Search
            size={19}
            className="text-gray-400"
          />

          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search products..."
            className="w-full bg-transparent py-3 text-sm text-[#343E4F] outline-none"
          />

        </div>


        {/* TOTAL PRODUCTS */}

        <div className="flex items-center gap-3 rounded-xl border border-gray-200 bg-white px-5 py-3 shadow-sm">

          <div className="rounded-lg bg-orange-50 p-2 text-[#E57036]">
            <Package size={20} />
          </div>

          <div>
            <p className="text-xs text-gray-500">
              Total Products
            </p>

            <p className="text-lg font-bold text-[#343E4F]">
              {products.length}
            </p>
          </div>

        </div>


        {/* ACTIVE PRODUCTS */}

        <div className="rounded-xl border border-gray-200 bg-white px-5 py-3 shadow-sm">

          <p className="text-xs text-gray-500">
            Active Listings
          </p>

          <p className="text-lg font-bold text-[#343E4F]">
            {products.filter(
              (product) => product.status === "Active"
            ).length}
          </p>

        </div>

      </div>


      {/* =========================
          PRODUCTS TABLE
      ========================= */}

      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">

        <div className="border-b p-5">

          <h2 className="text-lg font-semibold text-[#343E4F]">
            Product Inventory
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            View and manage your listed products.
          </p>

        </div>


        <div className="overflow-x-auto">

          <table className="w-full min-w-[800px]">

            {/* TABLE HEADER */}

            <thead className="bg-[#F8F9FA]">

              <tr className="text-left text-xs uppercase tracking-wide text-gray-500">

                <th className="px-6 py-4">
                  Product
                </th>

                <th className="px-6 py-4">
                  Category
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


            {/* TABLE BODY */}

            <tbody>

              {filteredProducts.length > 0 ? (

                filteredProducts.map((product) => (

                  <tr
                    key={product.id}
                    className="border-t border-gray-100 transition hover:bg-gray-50"
                  >

                    {/* PRODUCT */}

                    <td className="px-6 py-4">

                      <div className="flex items-center gap-3">

                        <div className="h-12 w-12 overflow-hidden rounded-lg bg-gray-100">

                          <img
                            src={product.image}
                            alt={product.name}
                            className="h-full w-full object-cover"
                            onError={(e) => {
                              e.currentTarget.style.display = "none";
                            }}
                          />

                        </div>

                        <div>

                          <p className="font-semibold text-[#343E4F]">
                            {product.name}
                          </p>

                          <p className="text-xs text-gray-400">
                            Product #{product.id}
                          </p>

                        </div>

                      </div>

                    </td>


                    {/* CATEGORY */}

                    <td className="px-6 py-4 text-sm text-gray-500">
                      {product.category}
                    </td>


                    {/* PRICE */}

                    <td className="px-6 py-4 text-sm font-semibold text-[#343E4F]">
                      {product.price}
                    </td>


                    {/* STOCK */}

                    <td className="px-6 py-4 text-sm text-gray-500">
                      {product.stock}
                    </td>


                    {/* STATUS */}

                    <td className="px-6 py-4">

                      <span
                        className={`rounded-full px-3 py-1 text-xs font-medium ${
                          product.status === "Active"
                            ? "bg-green-50 text-green-600"
                            : "bg-orange-50 text-[#E57036]"
                        }`}
                      >
                        {product.status}
                      </span>

                    </td>


                    {/* ACTIONS */}

                    <td className="px-6 py-4">

                      <div className="flex justify-end gap-2">

                        <button
                          className="rounded-lg p-2 text-[#343E4F] transition hover:bg-gray-100"
                          title="Edit product"
                        >
                          <Edit size={17} />
                        </button>

                        <button
                          onClick={() => handleDelete(product.id)}
                          className="rounded-lg p-2 text-red-500 transition hover:bg-red-50"
                          title="Delete product"
                        >
                          <Trash2 size={17} />
                        </button>

                      </div>

                    </td>

                  </tr>

                ))

              ) : (

                <tr>

                  <td
                    colSpan="6"
                    className="px-6 py-12 text-center"
                  >

                    <Package
                      size={40}
                      className="mx-auto text-gray-300"
                    />

                    <p className="mt-3 text-sm font-medium text-gray-500">
                      No products found
                    </p>

                    <p className="mt-1 text-xs text-gray-400">
                      Try another search or add a new product.
                    </p>

                  </td>

                </tr>

              )}

            </tbody>

          </table>

        </div>

      </div>


      {/* =========================
          ADD PRODUCT MODAL
      ========================= */}

      {showModal && (

        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 px-4">

          <div className="w-full max-w-lg rounded-2xl bg-white shadow-2xl">

            {/* MODAL HEADER */}

            <div className="flex items-center justify-between border-b px-6 py-5">

              <div>

                <h2 className="text-lg font-bold text-[#343E4F]">
                  Add New Product
                </h2>

                <p className="mt-1 text-xs text-gray-500">
                  Add your agricultural product to the marketplace.
                </p>

              </div>

              <button
                onClick={() => setShowModal(false)}
                className="rounded-lg p-2 text-gray-400 hover:bg-gray-100"
              >
                <X size={20} />
              </button>

            </div>


            {/* FORM */}

            <form
              onSubmit={handleAddProduct}
              className="space-y-5 p-6"
            >

              {/* PRODUCT NAME */}

              <div>

                <label className="mb-2 block text-sm font-medium text-[#343E4F]">
                  Product Name
                </label>

                <input
                  type="text"
                  value={newProduct.name}
                  onChange={(e) =>
                    setNewProduct({
                      ...newProduct,
                      name: e.target.value,
                    })
                  }
                  placeholder="Example: Organic Fertilizer"
                  className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-[#E57036]"
                />

              </div>


              {/* CATEGORY */}

              <div>

                <label className="mb-2 block text-sm font-medium text-[#343E4F]">
                  Category
                </label>

                <select
                  value={newProduct.category}
                  onChange={(e) =>
                    setNewProduct({
                      ...newProduct,
                      category: e.target.value,
                    })
                  }
                  className="w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm outline-none focus:border-[#E57036]"
                >

                  <option value="">
                    Select category
                  </option>

                  <option value="Seeds">
                    Seeds
                  </option>

                  <option value="Fertilizer">
                    Fertilizer
                  </option>

                  <option value="Equipment">
                    Equipment
                  </option>

                  <option value="Pesticides">
                    Pesticides
                  </option>

                  <option value="Other">
                    Other
                  </option>

                </select>

              </div>


              {/* PRICE + STOCK */}

              <div className="grid gap-4 sm:grid-cols-2">

                <div>

                  <label className="mb-2 block text-sm font-medium text-[#343E4F]">
                    Price (ETB)
                  </label>

                  <input
                    type="number"
                    value={newProduct.price}
                    onChange={(e) =>
                      setNewProduct({
                        ...newProduct,
                        price: e.target.value,
                      })
                    }
                    placeholder="2500"
                    className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm outline-none focus:border-[#E57036]"
                  />

                </div>


                <div>

                  <label className="mb-2 block text-sm font-medium text-[#343E4F]">
                    Stock
                  </label>

                  <input
                    type="number"
                    value={newProduct.stock}
                    onChange={(e) =>
                      setNewProduct({
                        ...newProduct,
                        stock: e.target.value,
                      })
                    }
                    placeholder="100"
                    className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm outline-none focus:border-[#E57036]"
                  />

                </div>

              </div>


              {/* BUTTONS */}

              <div className="flex gap-3 pt-3">

                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 rounded-lg border border-gray-200 px-4 py-3 text-sm font-semibold text-gray-600 transition hover:bg-gray-50"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="flex-1 rounded-lg bg-[#E57036] px-4 py-3 text-sm font-semibold text-white transition hover:opacity-90"
                >
                  Add Product
                </button>

              </div>

            </form>

          </div>

        </div>

      )}

    </div>
  );
}

export default Products;