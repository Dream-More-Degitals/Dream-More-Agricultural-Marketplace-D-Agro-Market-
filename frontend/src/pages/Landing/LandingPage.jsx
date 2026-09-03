import { Link } from "react-router-dom";

import {
  ArrowRight,
  MapPin,
  Search,
  ShoppingCart,
  ScanLine,
  TrendingUp,
  MessageSquare,
} from "lucide-react";

// Images
import heroFarm from "../../assets/images/hero-farm.jpg";
import coffeeImage from "../../assets/images/coffee.jpg";
import teffImage from "../../assets/images/teff.jpg";
import honeyImage from "../../assets/images/honey.jpg";

function LandingPage() {
  return (
    <div className="w-full bg-[#F8F9FA]">

      {/* =========================
          HERO SECTION
      ========================== */}
      <section className="px-4 pb-10 pt-12 sm:px-6 lg:pb-16 lg:pt-20">
        <div className="mx-auto max-w-7xl">

          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">

            {/* LEFT CONTENT */}
            <div className="order-2 lg:order-1">

              <div className="mb-5 h-1 w-10 rounded-full bg-[#E57036]" />

              <h1 className="max-w-xl text-4xl font-bold leading-[1.08] tracking-tight text-[#343E4F] sm:text-5xl lg:text-[52px]">
                Empowering Ethiopian Farmers with AI.
              </h1>

              <p className="mt-5 max-w-lg text-sm leading-6 text-gray-600 sm:text-base">
                The all-in-one marketplace for buyers, suppliers, and smart
                farming. Revolutionizing agriculture through real-time data
                and direct connections.
              </p>

              <div className="mt-7 flex flex-wrap gap-3">

                <Link
                  to="/register"
                  className="flex items-center gap-2 rounded-lg bg-[#E57036] px-6 py-3 text-sm font-semibold text-white transition hover:opacity-90"
                >
                  Join the Market
                  <ArrowRight size={16} />
                </Link>

                <Link
                  to="/ai"
                  className="rounded-lg bg-gray-200 px-6 py-3 text-sm font-semibold text-[#E57036] transition hover:bg-gray-300"
                >
                  Talk to AI Advisor
                </Link>

              </div>
            </div>

            {/* RIGHT IMAGE */}
            <div className="order-1 relative mx-auto w-full max-w-xl lg:order-2">

              <div className="overflow-hidden rounded-2xl shadow-xl">

                <img
                  src={heroFarm}
                  alt="Ethiopian agricultural landscape"
                  className="block h-[280px] w-full object-cover sm:h-[350px] lg:h-[410px]"
                />

              </div>

              {/* Soil Health */}
              <div className="absolute left-3 top-3 rounded-xl bg-white px-4 py-3 shadow-lg sm:left-5 sm:top-5 sm:px-5">

                <p className="text-xs font-semibold text-[#343E4F]">
                  Soil Health:
                  <span className="text-[#E57036]"> 94%</span>
                </p>

                <div className="mt-2 h-1.5 w-20 overflow-hidden rounded-full bg-gray-200">

                  <div className="h-full w-[94%] rounded-full bg-[#E57036]" />

                </div>

              </div>

              {/* Price Forecast */}
              <div className="absolute bottom-3 right-3 flex items-center gap-2 rounded-xl bg-white px-4 py-3 shadow-lg sm:bottom-5 sm:right-5 sm:px-5">

                <TrendingUp
                  size={15}
                  className="text-[#E57036]"
                />

                <span className="text-xs font-semibold text-[#E57036]">
                  Price Forecast +12%
                </span>

              </div>

            </div>

          </div>

          {/* SEARCH BAR */}
          <div className="mt-10 rounded-xl bg-white p-4 shadow-lg">

            <div className="grid gap-3 md:grid-cols-[1fr_150px_170px]">

              {/* Search */}
              <div className="flex items-center gap-3 rounded-lg border border-gray-200 px-4">

                <Search
                  size={17}
                  className="shrink-0 text-gray-400"
                />

                <input
                  type="text"
                  placeholder="Search for crops, seeds, or equipment..."
                  className="w-full bg-transparent py-3 text-sm text-[#343E4F] outline-none placeholder:text-gray-400"
                />

              </div>

              {/* Location */}
              <button
                type="button"
                className="flex items-center justify-center gap-2 rounded-lg border border-gray-200 px-4 py-3 text-sm text-gray-600 transition hover:bg-gray-50"
              >
                <MapPin size={16} />
                Oromia
              </button>

              {/* Search */}
              <Link
                to="/marketplace"
                className="flex items-center justify-center rounded-lg bg-[#E57036] px-4 py-3 text-sm font-semibold text-white transition hover:opacity-90"
              >
                Find Opportunities
              </Link>

            </div>

          </div>

        </div>
      </section>


      {/* =========================
          FRESH PRODUCE
      ========================== */}
      <section className="bg-white px-4 py-16 sm:px-6">

        <div className="mx-auto max-w-7xl">

          <div className="mb-8 flex items-end justify-between">

            <div>
              <h2 className="text-2xl font-bold text-[#343E4F] sm:text-3xl">
                Fresh Produce Harvest
              </h2>

              <p className="mt-1 text-xs text-gray-500 sm:text-sm">
                Sourced directly from verified Ethiopian farm clusters
              </p>
            </div>

            <Link
              to="/marketplace"
              className="hidden items-center gap-1 text-xs font-semibold text-[#E57036] sm:flex"
            >
              View All Market
              <ArrowRight size={14} />
            </Link>

          </div>


          {/* Products */}
          <div className="grid gap-5 md:grid-cols-3">

            <ProductCard
              image={coffeeImage}
              name="Premium Arabica"
              badge="TOP GRADE"
              location="Sidama Region"
              quantity="500 Quintals available"
              price="4,200 ETB"
            />

            <ProductCard
              image={teffImage}
              name="White Teff (Magna)"
              badge="ORGANIC"
              location="Debre Zeit"
              quantity="1,200 Quintals available"
              price="8,500 ETB"
            />

            <ProductCard
              image={honeyImage}
              name="Wild Forest Honey"
              badge="NATURAL"
              location="Jimma Forest"
              quantity="800 Kg available"
              price="650 ETB"
            />

          </div>

        </div>

      </section>


      {/* =========================
          AI SECTION
      ========================== */}
      <section className="bg-[#F3F4F5] px-4 py-16 sm:px-6">

        <div className="mx-auto max-w-7xl">

          <div className="text-center">

            <h2 className="text-2xl font-bold text-[#E57036] sm:text-3xl">
              The Intelligent Edge
            </h2>

            <p className="mx-auto mt-3 max-w-2xl text-xs leading-5 text-gray-500 sm:text-sm">
              We integrate cutting-edge satellite and machine learning data
              to de-risk your agricultural investments.
            </p>

          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-3">

            <AIService
              icon={<ScanLine size={18} />}
              title="Disease Detection"
              description="Upload a photo of your crop to instantly identify pests or diseases with 98% accuracy using our vision AI."
              action="Scan Now"
              link="/ai"
            />

            <AIService
              icon={<TrendingUp size={18} />}
              title="Price Prediction"
              description="Predict upcoming market prices based on weather patterns, global demand, and regional harvest data."
              action="View Analytics"
              link="/ai"
            />

            <AIService
              icon={<MessageSquare size={18} />}
              title="AI Chatbot"
              description="Get 24/7 agricultural advice in Amharic, Oromo, and English. Ask about planting dates, fertilizers, or logistics."
              action="Start Chatting"
              link="/ai"
            />

          </div>

        </div>

      </section>


      {/* =========================
          STATISTICS
      ========================== */}
      <section className="bg-[#E57036] px-4 py-10 text-white">

        <div className="mx-auto grid max-w-7xl grid-cols-3 gap-3 text-center">

          <Statistic
            number="50K+"
            label="VERIFIED FARMERS"
          />

          <Statistic
            number="1M+"
            label="QUINTALS TRADED"
          />

          <Statistic
            number="98%"
            label="AI MODEL ACCURACY"
          />

        </div>

      </section>


      {/* =========================
          TESTIMONIALS
      ========================== */}
      <section className="bg-[#F8F9FA] px-4 py-16 sm:px-6">

        <div className="mx-auto max-w-7xl">

          <h2 className="text-center text-2xl font-bold text-[#343E4F] sm:text-3xl">
            Trusted by the Community
          </h2>

          <div className="mt-10 grid gap-6 md:grid-cols-2">

            <Testimonial
              quote="The price prediction tool changed everything for me. I used to sell as soon as I harvested, but now I know when the market will peak. I increased my profit by 30% this season."
              name="Abebe Bikila"
              role="Wheat Farmer, Oromia"
            />

            <Testimonial
              quote="As a supplier for large retail chains, quality and consistency are everything. D-Agro's verification system and AI-driven supply scores make sourcing effortless and transparent."
              name="Selamawit Tadesse"
              role="Procurement Director, Addis Fresh"
            />

          </div>

        </div>

      </section>


      {/* =========================
          CTA
      ========================== */}
      <section className="bg-[#F8F9FA] px-4 pb-20 sm:px-6">

        <div className="mx-auto max-w-7xl rounded-[28px] bg-[#292D2F] px-6 py-14 text-white sm:px-12">

          <div className="text-center">

            <h2 className="text-3xl font-bold sm:text-4xl">
              Ready to grow your future?
            </h2>

            <p className="mx-auto mt-4 max-w-2xl text-xs leading-6 text-gray-300 sm:text-sm">
              Join thousands of farmers and buyers using AI to build a more
              resilient agricultural ecosystem in Ethiopia.
            </p>

          </div>

          <div className="mx-auto mt-10 grid max-w-3xl gap-5 md:grid-cols-2">

            {/* Farmer */}
            <div className="rounded-xl border border-white/10 bg-white/10 p-6">

              <h3 className="text-center text-sm font-semibold">
                I am a Farmer
              </h3>

              <p className="mt-3 text-center text-xs leading-5 text-gray-300">
                List your products, get AI advice, and access credit
                facilities based on harvest data.
              </p>

              <Link
                to="/register"
                className="mt-5 flex w-full justify-center rounded-lg bg-[#E57036] px-4 py-3 text-sm font-semibold text-white transition hover:opacity-90"
              >
                Get Started
              </Link>

            </div>


            {/* Buyer */}
            <div className="rounded-xl border border-white/10 bg-white/10 p-6">

              <h3 className="text-center text-sm font-semibold">
                I am a Buyer/Supplier
              </h3>

              <p className="mt-3 text-center text-xs leading-5 text-gray-300">
                Source directly from farms, track logistics, and manage
                bulk inventory through the app.
              </p>

              <Link
                to="/register"
                className="mt-5 flex w-full justify-center rounded-lg bg-white px-4 py-3 text-sm font-semibold text-[#343E4F] transition hover:bg-gray-100"
              >
                Sign Up Now
              </Link>

            </div>

          </div>

        </div>

      </section>

    </div>
  );
}


/* ============================================================
   PRODUCT CARD
============================================================ */

function ProductCard({
  image,
  name,
  badge,
  location,
  quantity,
  price,
}) {
  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg">

      <div className="relative">

        <img
          src={image}
          alt={name}
          className="block h-48 w-full object-cover"
        />

        <span className="absolute right-3 top-3 rounded bg-white px-2 py-1 text-[9px] font-bold text-gray-600 shadow">
          {badge}
        </span>

      </div>

      <div className="p-4">

        <h3 className="text-sm font-semibold text-[#343E4F]">
          {name}
        </h3>

        <p className="mt-1 text-[11px] text-gray-500">
          {location} • {quantity}
        </p>

        <div className="mt-4 flex items-center justify-between">

          <span className="text-sm font-bold text-[#E57036]">
            {price}
          </span>

          <Link
            to="/marketplace"
            className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#E57036] text-white transition hover:opacity-90"
            aria-label={`View ${name}`}
          >
            <ShoppingCart size={16} />
          </Link>

        </div>

      </div>

    </div>
  );
}


/* ============================================================
   AI SERVICE
============================================================ */

function AIService({
  icon,
  title,
  description,
  action,
  link,
}) {
  return (
    <div className="rounded-xl border border-gray-200 border-t-2 border-t-[#E57036] bg-white p-6 shadow-sm">

      <div className="mb-5 flex h-10 w-10 items-center justify-center rounded-lg bg-orange-50 text-[#E57036]">
        {icon}
      </div>

      <h3 className="text-sm font-semibold text-[#343E4F]">
        {title}
      </h3>

      <p className="mt-3 text-xs leading-5 text-gray-500">
        {description}
      </p>

      <Link
        to={link}
        className="mt-5 flex items-center gap-1 text-xs font-semibold text-[#E57036]"
      >
        {action}
        <ArrowRight size={14} />
      </Link>

    </div>
  );
}


/* ============================================================
   STATISTIC
============================================================ */

function Statistic({ number, label }) {
  return (
    <div>

      <div className="text-3xl font-bold sm:text-4xl">
        {number}
      </div>

      <div className="mt-1 text-[8px] font-medium tracking-wide sm:text-[10px]">
        {label}
      </div>

    </div>
  );
}


/* ============================================================
   TESTIMONIAL
============================================================ */

function Testimonial({
  quote,
  name,
  role,
}) {
  return (
    <div className="rounded-xl bg-white p-6 shadow-sm">

      <p className="text-xs italic leading-5 text-gray-600 sm:text-sm">
        "{quote}"
      </p>

      <div className="mt-6 flex items-center gap-3">

        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#E57036] text-xs font-bold text-white">
          {name.charAt(0)}
        </div>

        <div>

          <p className="text-xs font-semibold text-[#343E4F]">
            {name}
          </p>

          <p className="text-[10px] text-gray-500">
            {role}
          </p>

        </div>

      </div>

    </div>
  );
}

export default LandingPage;