import { Link } from "react-router-dom";
import {
  Sprout,
  Stethoscope,
  TrendingUp,
  MessageCircle,
  ArrowRight,
  Sparkles,
  Brain,
  Leaf,
  ShieldCheck,
} from "lucide-react";

export default function AIPage() {
  const features = [
    {
      title: "Crop Recommendation",
      description:
        "Get crop suggestions based on soil, rainfall, temperature and available conditions.",
      icon: Sprout,
      path: "/ai/crop-recommendation",
      iconBg: "bg-green-100",
      iconColor: "text-green-600",
    },
    {
      title: "Crop Disease Detection",
      description:
        "Upload a crop or leaf image and get an AI-powered disease analysis.",
      icon: Stethoscope,
      path: "/ai/disease-detection",
      iconBg: "bg-red-100",
      iconColor: "text-red-600",
    },
    {
      title: "Price Prediction",
      description:
        "Estimate agricultural product prices using market information and product details.",
      icon: TrendingUp,
      path: "/ai/price-prediction",
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600",
    },
    {
      title: "AI Agricultural Advisor",
      description:
        "Ask questions about farming, crops, diseases, markets and agricultural practices.",
      icon: MessageCircle,
      path: "/ai/advisor",
      iconBg: "bg-orange-100",
      iconColor: "text-[#E57036]",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Hero */}
      <section className="relative overflow-hidden bg-[#343E4F] px-4 py-16 sm:px-6 lg:px-8">
        <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-[#E57036]/20 blur-3xl" />
        <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-green-400/10 blur-3xl" />

        <div className="relative mx-auto max-w-7xl">
          <div className="max-w-3xl">

            <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-white">
              <Sparkles size={16} className="text-[#E57036]" />
              D-Agro Artificial Intelligence
            </div>

            <h1 className="text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl">
              Smart Agriculture
              <span className="text-[#E57036]">
                {" "}Powered by AI
              </span>
            </h1>

            <p className="mt-5 max-w-2xl text-base leading-7 text-white/70 sm:text-lg">
              Use intelligent agricultural tools to make better decisions
              about crops, diseases, prices and farming.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                to="/ai/advisor"
                className="inline-flex items-center gap-2 rounded-xl bg-[#E57036] px-5 py-3 font-semibold text-white transition hover:bg-[#d7632e]"
              >
                <MessageCircle size={19} />
                Ask AI Advisor
                <ArrowRight size={18} />
              </Link>

              <Link
                to="/ai/crop-recommendation"
                className="inline-flex items-center gap-2 rounded-xl border border-white/20 px-5 py-3 font-semibold text-white transition hover:bg-white/10"
              >
                <Sprout size={19} />
                Recommend a Crop
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* AI Benefits */}
      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">

          <div className="flex items-center gap-4 rounded-2xl bg-white p-5 shadow-sm">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-green-100">
              <Brain className="text-green-600" size={24} />
            </div>

            <div>
              <h3 className="font-bold text-[#343E4F]">
                Smart Decisions
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Data-driven agricultural recommendations.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 rounded-2xl bg-white p-5 shadow-sm">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-orange-100">
              <Leaf className="text-[#E57036]" size={24} />
            </div>

            <div>
              <h3 className="font-bold text-[#343E4F]">
                Better Farming
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Improve crop planning and productivity.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 rounded-2xl bg-white p-5 shadow-sm">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-100">
              <ShieldCheck className="text-blue-600" size={24} />
            </div>

            <div>
              <h3 className="font-bold text-[#343E4F]">
                Early Detection
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Identify possible crop problems earlier.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* Features */}
      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">

        <div className="mb-8">
          <h2 className="text-2xl font-bold text-[#343E4F] sm:text-3xl">
            AI Tools
          </h2>

          <p className="mt-2 text-gray-500">
            Choose an AI tool to get started.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">

          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <Link
                key={feature.title}
                to={feature.path}
                className="group rounded-2xl bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="flex items-start justify-between">

                  <div
                    className={`flex h-14 w-14 items-center justify-center rounded-2xl ${feature.iconBg}`}
                  >
                    <Icon
                      size={28}
                      className={feature.iconColor}
                    />
                  </div>

                  <ArrowRight
                    size={20}
                    className="text-gray-300 transition group-hover:translate-x-1 group-hover:text-[#E57036]"
                  />
                </div>

                <h3 className="mt-5 text-xl font-bold text-[#343E4F]">
                  {feature.title}
                </h3>

                <p className="mt-2 leading-6 text-gray-500">
                  {feature.description}
                </p>

                <div className="mt-5 font-semibold text-[#E57036]">
                  Open Tool →
                </div>
              </Link>
            );
          })}

        </div>
      </section>
    </div>
  );
}