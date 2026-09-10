import { useState } from "react";
import {
  Sprout,
  Droplets,
  Thermometer,
  CloudRain,
  MapPin,
  ArrowLeft,
  Sparkles,
} from "lucide-react";
import { Link } from "react-router-dom";

export default function CropRecommendation() {
  const [form, setForm] = useState({
    soil: "Loamy",
    rainfall: "",
    temperature: "",
    region: "Oromia",
    season: "Main Season",
  });

  const [result, setResult] = useState(null);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const recommendCrop = () => {
    const rainfall = Number(form.rainfall || 0);
    const temperature = Number(form.temperature || 0);

    let crop = "Maize";
    let reason =
      "Maize can perform well under the selected general conditions.";

    if (
      form.soil === "Loamy" &&
      rainfall >= 600 &&
      rainfall <= 1200 &&
      temperature >= 18 &&
      temperature <= 30
    ) {
      crop = "Maize";
      reason =
        "The soil, rainfall and temperature conditions are suitable for maize.";
    } else if (
      rainfall >= 500 &&
      temperature >= 15 &&
      temperature <= 25
    ) {
      crop = "Wheat";
      reason =
        "The moderate temperature and rainfall conditions are suitable for wheat.";
    } else if (
      rainfall >= 800 &&
      temperature >= 18 &&
      temperature <= 28
    ) {
      crop = "Teff";
      reason =
        "The selected conditions can support teff production.";
    } else if (temperature >= 20 && rainfall < 600) {
      crop = "Sorghum";
      reason =
        "Sorghum is generally more tolerant of lower rainfall conditions.";
    }

    setResult({
      crop,
      reason,
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">

      <div className="mx-auto max-w-5xl">

        {/* Back */}
        <Link
          to="/ai"
          className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-[#E57036]"
        >
          <ArrowLeft size={17} />
          Back to AI Tools
        </Link>

        {/* Header */}
        <div className="mb-8">
          <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-green-100">
            <Sprout
              size={30}
              className="text-green-600"
            />
          </div>

          <h1 className="text-2xl font-bold text-[#343E4F] sm:text-3xl">
            Crop Recommendation
          </h1>

          <p className="mt-2 text-gray-500">
            Enter your farming conditions and get a crop recommendation.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">

          {/* Form */}
          <div className="lg:col-span-2 rounded-2xl bg-white p-6 shadow-sm">

            <h2 className="mb-6 text-lg font-bold text-[#343E4F]">
              Farm Conditions
            </h2>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">

              {/* Soil */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Soil Type
                </label>

                <select
                  name="soil"
                  value={form.soil}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-[#E57036]"
                >
                  <option>Loamy</option>
                  <option>Clay</option>
                  <option>Sandy</option>
                  <option>Black Soil</option>
                  <option>Red Soil</option>
                </select>
              </div>

              {/* Region */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Region
                </label>

                <select
                  name="region"
                  value={form.region}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-[#E57036]"
                >
                  <option>Oromia</option>
                  <option>Amhara</option>
                  <option>SNNPR</option>
                  <option>Tigray</option>
                  <option>Somali</option>
                  <option>Afar</option>
                  <option>Benishangul-Gumuz</option>
                  <option>Gambela</option>
                </select>
              </div>

              {/* Rainfall */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Annual Rainfall (mm)
                </label>

                <div className="relative">
                  <CloudRain
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  />

                  <input
                    type="number"
                    name="rainfall"
                    value={form.rainfall}
                    onChange={handleChange}
                    placeholder="Example: 800"
                    className="w-full rounded-xl border border-gray-200 py-3 pl-11 pr-4 outline-none focus:border-[#E57036]"
                  />
                </div>
              </div>

              {/* Temperature */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Average Temperature (°C)
                </label>

                <div className="relative">
                  <Thermometer
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  />

                  <input
                    type="number"
                    name="temperature"
                    value={form.temperature}
                    onChange={handleChange}
                    placeholder="Example: 24"
                    className="w-full rounded-xl border border-gray-200 py-3 pl-11 pr-4 outline-none focus:border-[#E57036]"
                  />
                </div>
              </div>

              {/* Season */}
              <div className="sm:col-span-2">
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Growing Season
                </label>

                <select
                  name="season"
                  value={form.season}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-[#E57036]"
                >
                  <option>Main Season</option>
                  <option>Belg</option>
                  <option>Dry Season</option>
                </select>
              </div>
            </div>

            <button
              onClick={recommendCrop}
              className="mt-7 flex w-full items-center justify-center gap-2 rounded-xl bg-[#E57036] px-5 py-3.5 font-semibold text-white transition hover:bg-[#d7632e]"
            >
              <Sparkles size={19} />
              Get AI Recommendation
            </button>
          </div>

          {/* Result */}
          <div>
            {result ? (
              <div className="rounded-2xl bg-[#343E4F] p-6 text-white shadow-sm">

                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-green-500/20">
                  <Sprout
                    size={30}
                    className="text-green-400"
                  />
                </div>

                <p className="mt-6 text-sm text-white/60">
                  Recommended Crop
                </p>

                <h2 className="mt-2 text-3xl font-bold text-[#E57036]">
                  {result.crop}
                </h2>

                <p className="mt-5 text-sm leading-6 text-white/70">
                  {result.reason}
                </p>

                <div className="mt-6 space-y-3 border-t border-white/10 pt-5 text-sm">

                  <div className="flex items-center gap-2">
                    <Droplets size={16} />
                    Rainfall: {form.rainfall || "Not provided"} mm
                  </div>

                  <div className="flex items-center gap-2">
                    <Thermometer size={16} />
                    Temperature: {form.temperature || "Not provided"} °C
                  </div>

                  <div className="flex items-center gap-2">
                    <MapPin size={16} />
                    Region: {form.region}
                  </div>
                </div>

                <p className="mt-6 text-xs leading-5 text-white/50">
                  This is a demonstration recommendation. The production
                  version will use a trained agricultural AI model and
                  verified agricultural data.
                </p>
              </div>
            ) : (
              <div className="flex h-full min-h-[300px] flex-col items-center justify-center rounded-2xl border border-dashed border-gray-300 bg-white p-6 text-center">
                <Sprout
                  size={42}
                  className="text-gray-300"
                />

                <h3 className="mt-4 font-bold text-[#343E4F]">
                  Recommendation Result
                </h3>

                <p className="mt-2 text-sm text-gray-500">
                  Enter your farm conditions to receive a recommendation.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}