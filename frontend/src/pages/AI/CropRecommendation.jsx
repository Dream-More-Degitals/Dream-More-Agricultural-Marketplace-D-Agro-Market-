import React from 'react';
import { 
  LayoutDashboard, ShoppingBag, Sparkles, ClipboardList, 
  Settings, Bell, ArrowRight, Sprout 
} from 'lucide-react';

export default function CropRecommendation() {
  return (
    <div className="flex h-screen bg-gray-50 font-sans text-[#343E4F] overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 bg-[#343E4F] border-r border-[#343E4F]/20 flex flex-col justify-between shrink-0">
        <div>
          <div className="h-16 flex items-center gap-2.5 px-6 border-b border-white/10 font-bold text-lg text-white tracking-wide">
            <Sprout size={20} className="text-[#E57036]" /> D-Agro Market AI
          </div>
          <div className="p-4">
            <div className="flex items-center gap-3 p-3 mb-6 rounded-xl bg-white/5 border border-white/10">
              <div className="w-10 h-10 rounded-full bg-[#E57036]/20 text-[#E57036] font-bold flex items-center justify-center text-sm shrink-0 border border-[#E57036]/30">
                AB
              </div>
              <div className="overflow-hidden">
                <p className="text-sm font-bold text-white truncate">Abebe Bikila</p>
                <p className="text-xs text-gray-300 truncate">Verified Farmer • Oromia</p>
              </div>
            </div>
            
            <nav className="space-y-1.5">
              <a href="#" className="flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-xl text-gray-300 hover:bg-white/10 hover:text-white transition-colors">
                <LayoutDashboard size={18} className="text-gray-400" /> Dashboard
              </a>
              <a href="#" className="flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-xl text-gray-300 hover:bg-white/10 hover:text-white transition-colors">
                <ShoppingBag size={18} className="text-gray-400" /> Marketplace
              </a>
              <a href="#" className="flex items-center gap-3 px-3 py-2.5 text-sm font-semibold rounded-xl bg-[#E57036] text-white shadow-lg shadow-[#E57036]/30">
                <Sparkles size={18} /> AI Services
              </a>
              <a href="#" className="flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-xl text-gray-300 hover:bg-white/10 hover:text-white transition-colors">
                <ClipboardList size={18} className="text-gray-400" /> Orders
              </a>
              <a href="#" className="flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-xl text-gray-300 hover:bg-white/10 hover:text-white transition-colors">
                <Settings size={18} className="text-gray-400" /> Settings
              </a>
            </nav>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto flex flex-col bg-gray-50">
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-8 shrink-0 shadow-2xs">
          <div className="flex items-center gap-2 text-xs font-medium text-gray-500">
            <span>AI Portal</span>
            <span className="text-gray-300">/</span>
            <span className="text-[#343E4F] font-semibold">Crop Recommendation</span>
          </div>
          <div className="flex items-center gap-4">
            <button className="relative text-gray-500 hover:text-[#343E4F] p-2 rounded-xl hover:bg-gray-100 transition-colors">
              <Bell size={20} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#E57036] rounded-full"></span>
            </button>
            <div className="w-8 h-8 bg-[#343E4F] rounded-full flex items-center justify-center text-white text-xs font-bold shadow-sm">AB</div>
          </div>
        </header>

        <div className="p-8 max-w-6xl mx-auto space-y-8 flex-1 w-full">
          <div>
            <h1 className="text-2xl font-bold text-[#343E4F] tracking-tight">AI Crop Recommendation</h1>
            <p className="text-sm text-gray-500 mt-1">Optimize your harvest by matching local soil and climate conditions with AI-driven insights.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Soil Parameters Form */}
            <div className="bg-white border border-gray-200/80 rounded-2xl p-6 space-y-6 shadow-2xs">
              <h2 className="font-bold text-[#343E4F] text-base">Soil Parameters</h2>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Soil Type</label>
                <select className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium text-[#343E4F] focus:outline-hidden focus:border-[#E57036] focus:ring-2 focus:ring-[#E57036]/10 transition-all">
                  <option>Black Soil (Vertisol)</option>
                  <option>Red Soil (Nitisol)</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Annual Rainfall (mm)</label>
                <input type="text" placeholder="e.g. 850" className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium text-[#343E4F] focus:outline-hidden focus:border-[#E57036] focus:ring-2 focus:ring-[#E57036]/10 transition-all" />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Current Season</label>
                <div className="grid grid-cols-2 gap-3">
                  <button type="button" className="p-3 border-2 border-[#E57036] bg-[#E57036]/10 text-[#E57036] font-semibold rounded-xl text-sm transition-all cursor-pointer">Meher</button>
                  <button type="button" className="p-3 border border-gray-200 text-gray-600 font-semibold rounded-xl text-sm hover:bg-gray-50 transition-all cursor-pointer">Belg</button>
                </div>
              </div>
              <button type="button" className="w-full py-3.5 bg-[#E57036] hover:bg-[#d0612c] text-white font-semibold rounded-xl transition-all shadow-md shadow-[#E57036]/20 flex items-center justify-center gap-2 cursor-pointer text-sm">
                <Sparkles size={16} /> Get AI Recommendation
              </button>
            </div>

            {/* Top AI Matches */}
            <div className="lg:col-span-2 space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="font-bold text-[#343E4F] text-base">Top AI Matches</h2>
                <span className="text-xs bg-[#E57036]/10 text-[#E57036] border border-[#E57036]/20 px-3 py-1 rounded-full font-bold shadow-2xs">Confidence: 94%</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white border-2 border-[#E57036]/40 rounded-2xl p-6 relative shadow-2xs hover:shadow-md transition-shadow">
                  <span className="absolute top-6 right-6 bg-[#E57036] text-white text-xs font-bold px-2.5 py-1 rounded-lg shadow-2xs">98% Match</span>
                  <h3 className="font-bold text-lg text-[#343E4F] mb-0.5">Chickpeas</h3>
                  <p className="text-xs text-gray-400 mb-4 font-medium">Cicer arietinum</p>
                  <div className="flex justify-between text-sm mb-4 bg-gray-50 p-3.5 rounded-xl border border-gray-100">
                    <div>
                      <span className="text-gray-400 block text-[10px] font-bold uppercase tracking-wider">Est. Yield</span>
                      <span className="font-extrabold text-[#343E4F] text-base">2.4 t/ha</span>
                    </div>
                    <div>
                      <span className="text-gray-400 block text-[10px] font-bold uppercase tracking-wider">Duration</span>
                      <span className="font-extrabold text-[#343E4F] text-base">110 Days</span>
                    </div>
                  </div>
                  <p className="text-xs text-gray-600 mb-5 leading-relaxed italic">"Optimal for current Black Soil moisture retention. Predicted rainfall favors the early vegetative stage without waterlogging risks."</p>
                  <a href="#" className="text-xs text-[#E57036] font-bold flex items-center gap-1 hover:text-[#d0612c] transition-colors">View Market Price <ArrowRight size={14} /></a>
                </div>

                <div className="bg-white border border-gray-200/80 rounded-2xl p-6 relative shadow-2xs hover:shadow-md transition-shadow">
                  <span className="absolute top-6 right-6 bg-gray-100 text-gray-700 text-xs font-bold px-2.5 py-1 rounded-lg">85% Match</span>
                  <h3 className="font-bold text-lg text-[#343E4F] mb-0.5">Sorghum</h3>
                  <p className="text-xs text-gray-400 mb-4 font-medium">Sorghum bicolor</p>
                  <div className="flex justify-between text-sm mb-4 bg-gray-50 p-3.5 rounded-xl border border-gray-100">
                    <div>
                      <span className="text-gray-400 block text-[10px] font-bold uppercase tracking-wider">Est. Yield</span>
                      <span className="font-extrabold text-[#343E4F] text-base">3.1 t/ha</span>
                    </div>
                    <div>
                      <span className="text-gray-400 block text-[10px] font-bold uppercase tracking-wider">Duration</span>
                      <span className="font-extrabold text-[#343E4F] text-base">140 Days</span>
                    </div>
                  </div>
                  <p className="text-xs text-gray-600 mb-5 leading-relaxed italic">"Resilient alternative if late-season rain persists. Excellent drought tolerance in later stages of the Meher cycle."</p>
                  <a href="#" className="text-xs text-[#E57036] font-bold flex items-center gap-1 hover:text-[#d0612c] transition-colors">View Seed Availability <ArrowRight size={14} /></a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}