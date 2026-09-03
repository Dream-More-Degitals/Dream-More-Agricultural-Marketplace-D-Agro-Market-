import { useState } from "react";
import {
  UserCircle,
  Phone,
  MapPin,
  Truck,
  Save,
} from "lucide-react";

function Profile() {
  const [available, setAvailable] = useState(true);

  const [profile, setProfile] = useState({
    name: "Transporter Name",
    phone: "+251 900 000 000",
    email: "transporter@example.com",
    location: "Jimma, Ethiopia",
    vehicleType: "Truck",
    vehicleNumber: "ET-12345",
  });

  const handleChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    alert("Profile updated successfully!");
  };

  return (
    <div>

      {/* HEADER */}

      <div className="mb-8">

        <h1 className="text-2xl font-bold text-[#343E4F] sm:text-3xl">
          Transporter Profile
        </h1>

        <p className="mt-2 text-sm text-gray-500">
          Manage your personal and vehicle information.
        </p>

      </div>


      <div className="grid gap-6 lg:grid-cols-3">

        {/* PROFILE CARD */}

        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">

          <div className="flex flex-col items-center text-center">

            <div className="flex h-24 w-24 items-center justify-center rounded-full bg-orange-50 text-[#E57036]">

              <UserCircle size={70} />

            </div>

            <h2 className="mt-4 text-xl font-bold text-[#343E4F]">
              {profile.name}
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Transporter
            </p>


            {/* AVAILABILITY */}

            <div className="mt-6 w-full rounded-lg bg-[#F8F9FA] p-4">

              <div className="flex items-center justify-between">

                <div className="flex items-center gap-2">

                  <div
                    className={`h-3 w-3 rounded-full ${
                      available
                        ? "bg-green-500"
                        : "bg-gray-400"
                    }`}
                  />

                  <span className="text-sm font-medium text-[#343E4F]">
                    {available
                      ? "Available"
                      : "Unavailable"}
                  </span>

                </div>

                <button
                  onClick={() =>
                    setAvailable(!available)
                  }
                  className={`relative h-6 w-11 rounded-full transition ${
                    available
                      ? "bg-[#E57036]"
                      : "bg-gray-300"
                  }`}
                >

                  <span
                    className={`absolute top-1 h-4 w-4 rounded-full bg-white transition ${
                      available
                        ? "left-6"
                        : "left-1"
                    }`}
                  />

                </button>

              </div>

              <p className="mt-2 text-xs text-gray-500">
                Turn this off when you are not available for deliveries.
              </p>

            </div>

          </div>

        </div>


        {/* PROFILE FORM */}

        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm lg:col-span-2">

          <div className="mb-6 border-b border-gray-100 pb-5">

            <h2 className="text-lg font-bold text-[#343E4F]">
              Personal Information
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Update your transporter information.
            </p>

          </div>


          <form
            onSubmit={handleSubmit}
            className="space-y-5"
          >

            {/* NAME */}

            <div>

              <label className="mb-2 block text-sm font-medium text-[#343E4F]">
                Full Name
              </label>

              <div className="relative">

                <UserCircle
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  type="text"
                  name="name"
                  value={profile.name}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-gray-200 py-3 pl-10 pr-4 text-sm outline-none focus:border-[#E57036]"
                />

              </div>

            </div>


            {/* PHONE */}

            <div>

              <label className="mb-2 block text-sm font-medium text-[#343E4F]">
                Phone Number
              </label>

              <div className="relative">

                <Phone
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  type="text"
                  name="phone"
                  value={profile.phone}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-gray-200 py-3 pl-10 pr-4 text-sm outline-none focus:border-[#E57036]"
                />

              </div>

            </div>


            {/* EMAIL */}

            <div>

              <label className="mb-2 block text-sm font-medium text-[#343E4F]">
                Email Address
              </label>

              <input
                type="email"
                name="email"
                value={profile.email}
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm outline-none focus:border-[#E57036]"
              />

            </div>


            {/* LOCATION */}

            <div>

              <label className="mb-2 block text-sm font-medium text-[#343E4F]">
                Location
              </label>

              <div className="relative">

                <MapPin
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  type="text"
                  name="location"
                  value={profile.location}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-gray-200 py-3 pl-10 pr-4 text-sm outline-none focus:border-[#E57036]"
                />

              </div>

            </div>


            {/* VEHICLE INFORMATION */}

            <div className="border-t border-gray-100 pt-6">

              <div className="mb-5 flex items-center gap-3">

                <div className="rounded-lg bg-orange-50 p-3 text-[#E57036]">
                  <Truck size={20} />
                </div>

                <div>

                  <h2 className="font-bold text-[#343E4F]">
                    Vehicle Information
                  </h2>

                  <p className="text-xs text-gray-500">
                    Information about your delivery vehicle.
                  </p>

                </div>

              </div>


              <div className="grid gap-5 sm:grid-cols-2">

                {/* VEHICLE TYPE */}

                <div>

                  <label className="mb-2 block text-sm font-medium text-[#343E4F]">
                    Vehicle Type
                  </label>

                  <select
                    name="vehicleType"
                    value={profile.vehicleType}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm outline-none focus:border-[#E57036]"
                  >

                    <option value="Truck">
                      Truck
                    </option>

                    <option value="Pickup">
                      Pickup
                    </option>

                    <option value="Van">
                      Van
                    </option>

                    <option value="Motorcycle">
                      Motorcycle
                    </option>

                  </select>

                </div>


                {/* VEHICLE NUMBER */}

                <div>

                  <label className="mb-2 block text-sm font-medium text-[#343E4F]">
                    Vehicle Number
                  </label>

                  <input
                    type="text"
                    name="vehicleNumber"
                    value={profile.vehicleNumber}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm outline-none focus:border-[#E57036]"
                  />

                </div>

              </div>

            </div>


            {/* SAVE */}

            <div className="flex justify-end border-t border-gray-100 pt-6">

              <button
                type="submit"
                className="flex items-center gap-2 rounded-lg bg-[#E57036] px-6 py-3 text-sm font-semibold text-white transition hover:opacity-90"
              >

                <Save size={18} />

                Save Changes

              </button>

            </div>

          </form>

        </div>

      </div>

    </div>
  );
}

export default Profile;