import { useEffect, useState } from "react";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Truck,
  Edit3,
  Save,
  X,
  CheckCircle,
} from "lucide-react";

function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const [saved, setSaved] = useState(false);

  const [profile, setProfile] = useState({
    name: "Abebe Transport Services",
    email: "abebe.transport@example.com",
    phone: "0911223344",
    region: "Oromia",
    city: "Jimma",
    vehicleType: "Truck",
    vehicleNumber: "ET-12345",
    description:
      "Reliable agricultural product transportation service across Oromia and nearby regions.",
  });

  const [formData, setFormData] = useState(profile);

  useEffect(() => {
    const savedProfile = localStorage.getItem(
      "transporterProfile"
    );

    if (savedProfile) {
      try {
        const parsedProfile = JSON.parse(savedProfile);

        setProfile(parsedProfile);
        setFormData(parsedProfile);
      } catch (error) {
        console.error(
          "Error loading transporter profile:",
          error
        );
      }
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = (e) => {
    e.preventDefault();

    setProfile(formData);

    localStorage.setItem(
      "transporterProfile",
      JSON.stringify(formData)
    );

    setSaved(true);
    setIsEditing(false);

    setTimeout(() => {
      setSaved(false);
    }, 3000);
  };

  const handleCancel = () => {
    setFormData(profile);
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#343E4F] sm:text-3xl">
            Transporter Profile
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            Manage your transportation business information.
          </p>
        </div>

        {!isEditing && (
          <button
            onClick={() => setIsEditing(true)}
            className="flex items-center justify-center gap-2 rounded-xl bg-[#E57036] px-5 py-3 font-semibold text-white transition hover:bg-[#d9632d]"
          >
            <Edit3 size={18} />
            Edit Profile
          </button>
        )}
      </div>

      {/* Success Message */}
      {saved && (
        <div className="mb-6 flex items-center gap-3 rounded-xl border border-green-200 bg-green-50 p-4 text-green-700">
          <CheckCircle size={20} />

          <p className="text-sm font-medium">
            Profile updated successfully.
          </p>
        </div>
      )}

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Profile Card */}
        <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
          <div className="flex flex-col items-center text-center">
            {/* Avatar */}
            <div className="flex h-28 w-28 items-center justify-center rounded-full bg-[#343E4F] text-3xl font-bold text-white shadow-md">
              {profile.name
                .split(" ")
                .map((word) => word[0])
                .slice(0, 2)
                .join("")
                .toUpperCase()}
            </div>

            <h2 className="mt-5 text-xl font-bold text-[#343E4F]">
              {profile.name}
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Transporter
            </p>

            <div className="mt-5 w-full space-y-3 border-t border-gray-100 pt-5 text-left">
              <div className="flex items-center gap-3">
                <Truck
                  size={18}
                  className="text-[#E57036]"
                />

                <div>
                  <p className="text-xs text-gray-400">
                    Vehicle
                  </p>

                  <p className="text-sm font-medium text-gray-700">
                    {profile.vehicleType}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <MapPin
                  size={18}
                  className="text-[#E57036]"
                />

                <div>
                  <p className="text-xs text-gray-400">
                    Location
                  </p>

                  <p className="text-sm font-medium text-gray-700">
                    {profile.city}, {profile.region}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Information */}
        <div className="lg:col-span-2">
          <div className="rounded-2xl border border-gray-100 bg-white shadow-sm">
            <div className="border-b border-gray-100 p-6">
              <h2 className="font-bold text-[#343E4F]">
                Business Information
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Your transporter and vehicle information.
              </p>
            </div>

            {isEditing ? (
              <form
                onSubmit={handleSave}
                className="space-y-5 p-6"
              >
                {/* Name */}
                <div>
                  <label className="mb-2 block text-sm font-semibold text-[#343E4F]">
                    Business Name
                  </label>

                  <div className="relative">
                    <User
                      size={18}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                    />

                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full rounded-xl border border-gray-200 py-3 pl-11 pr-4 text-sm outline-none transition focus:border-[#E57036] focus:ring-2 focus:ring-[#E57036]/20"
                    />
                  </div>
                </div>

                {/* Email & Phone */}
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-[#343E4F]">
                      Email
                    </label>

                    <div className="relative">
                      <Mail
                        size={18}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                      />

                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full rounded-xl border border-gray-200 py-3 pl-11 pr-4 text-sm outline-none transition focus:border-[#E57036] focus:ring-2 focus:ring-[#E57036]/20"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-semibold text-[#343E4F]">
                      Phone
                    </label>

                    <div className="relative">
                      <Phone
                        size={18}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                      />

                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full rounded-xl border border-gray-200 py-3 pl-11 pr-4 text-sm outline-none transition focus:border-[#E57036] focus:ring-2 focus:ring-[#E57036]/20"
                      />
                    </div>
                  </div>
                </div>

                {/* Region & City */}
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-[#343E4F]">
                      Region
                    </label>

                    <input
                      type="text"
                      name="region"
                      value={formData.region}
                      onChange={handleChange}
                      className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-[#E57036] focus:ring-2 focus:ring-[#E57036]/20"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-semibold text-[#343E4F]">
                      City
                    </label>

                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-[#E57036] focus:ring-2 focus:ring-[#E57036]/20"
                    />
                  </div>
                </div>

                {/* Vehicle Type */}
                <div>
                  <label className="mb-2 block text-sm font-semibold text-[#343E4F]">
                    Vehicle Type
                  </label>

                  <select
                    name="vehicleType"
                    value={formData.vehicleType}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-[#E57036] focus:ring-2 focus:ring-[#E57036]/20"
                  >
                    <option value="Truck">Truck</option>
                    <option value="Pickup">Pickup</option>
                    <option value="Van">Van</option>
                    <option value="Isuzu">Isuzu</option>
                    <option value="Trailer">Trailer</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                {/* Vehicle Number */}
                <div>
                  <label className="mb-2 block text-sm font-semibold text-[#343E4F]">
                    Vehicle Number
                  </label>

                  <input
                    type="text"
                    name="vehicleNumber"
                    value={formData.vehicleNumber}
                    onChange={handleChange}
                    placeholder="e.g. ET-12345"
                    className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-[#E57036] focus:ring-2 focus:ring-[#E57036]/20"
                  />
                </div>

                {/* Description */}
                <div>
                  <label className="mb-2 block text-sm font-semibold text-[#343E4F]">
                    Business Description
                  </label>

                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows="4"
                    className="w-full resize-none rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-[#E57036] focus:ring-2 focus:ring-[#E57036]/20"
                  />
                </div>

                {/* Buttons */}
                <div className="flex flex-col-reverse gap-3 pt-2 sm:flex-row sm:justify-end">
                  <button
                    type="button"
                    onClick={handleCancel}
                    className="flex items-center justify-center gap-2 rounded-xl border border-gray-200 px-5 py-3 font-semibold text-gray-600 transition hover:bg-gray-50"
                  >
                    <X size={18} />
                    Cancel
                  </button>

                  <button
                    type="submit"
                    className="flex items-center justify-center gap-2 rounded-xl bg-[#E57036] px-5 py-3 font-semibold text-white transition hover:bg-[#d9632d]"
                  >
                    <Save size={18} />
                    Save Changes
                  </button>
                </div>
              </form>
            ) : (
              <div className="grid grid-cols-1 gap-6 p-6 sm:grid-cols-2">
                {/* Business Name */}
                <div>
                  <p className="text-xs font-medium text-gray-400">
                    Business Name
                  </p>

                  <div className="mt-2 flex items-center gap-3">
                    <User
                      size={18}
                      className="text-[#E57036]"
                    />

                    <p className="font-medium text-gray-700">
                      {profile.name}
                    </p>
                  </div>
                </div>

                {/* Email */}
                <div>
                  <p className="text-xs font-medium text-gray-400">
                    Email
                  </p>

                  <div className="mt-2 flex items-center gap-3">
                    <Mail
                      size={18}
                      className="text-[#E57036]"
                    />

                    <p className="font-medium text-gray-700">
                      {profile.email}
                    </p>
                  </div>
                </div>

                {/* Phone */}
                <div>
                  <p className="text-xs font-medium text-gray-400">
                    Phone
                  </p>

                  <div className="mt-2 flex items-center gap-3">
                    <Phone
                      size={18}
                      className="text-[#E57036]"
                    />

                    <p className="font-medium text-gray-700">
                      {profile.phone}
                    </p>
                  </div>
                </div>

                {/* Location */}
                <div>
                  <p className="text-xs font-medium text-gray-400">
                    Location
                  </p>

                  <div className="mt-2 flex items-center gap-3">
                    <MapPin
                      size={18}
                      className="text-[#E57036]"
                    />

                    <p className="font-medium text-gray-700">
                      {profile.city}, {profile.region}
                    </p>
                  </div>
                </div>

                {/* Vehicle */}
                <div>
                  <p className="text-xs font-medium text-gray-400">
                    Vehicle Type
                  </p>

                  <div className="mt-2 flex items-center gap-3">
                    <Truck
                      size={18}
                      className="text-[#E57036]"
                    />

                    <p className="font-medium text-gray-700">
                      {profile.vehicleType}
                    </p>
                  </div>
                </div>

                {/* Vehicle Number */}
                <div>
                  <p className="text-xs font-medium text-gray-400">
                    Vehicle Number
                  </p>

                  <div className="mt-2 flex items-center gap-3">
                    <Truck
                      size={18}
                      className="text-[#E57036]"
                    />

                    <p className="font-medium text-gray-700">
                      {profile.vehicleNumber}
                    </p>
                  </div>
                </div>

                {/* Description */}
                <div className="sm:col-span-2">
                  <p className="text-xs font-medium text-gray-400">
                    Business Description
                  </p>

                  <p className="mt-2 leading-7 text-gray-600">
                    {profile.description}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;