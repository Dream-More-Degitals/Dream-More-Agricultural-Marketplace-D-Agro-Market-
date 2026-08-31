import React from 'react';
import { Bell, ShieldCheck, TrendingDown, Cpu, Megaphone, Check } from 'lucide-react';
export default function Notifications() {
  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-8 font-sans text-slate-800 max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-black text-[#343E4F]">Notification Preferences</h1>
        <p className="text-xs text-slate-500">Choose how and when you want to receive alerts regarding market updates and orders.</p>
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 space-y-6">
        <div className="space-y-4">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5"><Bell className="w-3.5 h-3.5 text-[#E57036]" /> Alert Channels</h3>
          
          <div className="flex items-center justify-between py-3.5 border-b border-slate-100">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-slate-100 text-[#343E4F] rounded-xl"><ShieldCheck className="w-4 h-4 text-emerald-600" /></div>
              <div>
                <p className="font-bold text-sm text-[#343E4F]">Order Status Updates</p>
                <p className="text-xs text-slate-400">Get notified when orders are shipped or delivered.</p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" defaultChecked className="sr-only peer" />
              <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#E57036]"></div>
            </label>
          </div>

          <div className="flex items-center justify-between py-3.5 border-b border-slate-100">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-slate-100 text-[#343E4F] rounded-xl"><TrendingDown className="w-4 h-4 text-[#E57036]" /></div>
              <div>
                <p className="font-bold text-sm text-[#343E4F]">Price Alerts</p>
                <p className="text-xs text-slate-400">Notifications for significant market price drops.</p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" defaultChecked className="sr-only peer" />
              <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#E57036]"></div>
            </label>
          </div>

          <div className="flex items-center justify-between py-3.5 border-b border-slate-100">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-slate-100 text-[#343E4F] rounded-xl"><Cpu className="w-4 h-4 text-blue-600" /></div>
              <div>
                <p className="font-bold text-sm text-[#343E4F]">AI Market Insights</p>
                <p className="text-xs text-slate-400">Periodic algorithmic market predictions.</p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" />
              <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#E57036]"></div>
            </label>
          </div>

          <div className="flex items-center justify-between py-3.5">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-slate-100 text-[#343E4F] rounded-xl"><Megaphone className="w-4 h-4 text-amber-500" /></div>
              <div>
                <p className="font-bold text-sm text-[#343E4F]">Promotional Offers</p>
                <p className="text-xs text-slate-400">Marketing deals and new feature announcements.</p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" />
              <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#E57036]"></div>
            </label>
          </div>
        </div>

        <div className="pt-4 flex justify-end">
          <button className="bg-[#E57036] text-white text-xs font-bold px-6 py-3 rounded-xl shadow-md hover:bg-[#E57036]/90 transition-all flex items-center gap-1.5">
            <Check className="w-4 h-4" /> Save Preferences
          </button>
        </div>
      </div>
    </div>
  );
}