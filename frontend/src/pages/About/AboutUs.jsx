import {
  ArrowRight,
  BarChart3,
  CheckCircle2,
  Globe2,
  LockKeyhole,
  Sparkles,
  Store,
  Target,
  Users,
} from "lucide-react";

function AboutUs() {
  return (
    <div className="min-h-screen w-full overflow-hidden bg-[#F8F9FA] text-[#343E4F]">

      {/* =====================================================
          HERO
      ====================================================== */}
      <section className="relative">

        <div className="relative h-[420px] w-full sm:h-[500px] lg:h-[560px]">

          <img
            src="/src/assets/images/About.jpg"
            alt="Ethiopian agriculture"
            className="absolute inset-0 h-full w-full object-cover"
          />

          {/* Dark overlay */}
          <div className="absolute inset-0 bg-[#343E4F]/70" />

          {/* Hero content */}
          <div className="relative z-10 mx-auto flex h-full max-w-7xl items-center px-5 sm:px-8 lg:px-12">

            <div className="max-w-2xl text-center sm:text-left">

              <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-[#E57036] px-4 py-2 text-xs font-semibold text-white">
                <Sparkles size={14} />
                D-Agro Market AI
              </div>

              <h1 className="text-3xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl">
                Revolutionizing
                <br />
                Ethiopian Agriculture
                <br />
                through Intelligence
              </h1>

             

            </div>

          </div>
        </div>

      </section>


      {/* =====================================================
          MISSION & VISION
      ====================================================== */}
      <section className="px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">

        <div className="mx-auto grid max-w-7xl gap-5 md:grid-cols-2 lg:gap-8">

          {/* Mission */}
          <InfoCard
            icon={<Target size={20} />}
            title="Our Mission"
            text="To empower Ethiopian smallholder farmers by providing real-time market insights, agricultural advice, and a direct-to-consumer digital marketplace. We are bridging the information gap that has traditionally marginalized rural agricultural producers."
            orange
          />

          {/* Vision */}
          <InfoCard
            icon={<Globe2 size={20} />}
            title="Our Vision"
            text="We envision a modernized Ethiopian agricultural value chain where technology eliminates waste, ensures fair pricing, and creates sustainable opportunities for every participant in the agricultural ecosystem."
            dark
          />

        </div>

      </section>


      {/* =====================================================
          WHY D-AGRO
      ====================================================== */}
      <section className="bg-white px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">

        <div className="mx-auto max-w-7xl">

          {/* Heading */}
          <div className="mb-10 text-center">

            <p className="text-xs font-semibold uppercase tracking-widest text-[#E57036]">
              Our Advantages
            </p>

            <h2 className="mt-2 text-2xl font-bold text-[#343E4F] sm:text-3xl">
              Why D-Agro Market AI?
            </h2>

            <div className="mx-auto mt-4 h-1 w-12 rounded-full bg-[#E57036]" />

          </div>


          {/* Feature cards */}
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">

            <FeatureCard
              icon={<BarChart3 size={19} />}
              title="Predictive Analytics"
              badge="AI POWERED"
              text="Using satellite imagery and local climate data, our AI delivers farmers real-time predictions and insights before they happen."
            />

            <FeatureCard
              icon={<Store size={19} />}
              title="Direct Market Access"
              text="We bypass unnecessary intermediaries, connecting rural agricultural producers directly with buyers and reducing market inefficiencies."
            />

            <FeatureCard
              icon={<LockKeyhole size={19} />}
              title="Trust & Transparency"
              text="Every transaction and quality check is logged on our secure platform, giving farmers and buyers confidence in the quality they expect."
            />

          </div>

        </div>

      </section>


      {/* =====================================================
          PLATFORM IMPACT
      ====================================================== */}
      <section className="px-4 py-12 sm:px-6 sm:py-16 lg:px-8">

        <div className="mx-auto max-w-7xl">

          <div className="overflow-hidden rounded-2xl border border-[#E57036] bg-white shadow-sm">

            <div className="grid items-center gap-8 p-6 sm:p-8 lg:grid-cols-[1fr_1.4fr] lg:p-12">

              {/* Left */}
              <div>

                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-full bg-orange-50 text-[#E57036]">
                  <Sparkles size={20} />
                </div>

                <p className="text-xs font-semibold uppercase tracking-widest text-[#E57036]">
                  Our Impact
                </p>

                <h2 className="mt-2 text-2xl font-bold text-[#343E4F] sm:text-3xl">
                  Platform Impact
                </h2>

                <p className="mt-4 text-sm leading-6 text-gray-600">
                  Based on regional data from 2023, our farmers saw an average
                  22% increase in harvest revenue and a 15% reduction in
                  post-harvest loss through our AI-driven platform.
                </p>

                <button className="mt-6 inline-flex items-center gap-2 rounded-lg bg-[#343E4F] px-5 py-3 text-xs font-semibold text-white transition hover:bg-[#E57036]">
                  Discover Impact
                  <ArrowRight size={15} />
                </button>

              </div>


              {/* Right statistics */}
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">

                <ImpactStat
                  number="50K+"
                  label="Farmers"
                />

                <ImpactStat
                  number="1M+"
                  label="Quintals"
                />

                <ImpactStat
                  number="98%"
                  label="AI Accuracy"
                />

                <ImpactStat
                  number="22%"
                  label="Revenue Growth"
                />

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
    TEAM
====================================================== */}
<section className="bg-white px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
  <div className="mx-auto max-w-7xl">

    {/* Section Header */}
    <div className="mx-auto mb-12 max-w-2xl text-center">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#E57036]">
        Our Team
      </p>

      <h2 className="mt-2 text-2xl font-bold tracking-tight text-[#343E4F] sm:text-3xl lg:text-4xl">
        The Minds Behind D-Agro
      </h2>

      <p className="mt-4 text-sm leading-6 text-gray-500 sm:text-base">
        A passionate team working together to transform agriculture in
        Ethiopia through technology, innovation, and AI.
      </p>
    </div>

    {/* Team Members */}
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">

      {/* ABEBE EYAYU */}
      <div className="group rounded-2xl border border-gray-100 bg-white p-6 text-center shadow-sm transition duration-300 hover:-translate-y-1 hover:border-[#E57036]/30 hover:shadow-lg">
        <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-[#E57036] text-3xl font-bold text-white shadow-md transition duration-300 group-hover:scale-105">
          AE
        </div>

        <h3 className="mt-5 text-sm font-bold uppercase tracking-wide text-[#343E4F]">
          ABEBE EYAYU
        </h3>

        <p className="mt-2 text-xs font-medium leading-5 text-[#E57036]">
          CEO & Co-Founder
        </p>
      </div>

      {/* ABAY KASA */}
      <div className="group rounded-2xl border border-gray-100 bg-white p-6 text-center shadow-sm transition duration-300 hover:-translate-y-1 hover:border-[#E57036]/30 hover:shadow-lg">
        <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-[#E57036] text-3xl font-bold text-white shadow-md transition duration-300 group-hover:scale-105">
          AK
        </div>

        <h3 className="mt-5 text-sm font-bold uppercase tracking-wide text-[#343E4F]">
          ABAY KASA
        </h3>

        <p className="mt-2 text-xs font-medium leading-5 text-[#E57036]">
          Academic Leader & Co-Founder
        </p>
      </div>

      {/* BETELHEM ZARADAWIT */}
      <div className="group rounded-2xl border border-gray-100 bg-white p-6 text-center shadow-sm transition duration-300 hover:-translate-y-1 hover:border-[#E57036]/30 hover:shadow-lg">
        <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-[#E57036] text-3xl font-bold text-white shadow-md transition duration-300 group-hover:scale-105">
          BZ
        </div>

        <h3 className="mt-5 text-sm font-bold uppercase tracking-wide text-[#343E4F]">
          BETELHEM ZARADAWIT
        </h3>

        <p className="mt-2 text-xs font-medium leading-5 text-[#E57036]">
          Digital Marketer & Co-Founder
        </p>
      </div>

      {/* ABEL TILAHUN */}
      <div className="group rounded-2xl border border-gray-100 bg-white p-6 text-center shadow-sm transition duration-300 hover:-translate-y-1 hover:border-[#E57036]/30 hover:shadow-lg">
        <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-[#E57036] text-3xl font-bold text-white shadow-md transition duration-300 group-hover:scale-105">
          AT
        </div>

        <h3 className="mt-5 text-sm font-bold uppercase tracking-wide text-[#343E4F]">
          ABEL TILAHUN
        </h3>

        <p className="mt-2 text-xs font-medium leading-5 text-[#E57036]">
          Production Leader
        </p>
      </div>

      {/* BEREKET SMIE */}
      <div className="group rounded-2xl border border-gray-100 bg-white p-6 text-center shadow-sm transition duration-300 hover:-translate-y-1 hover:border-[#E57036]/30 hover:shadow-lg">
        <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-[#E57036] text-3xl font-bold text-white shadow-md transition duration-300 group-hover:scale-105">
          BS
        </div>

        <h3 className="mt-5 text-sm font-bold uppercase tracking-wide text-[#343E4F]">
          BEREKET SMIE
        </h3>

        <p className="mt-2 text-xs font-medium leading-5 text-[#E57036]">
          Marketing Leader
        </p>
      </div>

      {/* MIKIYAS */}
      <div className="group rounded-2xl border border-gray-100 bg-white p-6 text-center shadow-sm transition duration-300 hover:-translate-y-1 hover:border-[#E57036]/30 hover:shadow-lg">
        <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-[#E57036] text-3xl font-bold text-white shadow-md transition duration-300 group-hover:scale-105">
          M
        </div>

        <h3 className="mt-5 text-sm font-bold uppercase tracking-wide text-[#343E4F]">
          MIKIYAS
        </h3>

        <p className="mt-2 text-xs font-medium leading-5 text-[#E57036]">
          Software Development Leader
        </p>
      </div>

    </div>
  </div>
</section>
      {/* =====================================================
          FINAL CTA
      ====================================================== */}
      <section className="bg-[#343E4F] px-5 py-14 text-center sm:px-8 sm:py-20">

        <div className="mx-auto max-w-3xl">

          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#E57036] text-white">
            <Users size={22} />
          </div>

          <h2 className="mt-5 text-2xl font-bold text-white sm:text-4xl">
            Join the Agricultural Revolution
          </h2>

          <p className="mt-4 text-sm leading-6 text-gray-300 sm:text-base">
            Together, we can build a stronger and more connected agricultural
            ecosystem for Ethiopia.
          </p>

          <button className="mt-7 inline-flex items-center gap-2 rounded-lg bg-[#E57036] px-6 py-3 text-sm font-semibold text-white transition hover:opacity-90">
            Get Started
            <ArrowRight size={16} />
          </button>

        </div>

      </section>

    </div>
  );
}


/* ============================================================
   INFO CARD
============================================================ */

function InfoCard({ icon, title, text, orange, dark }) {
  return (
    <div
      className={`rounded-xl p-6 shadow-sm transition hover:-translate-y-1 sm:p-8 ${
        dark
          ? "bg-[#343E4F] text-white"
          : "border border-gray-200 border-l-2 border-l-[#E57036] bg-white"
      }`}
    >

      <div
        className={`mb-5 flex h-10 w-10 items-center justify-center rounded-lg ${
          dark
            ? "bg-white/10 text-white"
            : "bg-orange-50 text-[#E57036]"
        }`}
      >
        {icon}
      </div>

      <h3
        className={`text-lg font-bold ${
          dark ? "text-white" : "text-[#343E4F]"
        }`}
      >
        {title}
      </h3>

      <p
        className={`mt-3 text-sm leading-6 ${
          dark ? "text-gray-300" : "text-gray-600"
        }`}
      >
        {text}
      </p>

      {orange && (
        <div className="mt-5 h-1 w-12 rounded-full bg-[#E57036]" />
      )}

    </div>
  );
}


/* ============================================================
   FEATURE CARD
============================================================ */

function FeatureCard({
  icon,
  title,
  badge,
  text,
}) {
  return (
    <div className="group rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-[#E57036] hover:shadow-md">

      <div className="flex items-start justify-between gap-3">

        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-50 text-[#E57036]">
          {icon}
        </div>

        {badge && (
          <span className="rounded bg-orange-50 px-2 py-1 text-[8px] font-bold text-[#E57036]">
            {badge}
          </span>
        )}

      </div>

      <h3 className="mt-5 text-base font-bold text-[#343E4F]">
        {title}
      </h3>

      <p className="mt-3 text-sm leading-6 text-gray-500">
        {text}
      </p>

    </div>
  );
}


/* ============================================================
   IMPACT STAT
============================================================ */

function ImpactStat({ number, label }) {
  return (
    <div className="rounded-xl bg-[#F8F9FA] p-4 text-center">

      <p className="text-xl font-bold text-[#E57036] sm:text-2xl">
        {number}
      </p>

      <p className="mt-1 text-[10px] font-medium uppercase tracking-wide text-gray-500">
        {label}
      </p>

    </div>
  );
}


/* ============================================================
   TEAM CARD
============================================================ */

function TeamCard({
  image,
  name,
  role,
}) {
  return (
    <div className="group overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg">

      <div className="aspect-[4/5] overflow-hidden bg-gray-100">

        <img
          src={image}
          alt={name}
          className="h-full w-full object-cover grayscale transition duration-500 group-hover:grayscale-0 group-hover:scale-105"
        />

      </div>

      <div className="p-4">

        <h3 className="text-sm font-bold text-[#343E4F]">
          {name}
        </h3>

        <p className="mt-1 text-xs text-gray-500">
          {role}
        </p>

      </div>

    </div>
  );
}

export default AboutUs;