import React, { useState } from "react";
import ChatBox from "../../components/ai/ChatBox";
import UploadImage from "../../components/ai/UploadImage";

function AIPage() {
  const [tab, setTab] = useState("chat");

  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-6 pb-20 space-y-6">
      <div className="space-y-1">
        <h1 className="text-2xl sm:text-3xl font-black text-[#343E4F]">
          D-Agro AI Intelligence Hub 🤖
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 font-medium">
          Real-time crop advice, disease scanning, and market price predictions.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-slate-200 pb-2">
        <button
          onClick={() => setTab("chat")}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition ${
            tab === "chat"
              ? "bg-[#343E4F] text-white shadow-sm"
              : "bg-white text-slate-600 hover:bg-slate-100"
          }`}
        >
          💬 AI Market Assistant
        </button>

        <button
          onClick={() => setTab("disease")}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition ${
            tab === "disease"
              ? "bg-[#343E4F] text-white shadow-sm"
              : "bg-white text-slate-600 hover:bg-slate-100"
          }`}
        >
          🌿 Crop Disease Diagnosis
        </button>
      </div>

      {tab === "chat" ? <ChatBox /> : <UploadImage />}
    </div>
  );
}

export default AIPage;
