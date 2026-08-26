import React from 'react';

export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-slate-50 pb-20 font-sans text-slate-800">
      {/* Top Header */}
      <header className="flex items-center justify-between bg-white px-4 py-3 shadow-sm">
        <button className="text-sm font-medium text-slate-600">menu</button>
        <h1 className="text-base font-semibold text-slate-900">Admin Overview</h1>
        <button className="relative text-sm font-medium text-slate-600">
          notifications
          <span className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-orange-500"></span>
        </button>
      </header>

      {/* Main Content */}
      <main className="p-4 space-y-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900">System Performance</h2>
          <p className="text-xs text-slate-500">Real-time metrics from the DreamMore ecosystem.</p>
        </div>

        {/* Action Bar */}
        <div className="flex items-center justify-between gap-2">
          <button className="flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-4 py-2 text-xs font-medium text-slate-700 shadow-sm">
            <span>history</span> Audit Logs
          </button>
          <button className="flex items-center gap-1.5 rounded-xl bg-orange-600 px-4 py-2 text-xs font-medium text-white shadow-sm">
            <span>description</span> Generate Report
          </button>
        </div>

        {/* Revenue Card */}
        <div className="rounded-2xl bg-white p-5 shadow-sm border border-slate-100 space-y-3">
          <div className="flex items-center justify-between">
            <span className="rounded-lg bg-orange-50 p-2 text-orange-600 font-mono text-sm">payments</span>
            <span className="rounded-full bg-orange-50 px-2.5 py-0.5 text-[10px] font-semibold text-orange-600">+12.5%</span>
          </div>
          <div>
            <p className="text-[11px] font-bold tracking-wider text-slate-400 uppercase">Total Revenue</p>
            <div className="flex items-baseline gap-1.5 mt-1">
              <h3 className="text-2xl font-black text-slate-900">1.2M</h3>
              <span className="text-sm font-bold text-orange-600">ETB</span>
            </div>
            <p className="text-[11px] text-slate-400 mt-1">vs 1.05M last month</p>
          </div>
        </div>

        {/* Active Users Card */}
        <div className="rounded-2xl bg-white p-5 shadow-sm border border-slate-100 space-y-3">
          <div className="flex items-center justify-between">
            <span className="rounded-lg bg-orange-50 p-2 text-orange-600 font-mono text-sm">group</span>
            <span className="rounded-full bg-orange-50 px-2.5 py-0.5 text-[10px] font-semibold text-orange-600">+4.2%</span>
          </div>
          <div>
            <p className="text-[11px] font-bold tracking-wider text-slate-400 uppercase">Active Users</p>
            <div className="flex items-baseline gap-1.5 mt-1">
              <h3 className="text-2xl font-black text-slate-900">14,820</h3>
            </div>
            <p className="text-[11px] text-slate-400 mt-1">520 new this week</p>
          </div>
        </div>
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 py-2 px-6 flex justify-around items-center text-xs text-slate-600">
        <button className="flex flex-col items-center text-orange-600">
          <span className="material-icons text-lg">dashboard</span>
          <span className="font-medium">Home</span>
        </button>
        <button className="flex flex-col items-center">
          <span className="material-icons text-lg">storefront</span>
          <span>Market</span>
        </button>
        <button className="flex flex-col items-center">
          <span className="material-icons text-lg">psychology</span>
          <span>AI Advisor</span>
        </button>
      </nav>
    </div>
  );
}