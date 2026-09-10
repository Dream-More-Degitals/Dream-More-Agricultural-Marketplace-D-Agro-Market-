import React, { useEffect, useState } from "react";
import {
  Bell,
  ShieldCheck,
  TrendingDown,
  Cpu,
  Megaphone,
  Check,
} from "lucide-react";

const defaultPreferences = {
  orderUpdates: true,
  priceAlerts: true,
  aiInsights: false,
  promotionalOffers: false,
};

export default function Notifications() {
  const [preferences, setPreferences] = useState(defaultPreferences);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const savedPreferences = localStorage.getItem("notificationPreferences");

    if (savedPreferences) {
      try {
        setPreferences({
          ...defaultPreferences,
          ...JSON.parse(savedPreferences),
        });
      } catch {
        setPreferences(defaultPreferences);
      }
    }
  }, []);

  const handleToggle = (key) => {
    setPreferences((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));

    setSaved(false);
  };

  const handleSave = () => {
    localStorage.setItem(
      "notificationPreferences",
      JSON.stringify(preferences)
    );

    setSaved(true);

    setTimeout(() => {
      setSaved(false);
    }, 2500);
  };

  return (
    <div className="min-h-screen bg-slate-50 p-4 sm:p-6 md:p-8 font-sans text-slate-800">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl md:text-3xl font-black text-[#343E4F]">
            Notification Preferences
          </h1>

          <p className="mt-1 text-xs sm:text-sm text-slate-500">
            Choose how and when you want to receive alerts regarding market
            updates and orders.
          </p>
        </div>

        {/* Preferences Card */}
        <div className="bg-white p-4 sm:p-6 rounded-2xl shadow-sm border border-slate-100">
          <div className="space-y-2">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5 mb-4">
              <Bell className="w-3.5 h-3.5 text-[#E57036]" />
              Alert Channels
            </h3>

            {/* Order Updates */}
            <NotificationOption
              icon={<ShieldCheck className="w-4 h-4 text-emerald-600" />}
              title="Order Status Updates"
              description="Get notified when orders are shipped or delivered."
              checked={preferences.orderUpdates}
              onChange={() => handleToggle("orderUpdates")}
            />

            {/* Price Alerts */}
            <NotificationOption
              icon={<TrendingDown className="w-4 h-4 text-[#E57036]" />}
              title="Price Alerts"
              description="Notifications for significant market price drops."
              checked={preferences.priceAlerts}
              onChange={() => handleToggle("priceAlerts")}
            />

            {/* AI Insights */}
            <NotificationOption
              icon={<Cpu className="w-4 h-4 text-blue-600" />}
              title="AI Market Insights"
              description="Periodic algorithmic market predictions."
              checked={preferences.aiInsights}
              onChange={() => handleToggle("aiInsights")}
            />

            {/* Promotional Offers */}
            <NotificationOption
              icon={<Megaphone className="w-4 h-4 text-amber-500" />}
              title="Promotional Offers"
              description="Marketing deals and new feature announcements."
              checked={preferences.promotionalOffers}
              onChange={() => handleToggle("promotionalOffers")}
              last
            />
          </div>

          {/* Save */}
          <div className="pt-5 mt-4 border-t border-slate-100 flex flex-col sm:flex-row items-stretch sm:items-center justify-end gap-3">
            {saved && (
              <p className="text-sm font-semibold text-emerald-600 flex items-center justify-center gap-1.5">
                <Check className="w-4 h-4" />
                Preferences saved
              </p>
            )}

            <button
              onClick={handleSave}
              className="bg-[#E57036] text-white text-xs sm:text-sm font-bold px-6 py-3 rounded-xl shadow-md hover:bg-[#E57036]/90 transition-all flex items-center justify-center gap-1.5"
            >
              <Check className="w-4 h-4" />
              Save Preferences
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------
   Notification Option Component
-------------------------------------------------- */

function NotificationOption({
  icon,
  title,
  description,
  checked,
  onChange,
  last = false,
}) {
  return (
    <div
      className={`flex items-center justify-between gap-4 py-4 ${
        !last ? "border-b border-slate-100" : ""
      }`}
    >
      {/* Information */}
      <div className="flex items-center gap-3 min-w-0">
        <div className="flex-shrink-0 p-2 bg-slate-100 rounded-xl">
          {icon}
        </div>

        <div className="min-w-0">
          <p className="font-bold text-sm text-[#343E4F]">
            {title}
          </p>

          <p className="text-xs text-slate-400 mt-0.5">
            {description}
          </p>
        </div>
      </div>

      {/* Switch */}
      <button
        type="button"
        onClick={onChange}
        aria-label={`Toggle ${title}`}
        aria-pressed={checked}
        className={`relative flex-shrink-0 w-11 h-6 rounded-full transition-colors ${
          checked ? "bg-[#E57036]" : "bg-slate-200"
        }`}
      >
        <span
          className={`absolute top-[2px] left-[2px] w-5 h-5 bg-white border border-slate-300 rounded-full transition-transform ${
            checked ? "translate-x-5 border-white" : ""
          }`}
        />
      </button>
    </div>
  );
}