import { useState } from "react";
import {
  TrendingUp,
  ArrowLeft,
  Sparkles,
  Package,
  MapPin,
  CalendarDays,
} from "lucide-react";
import { Link } from "react-router-dom";

export default function PricePrediction() {
  const [form, setForm] = useState({
    product: "Maize",
    currentPrice: "",
    region: "Oromia",
    quantity: "",
  });

  const [result, setResult] = useState(null);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const predictPrice = () => {
    const currentPrice = Number(form.currentPrice || 0);

    if (!currentPrice || currentPrice <= 0) {
      alert("Please enter the current market price.");
      return;
    }

    let change = 8;

    if (form.product === "Coffee") {
      change = 12;
    } else if (form.product === "Teff") {
      change = 10;
    } else if (form.product === "Wheat") {
      change = 6;
    } else if (form.product === "Onion") {
      change = -4;
    }

    const predictedPrice =
      currentPrice + (currentPrice * change) / 100;

    setResult({
      predictedPrice: Math.round(predictedPrice),
      change,
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">

      <div className="mx-auto max-w-5xl">

        <Link
          to="/ai"
          className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-[#E57036]"
        >
          <ArrowLeft size={17} />
          Back to AI Tools
        </Link>

        <div className="mb-8">
          <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-100">
            <TrendingUp
              size={30}
              className="text-blue-600"
            />
          </div>

          <h1 className="text-2xl font-bold text-[#343E4F] sm:text-3xl">
            Agricultural Price Prediction
          </h1>

          <p className="mt-2 text-gray-500">
            Estimate a future agricultural product price from current
            market information.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">

          {/* Form */}
          <div className="lg:col-span-2 rounded-2xl bg-white p-6 shadow-sm">

            <h2 className="mb-6 text-lg font-bold text-[#343E4F]">
              Product Information
            </h2>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">

              {/* Product */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Product
                </label>

                <div className="relative">
                  <Package
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  />

                  <select
                    name="product"
                    value={form.product}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-gray-200 py-3 pl-11 pr-4 outline-none focus:border-[#E57036]"
                  >
                    <option>Maize</option>
                    <option>Teff</option>
                    <option>Wheat</option>
                    <option>Coffee</option>
                    <option>Onion</option>
                    <option>Sorghum</option>
                  </select>
                </div>
              </div>

              {/* Region */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Region
                </label>

                <div className="relative">
                  <MapPin
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  />

                  <select
                    name="region"
                    value={form.region}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-gray-200 py-3 pl-11 pr-4 outline-none focus:border-[#E57036]"
                  >
                    <option>Oromia</option>
                    <option>Amhara</option>
                    <option>SNNPR</option>
                    <option>Tigray</option>
                    <option>Somali</option>
                    <option>Afar</option>
                  </select>
                </div>
              </div>

              {/* Current Price */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Current Price (ETB / unit)
                </label>

                <input
                  type="number"
                  name="currentPrice"
                  value={form.currentPrice}
                  onChange={handleChange}
                  placeholder="Example: 180"
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-[#E57036]"
                />
              </div>

              {/* Quantity */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Quantity
                </label>

                <input
                  type="number"
                  name="quantity"
                  value={form.quantity}
                  onChange={handleChange}
                  placeholder="Example: 100"
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-[#E57036]"
                />
              </div>
            </div>

            <button
              onClick={predictPrice}
              className="mt-7 flex w-full items-center justify-center gap-2 rounded-xl bg-[#E57036] px-5 py-3.5 font-semibold text-white transition hover:bg-[#d7632e]"
            >
              <Sparkles size={19} />
              Predict Price
            </button>
          </div>

          {/* Result */}
          <div>
            {result ? (
              <div className="rounded-2xl bg-[#343E4F] p-6 text-white shadow-sm">

                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-500/20">
                  <TrendingUp
                    size={30}
                    className="text-blue-400"
                  />
                </div>

                <p className="mt-6 text-sm text-white/60">
                  Estimated Future Price
                </p>

                <h2 className="mt-2 text-3xl font-bold text-[#E57036]">
                  ETB {result.predictedPrice.toLocaleString()}
                </h2>

                <div className="mt-5 rounded-xl bg-white/10 p-4">
                  <p className="text-sm text-white/60">
                    Estimated Change
                  </p>

                  <p
                    className={`mt-1 text-2xl font-bold ${
                      result.change >= 0
                        ? "text-green-400"
                        : "text-red-400"
                    }`}
                  >
                    {result.change >= 0 ? "+" : ""}
                    {result.change}%
                  </p>
                </div>

                <div className="mt-6 space-y-3 border-t border-white/10 pt-5 text-sm text-white/70">

                  <div className="flex items-center gap-2">
                    <Package size={16} />
                    Product: {form.product}
                  </div>

                  <div className="flex items-center gap-2">
                    <MapPin size={16} />
                    Region: {form.region}
                  </div>

                  <div className="flex items-center gap-2">
                    <CalendarDays size={16} />
                    Forecast: Short-term estimate
                  </div>
                </div>

                <p className="mt-6 text-xs leading-5 text-white/50">
                  This is a demonstration prediction. The production
                  system will use historical Ethiopian agricultural
                  market data and a trained machine-learning model.
                </p>
              </div>
            ) : (
              <div className="flex min-h-[300px] flex-col items-center justify-center rounded-2xl border border-dashed border-gray-300 bg-white p-6 text-center">
                <TrendingUp
                  size={45}
                  className="text-gray-300"
                />

                <h3 className="mt-4 font-bold text-[#343E4F]">
                  Prediction Result
                </h3>

                <p className="mt-2 text-sm text-gray-500">
                  Enter product information to generate a prediction.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}