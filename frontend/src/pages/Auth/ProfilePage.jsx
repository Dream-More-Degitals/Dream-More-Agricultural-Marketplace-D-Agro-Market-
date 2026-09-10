import React, { useEffect, useState } from "react";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Briefcase,
  Leaf,
  Truck,
  Building2,
  Save,
  CheckCircle,
  Edit3,
  ShieldCheck,
} from "lucide-react";

export default function ProfilePage() {
  const [user, setUser] = useState(null);
  const [saved, setSaved] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
    bio: "",
    farmName: "",
    farmType: "",
    businessName: "",
    businessType: "",
    vehicleType: "",
  });

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    const savedProfile = localStorage.getItem("profile");

    let userData = {};
    let profileData = {};

    try {
      userData = savedUser ? JSON.parse(savedUser) : {};
    } catch {
      userData = {};
    }

    try {
      profileData = savedProfile ? JSON.parse(savedProfile) : {};
    } catch {
      profileData = {};
    }

    setUser(userData);

    setForm({
      name: profileData.name || userData.name || "",
      email: profileData.email || userData.email || "",
      phone: profileData.phone || "",
      location: profileData.location || "",
      bio: profileData.bio || "",
      farmName: profileData.farmName || "",
      farmType: profileData.farmType || "",
      businessName: profileData.businessName || "",
      businessType: profileData.businessType || "",
      vehicleType: profileData.vehicleType || "",
    });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    setSaved(false);
  };

  const handleSave = () => {
    const existingUser = JSON.parse(
      localStorage.getItem("user") || "{}"
    );

    const updatedProfile = {
      ...form,
    };

    // Save common profile
    localStorage.setItem(
      "profile",
      JSON.stringify(updatedProfile)
    );

    // Keep profile information inside user as well
    const updatedUser = {
      ...existingUser,
      name: form.name,
      email: form.email,
      profile: updatedProfile,
    };

    localStorage.setItem(
      "user",
      JSON.stringify(updatedUser)
    );

    setUser(updatedUser);
    setSaved(true);

    setTimeout(() => {
      setSaved(false);
    }, 3000);
  };

  const getRoles = () => {
    if (!user) return [];

    if (Array.isArray(user.roles)) {
      return user.roles;
    }

    if (user.role) {
      return [user.role];
    }

    return [];
  };

  const roles = getRoles();

  const hasRole = (role) => {
    return roles.some(
      (item) =>
        String(item).toLowerCase() === role.toLowerCase()
    );
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8 text-center max-w-md w-full">
          <div className="w-16 h-16 mx-auto rounded-full bg-slate-100 flex items-center justify-center mb-4">
            <User className="w-8 h-8 text-[#343E4F]" />
          </div>

          <h2 className="text-xl font-black text-[#343E4F]">
            Profile Not Available
          </h2>

          <p className="text-sm text-slate-500 mt-2">
            Please log in to view and manage your profile.
          </p>

          <a
            href="/login"
            className="inline-flex items-center justify-center mt-6 px-6 py-3 rounded-xl bg-[#E57036] text-white text-sm font-bold hover:bg-[#E57036]/90 transition"
          >
            Go to Login
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 p-4 sm:p-6 md:p-8">
      <div className="max-w-5xl mx-auto space-y-6">

        {/* Header */}
        <div>
          <h1 className="text-2xl md:text-3xl font-black text-[#343E4F]">
            My Profile
          </h1>

          <p className="text-sm text-slate-500 mt-1">
            Manage your personal information and D-Agro account details.
          </p>
        </div>

        {/* Profile Header Card */}
        <div className="bg-[#343E4F] rounded-2xl p-6 md:p-8 text-white shadow-sm">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5">

            {/* Avatar */}
            <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center flex-shrink-0">
              <span className="text-3xl font-black text-[#E57036]">
                {form.name
                  ? form.name.charAt(0).toUpperCase()
                  : "U"}
              </span>
            </div>

            <div className="text-center sm:text-left">
              <h2 className="text-xl md:text-2xl font-black">
                {form.name || "D-Agro User"}
              </h2>

              <p className="text-white/70 text-sm mt-1">
                {form.email}
              </p>

              {/* Roles */}
              <div className="flex flex-wrap justify-center sm:justify-start gap-2 mt-3">
                {roles.length > 0 ? (
                  roles.map((role, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 rounded-full bg-white/10 border border-white/10 text-xs font-bold"
                    >
                      {role}
                    </span>
                  ))
                ) : (
                  <span className="px-3 py-1 rounded-full bg-white/10 text-xs font-bold">
                    D-Agro User
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Main Profile Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">

          {/* Section Header */}
          <div className="p-5 sm:p-6 border-b border-slate-100 flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-orange-50">
              <Edit3 className="w-5 h-5 text-[#E57036]" />
            </div>

            <div>
              <h2 className="font-black text-[#343E4F]">
                Personal Information
              </h2>

              <p className="text-xs text-slate-400 mt-0.5">
                Update your account information.
              </p>
            </div>
          </div>

          <div className="p-5 sm:p-6 space-y-6">

            {/* Name + Email */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

              <InputField
                label="Full Name"
                name="name"
                value={form.name}
                onChange={handleChange}
                icon={<User />}
              />

              <InputField
                label="Email Address"
                name="email"
                value={form.email}
                onChange={handleChange}
                icon={<Mail />}
                type="email"
              />

            </div>

            {/* Phone + Location */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

              <InputField
                label="Phone Number"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                icon={<Phone />}
                placeholder="+251 9XX XXX XXX"
              />

              <InputField
                label="Location"
                name="location"
                value={form.location}
                onChange={handleChange}
                icon={<MapPin />}
                placeholder="Region / City"
              />

            </div>

            {/* Bio */}
            <div>
              <label className="block text-xs font-bold text-slate-600 mb-2">
                About Me
              </label>

              <textarea
                name="bio"
                value={form.bio}
                onChange={handleChange}
                rows="4"
                placeholder="Tell us a little about yourself..."
                className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-700 outline-none resize-none focus:border-[#E57036] focus:ring-2 focus:ring-orange-100 transition"
              />
            </div>

            {/* Farmer Section */}
            {hasRole("Farmer") && (
              <div className="border-t border-slate-100 pt-6">

                <div className="flex items-center gap-3 mb-5">
                  <div className="p-2.5 rounded-xl bg-green-50">
                    <Leaf className="w-5 h-5 text-green-600" />
                  </div>

                  <div>
                    <h3 className="font-black text-[#343E4F]">
                      Farmer Information
                    </h3>

                    <p className="text-xs text-slate-400">
                      Information about your farming activity.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                  <InputField
                    label="Farm Name"
                    name="farmName"
                    value={form.farmName}
                    onChange={handleChange}
                    icon={<Leaf />}
                    placeholder="Enter farm name"
                  />

                  <InputField
                    label="Farm Type"
                    name="farmType"
                    value={form.farmType}
                    onChange={handleChange}
                    icon={<Briefcase />}
                    placeholder="Crop, Livestock, Mixed..."
                  />

                </div>
              </div>
            )}

            {/* Supplier Section */}
            {hasRole("Supplier") && (
              <div className="border-t border-slate-100 pt-6">

                <div className="flex items-center gap-3 mb-5">
                  <div className="p-2.5 rounded-xl bg-blue-50">
                    <Building2 className="w-5 h-5 text-blue-600" />
                  </div>

                  <div>
                    <h3 className="font-black text-[#343E4F]">
                      Supplier Information
                    </h3>

                    <p className="text-xs text-slate-400">
                      Information about your supply business.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                  <InputField
                    label="Business Name"
                    name="businessName"
                    value={form.businessName}
                    onChange={handleChange}
                    icon={<Building2 />}
                    placeholder="Enter business name"
                  />

                  <InputField
                    label="Business Type"
                    name="businessType"
                    value={form.businessType}
                    onChange={handleChange}
                    icon={<Briefcase />}
                    placeholder="Agricultural supplies..."
                  />

                </div>
              </div>
            )}

            {/* Transport Section */}
            {(hasRole("Transport") ||
              hasRole("Transporter")) && (
              <div className="border-t border-slate-100 pt-6">

                <div className="flex items-center gap-3 mb-5">
                  <div className="p-2.5 rounded-xl bg-purple-50">
                    <Truck className="w-5 h-5 text-purple-600" />
                  </div>

                  <div>
                    <h3 className="font-black text-[#343E4F]">
                      Transport Information
                    </h3>

                    <p className="text-xs text-slate-400">
                      Information about your transportation service.
                    </p>
                  </div>
                </div>

                <InputField
                  label="Vehicle Type"
                  name="vehicleType"
                  value={form.vehicleType}
                  onChange={handleChange}
                  icon={<Truck />}
                  placeholder="Truck, Pickup, Van..."
                />

              </div>
            )}

            {/* Account Information */}
            <div className="border-t border-slate-100 pt-6">

              <div className="flex items-center gap-3 mb-5">
                <div className="p-2.5 rounded-xl bg-slate-100">
                  <ShieldCheck className="w-5 h-5 text-[#343E4F]" />
                </div>

                <div>
                  <h3 className="font-black text-[#343E4F]">
                    Account Information
                  </h3>

                  <p className="text-xs text-slate-400">
                    Your registered D-Agro account details.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                <div className="bg-slate-50 rounded-xl p-4">
                  <p className="text-[11px] uppercase tracking-wide font-bold text-slate-400">
                    Account Email
                  </p>

                  <p className="text-sm font-bold text-[#343E4F] mt-1 break-all">
                    {user.email || "Not available"}
                  </p>
                </div>

                <div className="bg-slate-50 rounded-xl p-4">
                  <p className="text-[11px] uppercase tracking-wide font-bold text-slate-400">
                    Account Roles
                  </p>

                  <p className="text-sm font-bold text-[#343E4F] mt-1">
                    {roles.length > 0
                      ? roles.join(", ")
                      : "Not specified"}
                  </p>
                </div>

              </div>
            </div>

            {/* Save */}
            <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row justify-end items-center gap-3">

              {saved && (
                <div className="flex items-center gap-2 text-sm font-bold text-emerald-600">
                  <CheckCircle className="w-4 h-4" />
                  Profile saved successfully
                </div>
              )}

              <button
                onClick={handleSave}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3 rounded-xl bg-[#E57036] text-white text-sm font-bold shadow-md hover:bg-[#E57036]/90 transition"
              >
                <Save className="w-4 h-4" />
                Save Changes
              </button>

            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

/* -------------------------------------------------
   Reusable Input
-------------------------------------------------- */

function InputField({
  label,
  name,
  value,
  onChange,
  icon,
  type = "text",
  placeholder = "",
}) {
  return (
    <div>
      <label className="block text-xs font-bold text-slate-600 mb-2">
        {label}
      </label>

      <div className="relative">
        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
          {React.cloneElement(icon, {
            className: "w-4 h-4",
          })}
        </div>

        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="w-full rounded-xl border border-slate-200 bg-white pl-10 pr-4 py-3 text-sm text-slate-700 outline-none focus:border-[#E57036] focus:ring-2 focus:ring-orange-100 transition"
        />
      </div>
    </div>
  );
}
