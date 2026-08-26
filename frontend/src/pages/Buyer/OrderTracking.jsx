import React from 'react';

export default function OrderTracking() {
  return (
    <div className="min-h-screen bg-slate-50 pb-24 font-sans text-slate-800">
      {/* Top Header */}
      <header className="flex items-center justify-between bg-white px-4 py-3 shadow-sm border-b border-slate-100">
        <button className="text-sm font-medium text-slate-600">menu</button>
        <h1 className="text-base font-semibold text-[#343E4F]">D-Agro Market AI</h1>
        <button className="text-sm font-medium text-slate-600">notifications</button>
      </header>

      {/* Main Container */}
      <main className="p-4 space-y-4">
        <div className="flex items-center gap-1 text-xs text-slate-500">
          <span>Orders</span>
          <span>&gt;</span>
          <span className="font-semibold text-[#E57036]">Order #AG-88219</span>
        </div>

        <div>
          <h2 className="text-2xl font-black text-[#343E4F]">Tracking Status</h2>
          <div className="mt-2 inline-flex items-center gap-2 rounded-full bg-[#E57036]/10 px-3 py-1.5">
            <span className="text-xs text-[#E57036] font-mono">local_shipping</span>
            <span className="text-xs font-bold text-[#E57036]">Out for Delivery</span>
            <span className="text-xs text-slate-600 ml-2">Estimated arrival: Today, 2:45 PM</span>
          </div>
        </div>

        {/* Map Simulator Card */}
        <div className="relative h-64 w-full rounded-2xl overflow-hidden shadow-sm border border-slate-200 bg-[#343E4F]/5">
          <div className="absolute inset-0 opacity-40 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:16px_16px]"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center bg-white/90 backdrop-blur-sm p-4 rounded-xl shadow-md border border-slate-100">
              <span className="text-[#343E4F] font-bold text-sm">Addis Ababa, Ethiopia</span>
              <p className="text-xs text-slate-500 mt-1">Delivery Destination: Bole Sub-City</p>
            </div>
          </div>
          <div className="absolute bottom-4 left-4 right-4 bg-white p-3 rounded-xl shadow-lg flex items-center justify-between border border-slate-100">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-[#343E4F] flex items-center justify-center text-white text-xs font-bold">stan</div>
              <div>
                <p className="text-[10px] text-slate-400 font-bold uppercase">Current Distance</p>
                <p className="text-xs font-bold text-[#343E4F]">3.2 km away</p>
              </div>
            </div>
            <div>
              <p className="text-[10px] text-slate-400 font-bold uppercase">Arrival Time</p>
              <p className="text-xs font-bold text-[#E57036]">~12 mins</p>
            </div>
          </div>
        </div>

        {/* Delivery Progress Steps */}
        <div className="rounded-2xl bg-white p-5 shadow-sm border border-slate-100 space-y-4">
          <h3 className="text-sm font-bold text-[#343E4F]">Delivery Progress</h3>
          <div className="flex justify-between items-center relative">
            <div className="flex flex-col items-center">
              <div className="h-8 w-8 rounded-full bg-[#E57036] text-white flex items-center justify-center text-xs font-bold">✓</div>
              <span className="text-xs font-semibold text-[#343E4F] mt-1">Order</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="h-8 w-8 rounded-full bg-[#E57036] text-white flex items-center justify-center text-xs font-bold">✓</div>
              <span className="text-xs font-semibold text-[#343E4F] mt-1">Processing</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="h-8 w-8 rounded-full bg-[#E57036]/20 text-[#E57036] flex items-center justify-center text-xs font-bold">🚚</div>
              <span className="text-xs font-semibold text-[#E57036] mt-1">In Transit</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="h-8 w-8 rounded-full bg-slate-200 text-slate-400 flex items-center justify-center text-xs font-bold">📍</div>
              <span className="text-xs font-medium text-slate-400 mt-1">Delivered</span>
            </div>
          </div>
        </div>
      </main>

      {/* Bottom Nav */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 py-2 px-6 flex justify-around items-center text-xs text-slate-600">
        <button className="flex flex-col items-center text-slate-600"><span>Home</span></button>
        <button className="flex flex-col items-center text-slate-600"><span>Market</span></button>
        <button className="flex flex-col items-center text-slate-600"><span>AI Advisor</span></button>
      </nav>
    </div>
  );
}