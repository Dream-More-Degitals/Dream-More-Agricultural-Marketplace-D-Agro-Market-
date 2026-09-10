import React, { useEffect, useState } from "react";
import { User, Phone, MapPin, Mail, Edit3, Save } from "lucide-react";

function Profile() {
  const [user, setUser] = useState({
    fullName: "",
    email: "",
    phone: "",
    region: "",
    city: "",
    address: "",
    role: "buyer",
  });

  const [editing, setEditing] = useState(false);

  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem("user"));

    if (savedUser) {
      setUser({
        fullName: savedUser.fullName || savedUser.name || "",
        email: savedUser.email || "",
        phone: savedUser.phone || "",
        region: savedUser.region || "",
        city: savedUser.city || "",
        address: savedUser.address || "",
        role: savedUser.role || "buyer",
      });
    }
  }, []);

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = () => {
    const existingUser = JSON.parse(localStorage.getItem("user")) || {};

    const updatedUser = {
      ...existingUser,
      ...user,
    };

    localStorage.setItem("user", JSON.stringify(updatedUser));
    setUser(updatedUser);
    setEditing(false);
  };

  const initials =
    user.fullName
      ?.split(" ")
      .map((word) => word[0])
      .join("")
      .slice(0, 2)
      .toUpperCase() || "BU";

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#343E4F]">
            My Profile
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage your personal information and account details.
          </p>
        </div>

        {!editing ? (
          <button
            onClick={() => setEditing(true)}
            className="flex items-center justify-center gap-2 rounded-xl bg-[#E57036] px-5 py-3 text-sm font-semibold text-white transition hover:bg-orange-600"
          >
            <Edit3 size={18} />
            Edit Profile
          </button>
        ) : (
          <button
            onClick={handleSave}
            className="flex items-center justify-center gap-2 rounded-xl bg-[#343E4F] px-5 py-3 text-sm font-semibold text-white transition hover:bg-gray-700"
          >
            <Save size={18} />
            Save Changes
          </button>
        )}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Profile Card */}
        <div className="rounded-2xl bg-white p-6 shadow-sm">
          <div className="flex flex-col items-center text-center">
            <div className="flex h-28 w-28 items-center justify-center rounded-full bg-[#343E4F] text-3xl font-bold text-white">
              {initials}
            </div>

            <h2 className="mt-5 text-xl font-bold text-[#343E4F]">
              {user.fullName || "Buyer"}
            </h2>

            <p className="mt-1 text-sm capitalize text-gray-500">
              {user.role}
            </p>

            <div className="mt-6 w-full border-t pt-5 text-left">
              <div className="flex items-center gap-3 py-2">
                <Mail size={18} className="text-[#E57036]" />
                <span className="break-all text-sm text-gray-600">
                  {user.email || "No email added"}
                </span>
              </div>

              <div className="flex items-center gap-3 py-2">
                <Phone size={18} className="text-[#E57036]" />
                <span className="text-sm text-gray-600">
                  {user.phone || "No phone added"}
                </span>
              </div>

              <div className="flex items-center gap-3 py-2">
                <MapPin size={18} className="text-[#E57036]" />
                <span className="text-sm text-gray-600">
                  {user.city || "Location not added"}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Personal Information */}
        <div className="rounded-2xl bg-white p-6 shadow-sm lg:col-span-2">
          <h2 className="mb-6 text-lg font-bold text-[#343E4F]">
            Personal Information
          </h2>

          <div className="grid gap-5 sm:grid-cols-2">
            {/* Full Name */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Full Name
              </label>

              <input
                type="text"
                name="fullName"
                value={user.fullName}
                onChange={handleChange}
                disabled={!editing}
                className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-[#E57036] disabled:bg-gray-50 disabled:text-gray-500"
              />
            </div>

            {/* Email */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Email
              </label>

              <input
                type="email"
                name="email"
                value={user.email}
                onChange={handleChange}
                disabled={!editing}
                className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-[#E57036] disabled:bg-gray-50 disabled:text-gray-500"
              />
            </div>

            {/* Phone */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Phone Number
              </label>

              <input
                type="text"
                name="phone"
                value={user.phone}
                onChange={handleChange}
                disabled={!editing}
                className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-[#E57036] disabled:bg-gray-50 disabled:text-gray-500"
              />
            </div>

            {/* Region */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Region
              </label>

              <input
                type="text"
                name="region"
                value={user.region}
                onChange={handleChange}
                disabled={!editing}
                className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-[#E57036] disabled:bg-gray-50 disabled:text-gray-500"
              />
            </div>

            {/* City */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                City
              </label>

              <input
                type="text"
                name="city"
                value={user.city}
                onChange={handleChange}
                disabled={!editing}
                className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-[#E57036] disabled:bg-gray-50 disabled:text-gray-500"
              />
            </div>

            {/* Address */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Address
              </label>

              <input
                type="text"
                name="address"
                value={user.address}
                onChange={handleChange}
                disabled={!editing}
                className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-[#E57036] disabled:bg-gray-50 disabled:text-gray-500"
              />
            </div>
          </div>

          {/* Account Type */}
          <div className="mt-6 rounded-xl bg-gray-50 p-4">
            <div className="flex items-center gap-3">
              <User size={20} className="text-[#E57036]" />

              <div>
                <p className="text-xs text-gray-500">
                  Account Type
                </p>

                <p className="font-semibold capitalize text-[#343E4F]">
                  {user.role}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;