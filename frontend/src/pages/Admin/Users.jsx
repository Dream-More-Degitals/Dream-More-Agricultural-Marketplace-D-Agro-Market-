import { useMemo, useState } from "react";
import {
  Users,
  Search,
  Eye,
  Edit3,
  Trash2,
  X,
  UserCheck,
  UserX,
  ShieldCheck,
} from "lucide-react";

const initialUsers = [
  {
    id: 1,
    name: "Abebe Kebede",
    email: "abebe@example.com",
    phone: "0911223344",
    role: "Buyer",
    location: "Jimma, Oromia",
    status: "Active",
  },
  {
    id: 2,
    name: "Hanna Ali",
    email: "hanna@example.com",
    phone: "0922334455",
    role: "Farmer",
    location: "Bale, Oromia",
    status: "Active",
  },
  {
    id: 3,
    name: "Mohammed Ahmed",
    email: "mohammed@example.com",
    phone: "0933445566",
    role: "Supplier",
    location: "Nekemte, Oromia",
    status: "Active",
  },
  {
    id: 4,
    name: "Dawit Tesfaye",
    email: "dawit@example.com",
    phone: "0944556677",
    role: "Transporter",
    location: "Addis Ababa",
    status: "Pending",
  },
  {
    id: 5,
    name: "Fatuma Omar",
    email: "fatuma@example.com",
    phone: "0955667788",
    role: "Buyer",
    location: "Adama, Oromia",
    status: "Blocked",
  },
];

function UsersPage() {
  const [users, setUsers] = useState(initialUsers);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [selectedUser, setSelectedUser] = useState(null);

  const filteredUsers = useMemo(() => {
    const searchText = search.toLowerCase();

    return users.filter((user) => {
      const matchesSearch =
        user.name.toLowerCase().includes(searchText) ||
        user.email.toLowerCase().includes(searchText) ||
        user.phone.includes(searchText) ||
        user.location.toLowerCase().includes(searchText);

      const matchesRole =
        roleFilter === "All" ||
        user.role === roleFilter;

      const matchesStatus =
        statusFilter === "All" ||
        user.status === statusFilter;

      return (
        matchesSearch &&
        matchesRole &&
        matchesStatus
      );
    });
  }, [users, search, roleFilter, statusFilter]);

  const updateStatus = (id, status) => {
    setUsers((prev) =>
      prev.map((user) =>
        user.id === id
          ? { ...user, status }
          : user
      )
    );

    setSelectedUser((prev) =>
      prev?.id === id
        ? { ...prev, status }
        : prev
    );
  };

  const deleteUser = (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this user?"
    );

    if (!confirmed) return;

    setUsers((prev) =>
      prev.filter((user) => user.id !== id)
    );

    setSelectedUser(null);
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-700";

      case "Pending":
        return "bg-yellow-100 text-yellow-700";

      case "Blocked":
        return "bg-red-100 text-red-700";

      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  const getRoleStyle = (role) => {
    switch (role) {
      case "Farmer":
        return "bg-green-50 text-green-700";

      case "Buyer":
        return "bg-blue-50 text-blue-700";

      case "Supplier":
        return "bg-orange-50 text-orange-700";

      case "Transporter":
        return "bg-purple-50 text-purple-700";

      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  const activeUsers = users.filter(
    (user) => user.status === "Active"
  ).length;

  const pendingUsers = users.filter(
    (user) => user.status === "Pending"
  ).length;

  const blockedUsers = users.filter(
    (user) => user.status === "Blocked"
  ).length;

  const farmers = users.filter(
    (user) => user.role === "Farmer"
  ).length;

  const buyers = users.filter(
    (user) => user.role === "Buyer"
  ).length;

  const suppliers = users.filter(
    (user) => user.role === "Supplier"
  ).length;

  const transporters = users.filter(
    (user) => user.role === "Transporter"
  ).length;

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-[#343E4F] sm:text-3xl">
          User Management
        </h1>

        <p className="mt-1 text-sm text-gray-500">
          Manage buyers, farmers, suppliers, and transporters.
        </p>
      </div>

      {/* Statistics */}
      <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="rounded-xl bg-blue-50 p-3">
              <Users
                size={22}
                className="text-blue-600"
              />
            </div>

            <div>
              <p className="text-sm text-gray-500">
                Total Users
              </p>

              <p className="text-2xl font-bold text-[#343E4F]">
                {users.length}
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="rounded-xl bg-green-50 p-3">
              <UserCheck
                size={22}
                className="text-green-600"
              />
            </div>

            <div>
              <p className="text-sm text-gray-500">
                Active Users
              </p>

              <p className="text-2xl font-bold text-[#343E4F]">
                {activeUsers}
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="rounded-xl bg-yellow-50 p-3">
              <ShieldCheck
                size={22}
                className="text-yellow-600"
              />
            </div>

            <div>
              <p className="text-sm text-gray-500">
                Pending
              </p>

              <p className="text-2xl font-bold text-[#343E4F]">
                {pendingUsers}
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="rounded-xl bg-red-50 p-3">
              <UserX
                size={22}
                className="text-red-600"
              />
            </div>

            <div>
              <p className="text-sm text-gray-500">
                Blocked
              </p>

              <p className="text-2xl font-bold text-[#343E4F]">
                {blockedUsers}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Role Summary */}
      <div className="mb-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
        <div className="rounded-2xl bg-green-50 p-5">
          <p className="text-sm text-green-700">
            Farmers
          </p>

          <p className="mt-1 text-2xl font-bold text-green-800">
            {farmers}
          </p>
        </div>

        <div className="rounded-2xl bg-blue-50 p-5">
          <p className="text-sm text-blue-700">
            Buyers
          </p>

          <p className="mt-1 text-2xl font-bold text-blue-800">
            {buyers}
          </p>
        </div>

        <div className="rounded-2xl bg-orange-50 p-5">
          <p className="text-sm text-orange-700">
            Suppliers
          </p>

          <p className="mt-1 text-2xl font-bold text-orange-800">
            {suppliers}
          </p>
        </div>

        <div className="rounded-2xl bg-purple-50 p-5">
          <p className="text-sm text-purple-700">
            Transporters
          </p>

          <p className="mt-1 text-2xl font-bold text-purple-800">
            {transporters}
          </p>
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
              placeholder="Search users..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              className="w-full rounded-xl border border-gray-200 py-3 pl-11 pr-4 text-sm outline-none transition focus:border-[#E57036] focus:ring-2 focus:ring-[#E57036]/20"
            />
          </div>

          {/* Role */}
          <select
            value={roleFilter}
            onChange={(e) =>
              setRoleFilter(e.target.value)
            }
            className="rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-600 outline-none focus:border-[#E57036] focus:ring-2 focus:ring-[#E57036]/20"
          >
            <option value="All">All Roles</option>
            <option value="Farmer">Farmer</option>
            <option value="Buyer">Buyer</option>
            <option value="Supplier">Supplier</option>
            <option value="Transporter">
              Transporter
            </option>
          </select>

          {/* Status */}
          <select
            value={statusFilter}
            onChange={(e) =>
              setStatusFilter(e.target.value)
            }
            className="rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-600 outline-none focus:border-[#E57036] focus:ring-2 focus:ring-[#E57036]/20"
          >
            <option value="All">All Statuses</option>
            <option value="Active">Active</option>
            <option value="Pending">Pending</option>
            <option value="Blocked">Blocked</option>
          </select>
        </div>
      </div>

      {/* Users Table */}
      <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
        <div className="flex items-center justify-between border-b border-gray-100 p-6">
          <div>
            <h2 className="font-bold text-[#343E4F]">
              Platform Users
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              {filteredUsers.length} user
              {filteredUsers.length !== 1 ? "s" : ""} found.
            </p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px]">
            <thead className="bg-[#343E4F] text-left text-xs uppercase text-white">
              <tr>
                <th className="px-6 py-4">
                  User
                </th>

                <th className="px-6 py-4">
                  Contact
                </th>

                <th className="px-6 py-4">
                  Role
                </th>

                <th className="px-6 py-4">
                  Location
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
              {filteredUsers.map((user) => (
                <tr
                  key={user.id}
                  className="transition hover:bg-gray-50"
                >
                  {/* User */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#343E4F] text-sm font-bold text-white">
                        {user.name
                          .split(" ")
                          .map((word) => word[0])
                          .slice(0, 2)
                          .join("")
                          .toUpperCase()}
                      </div>

                      <div>
                        <p className="font-semibold text-[#343E4F]">
                          {user.name}
                        </p>

                        <p className="text-xs text-gray-400">
                          ID: {user.id}
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* Contact */}
                  <td className="px-6 py-4">
                    <p className="text-sm text-gray-700">
                      {user.email}
                    </p>

                    <p className="mt-1 text-xs text-gray-400">
                      {user.phone}
                    </p>
                  </td>

                  {/* Role */}
                  <td className="px-6 py-4">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${getRoleStyle(
                        user.role
                      )}`}
                    >
                      {user.role}
                    </span>
                  </td>

                  {/* Location */}
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {user.location}
                  </td>

                  {/* Status */}
                  <td className="px-6 py-4">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${getStatusStyle(
                        user.status
                      )}`}
                    >
                      {user.status}
                    </span>
                  </td>

                  {/* Actions */}
                  <td className="px-6 py-4">
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() =>
                          setSelectedUser(user)
                        }
                        title="View user"
                        className="rounded-lg p-2 text-blue-600 transition hover:bg-blue-50"
                      >
                        <Eye size={17} />
                      </button>

                      <button
                        onClick={() =>
                          updateStatus(
                            user.id,
                            user.status === "Active"
                              ? "Blocked"
                              : "Active"
                          )
                        }
                        title={
                          user.status === "Active"
                            ? "Block user"
                            : "Activate user"
                        }
                        className="rounded-lg p-2 text-orange-600 transition hover:bg-orange-50"
                      >
                        <Edit3 size={17} />
                      </button>

                      <button
                        onClick={() =>
                          deleteUser(user.id)
                        }
                        title="Delete user"
                        className="rounded-lg p-2 text-red-600 transition hover:bg-red-50"
                      >
                        <Trash2 size={17} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {filteredUsers.length === 0 && (
                <tr>
                  <td
                    colSpan="6"
                    className="px-6 py-12 text-center"
                  >
                    <Users
                      size={42}
                      className="mx-auto mb-3 text-gray-300"
                    />

                    <p className="font-semibold text-gray-500">
                      No users found
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

      {/* User Details Modal */}
      {selectedUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-lg overflow-hidden rounded-2xl bg-white shadow-2xl">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-gray-100 p-6">
              <div>
                <h2 className="text-xl font-bold text-[#343E4F]">
                  User Details
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  User ID: {selectedUser.id}
                </p>
              </div>

              <button
                onClick={() =>
                  setSelectedUser(null)
                }
                className="rounded-lg p-2 text-gray-500 hover:bg-gray-100"
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal Content */}
            <div className="space-y-5 p-6">
              <div className="flex flex-col items-center">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#343E4F] text-2xl font-bold text-white">
                  {selectedUser.name
                    .split(" ")
                    .map((word) => word[0])
                    .slice(0, 2)
                    .join("")
                    .toUpperCase()}
                </div>

                <h3 className="mt-3 text-lg font-bold text-[#343E4F]">
                  {selectedUser.name}
                </h3>

                <span
                  className={`mt-2 rounded-full px-3 py-1 text-xs font-semibold ${getRoleStyle(
                    selectedUser.role
                  )}`}
                >
                  {selectedUser.role}
                </span>
              </div>

              <div className="rounded-xl bg-gray-50 p-5">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <p className="text-xs text-gray-400">
                      Email
                    </p>

                    <p className="mt-1 text-sm font-medium text-gray-700">
                      {selectedUser.email}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-gray-400">
                      Phone
                    </p>

                    <p className="mt-1 text-sm font-medium text-gray-700">
                      {selectedUser.phone}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-gray-400">
                      Location
                    </p>

                    <p className="mt-1 text-sm font-medium text-gray-700">
                      {selectedUser.location}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-gray-400">
                      Status
                    </p>

                    <span
                      className={`mt-1 inline-block rounded-full px-3 py-1 text-xs font-semibold ${getStatusStyle(
                        selectedUser.status
                      )}`}
                    >
                      {selectedUser.status}
                    </span>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {selectedUser.status === "Blocked" ? (
                  <button
                    onClick={() =>
                      updateStatus(
                        selectedUser.id,
                        "Active"
                      )
                    }
                    className="rounded-xl bg-green-600 px-4 py-3 font-semibold text-white transition hover:bg-green-700"
                  >
                    Activate User
                  </button>
                ) : (
                  <button
                    onClick={() =>
                      updateStatus(
                        selectedUser.id,
                        "Blocked"
                      )
                    }
                    className="rounded-xl bg-orange-500 px-4 py-3 font-semibold text-white transition hover:bg-orange-600"
                  >
                    Block User
                  </button>
                )}

                <button
                  onClick={() =>
                    deleteUser(selectedUser.id)
                  }
                  className="rounded-xl bg-red-600 px-4 py-3 font-semibold text-white transition hover:bg-red-700"
                >
                  Delete User
                </button>
              </div>
            </div>

            {/* Footer */}
            <div className="border-t border-gray-100 p-6">
              <button
                onClick={() =>
                  setSelectedUser(null)
                }
                className="w-full rounded-xl bg-[#343E4F] px-5 py-3 font-semibold text-white transition hover:bg-[#293241]"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default UsersPage;