import { useEffect, useState } from "react";
import {
  UserCircle,
  Mail,
  Phone,
  MapPin,
  Save,
  Camera,
  CheckCircle,
} from "lucide-react";

export default function FarmerProfile() {
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
    farmName: "",
    farmType: "",
    bio: "",
  });

  const [saved, setSaved] = useState(false);

  useEffect(() => {
    try {
      const savedProfile = JSON.parse(
        localStorage.getItem("farmerProfile") || "null"
      );

      const savedUser = JSON.parse(
        localStorage.getItem("user") || "null"
      );

      if (savedProfile) {
        setProfile(savedProfile);
      } else if (savedUser) {
        setProfile((prev) => ({
          ...prev,
          name: savedUser.name || savedUser.fullName || "",
          email: savedUser.email || "",
          phone: savedUser.phone || "",
        }));
      }
    } catch (error) {
      console.error("Failed to load profile:", error);
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setProfile((prev) => ({
      ...prev,
      [name]: value,
    }));

    setSaved(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    try {
      localStorage.setItem(
        "farmerProfile",
        JSON.stringify(profile)
      );

      setSaved(true);

      setTimeout(() => {
        setSaved(false);
      }, 3000);
    } catch (error) {
      console.error("Failed to save profile:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-[#343E4F] sm:text-3xl">
          Farmer Profile
        </h1>

        <p className="mt-1 text-sm text-gray-500">
          Manage your personal and farm information.
        </p>
      </div>

      <div className="mx-auto max-w-5xl">

        {/* Profile Header */}
        <div className="mb-6 overflow-hidden rounded-2xl bg-white shadow-sm">

          <div className="h-32 bg-[#343E4F] sm:h-40" />

          <div className="relative px-5 pb-6 sm:px-8">

            {/* Avatar */}
            <div className="-mt-14 flex h-28 w-28 items-center justify-center rounded-full border-4 border-white bg-orange-100 shadow-md">
              <UserCircle
                size={65}
                className="text-[#E57036]"
              />
            </div>

            <div className="mt-4">
              <h2 className="text-xl font-bold text-[#343E4F]">
                {profile.name || "Farmer"}
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Agricultural Seller
              </p>
            </div>
          </div>
        </div>

        {/* Success Message */}
        {saved && (
          <div className="mb-6 flex items-center gap-3 rounded-xl border border-green-200 bg-green-50 p-4 text-green-700">
            <CheckCircle size={20} />

            <p className="text-sm font-medium">
              Your profile has been saved successfully.
            </p>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit}>

          {/* Personal Information */}
          <div className="mb-6 rounded-2xl bg-white p-5 shadow-sm sm:p-8">

            <div className="mb-6">
              <h2 className="text-lg font-bold text-[#343E4F]">
                Personal Information
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Update your basic contact information.
              </p>
            </div>

            <div className="grid gap-5 md:grid-cols-2">

              {/* Name */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-[#343E4F]">
                  Full Name
                </label>

                <div className="relative">
                  <UserCircle
                    size={19}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  />

                  <input
                    type="text"
                    name="name"
                    value={profile.name}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    className="w-full rounded-xl border border-gray-200 py-3 pl-11 pr-4 text-sm outline-none transition focus:border-[#E57036] focus:ring-2 focus:ring-orange-100"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-[#343E4F]">
                  Email Address
                </label>

                <div className="relative">
                  <Mail
                    size={19}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  />

                  <input
                    type="email"
                    name="email"
                    value={profile.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    className="w-full rounded-xl border border-gray-200 py-3 pl-11 pr-4 text-sm outline-none transition focus:border-[#E57036] focus:ring-2 focus:ring-orange-100"
                  />
                </div>
              </div>

              {/* Phone */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-[#343E4F]">
                  Phone Number
                </label>

                <div className="relative">
                  <Phone
                    size={19}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  />

                  <input
                    type="tel"
                    name="phone"
                    value={profile.phone}
                    onChange={handleChange}
                    placeholder="Enter your phone number"
                    className="w-full rounded-xl border border-gray-200 py-3 pl-11 pr-4 text-sm outline-none transition focus:border-[#E57036] focus:ring-2 focus:ring-orange-100"
                  />
                </div>
              </div>

              {/* Location */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-[#343E4F]">
                  Location
                </label>

                <div className="relative">
                  <MapPin
                    size={19}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  />

                  <input
                    type="text"
                    name="location"
                    value={profile.location}
                    onChange={handleChange}
                    placeholder="e.g. Jimma, Oromia"
                    className="w-full rounded-xl border border-gray-200 py-3 pl-11 pr-4 text-sm outline-none transition focus:border-[#E57036] focus:ring-2 focus:ring-orange-100"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Farm Information */}
          <div className="mb-6 rounded-2xl bg-white p-5 shadow-sm sm:p-8">

            <div className="mb-6">
              <h2 className="text-lg font-bold text-[#343E4F]">
                Farm Information
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Tell buyers more about your farm.
              </p>
            </div>

            <div className="grid gap-5 md:grid-cols-2">

              {/* Farm Name */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-[#343E4F]">
                  Farm Name
                </label>

                <input
                  type="text"
                  name="farmName"
                  value={profile.farmName}
                  onChange={handleChange}
                  placeholder="Enter your farm name"
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-[#E57036] focus:ring-2 focus:ring-orange-100"
                />
              </div>

              {/* Farm Type */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-[#343E4F]">
                  Farm Type
                </label>

                <select
                  name="farmType"
                  value={profile.farmType}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-[#E57036] focus:ring-2 focus:ring-orange-100"
                >
                  <option value="">
                    Select farm type
                  </option>

                  <option value="Crop Farming">
                    Crop Farming
                  </option>

                  <option value="Livestock">
                    Livestock
                  </option>

                  <option value="Mixed Farming">
                    Mixed Farming
                  </option>

                  <option value="Organic Farming">
                    Organic Farming
                  </option>

                  <option value="Horticulture">
                    Horticulture
                  </option>

                  <option value="Other">
                    Other
                  </option>
                </select>
              </div>

              {/* Bio */}
              <div className="md:col-span-2">
                <label className="mb-2 block text-sm font-semibold text-[#343E4F]">
                  About Your Farm
                </label>

                <textarea
                  name="bio"
                  value={profile.bio}
                  onChange={handleChange}
                  rows={5}
                  placeholder="Tell buyers about your farm, farming practices, products, and experience..."
                  className="w-full resize-none rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-[#E57036] focus:ring-2 focus:ring-orange-100"
                />
              </div>
            </div>
          </div>

          {/* Save */}
          <div className="flex justify-end">
            <button
              type="submit"
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#E57036] px-6 py-3 font-semibold text-white shadow-sm transition hover:bg-[#cf5f2b] sm:w-auto"
            >
              <Save size={19} />
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}