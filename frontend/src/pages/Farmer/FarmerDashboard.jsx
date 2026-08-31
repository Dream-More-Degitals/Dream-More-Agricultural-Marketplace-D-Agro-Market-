import { 
  ShoppingBag, Sparkles, TrendingUp, 
  ArrowUpRight, BarChart3, ShieldCheck, Plus,
} from 'lucide-react';

export default function FarmerDashboard() {
  return (
    <div className="space-y-8">
      {/* Greeting Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-gray-200 shadow-xs">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Hello, Abebe!</h1>
          <p className="text-sm text-gray-500 mt-1">Your farm health is stable. 3 new inquiries for Coffee beans.</p>
        </div>
        <button className="flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition-all shadow-sm shadow-orange-200 cursor-pointer">
          <Plus size={16} /> Create Listing
        </button>
      </div>

      {/* Top Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-gray-200 flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <span className="text-xs font-bold uppercase tracking-wider text-gray-400">Crop Health</span>
            <ShieldCheck className="text-green-500" size={20} />
          </div>
          <div className="my-4">
            <div className="text-4xl font-extrabold tracking-tight">92%</div>
            <div className="text-xs font-semibold text-green-600 mt-1 flex items-center gap-1">
              <TrendingUp size={14} /> +2% vs last week
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-200 flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <span className="text-xs font-bold uppercase tracking-wider text-gray-400">Active Listings</span>
            <ShoppingBag className="text-orange-500" size={20} />
          </div>
          <div className="my-4">
            <div className="text-4xl font-extrabold tracking-tight">14</div>
            <div className="text-xs text-gray-500 mt-1">items for sale</div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-orange-500 to-orange-600 p-6 rounded-2xl text-white shadow-md shadow-orange-100 flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <span className="text-xs font-bold uppercase tracking-wider text-orange-100">Total Earnings</span>
            <BarChart3 className="text-orange-200" size={20} />
          </div>
          <div className="my-4">
            <div className="text-3xl font-extrabold tracking-tight">ETB 45,600</div>
            <div className="text-xs text-orange-100 mt-1 flex items-center gap-1">
              <ArrowUpRight size={14} /> Verified monthly payout
            </div>
          </div>
        </div>
      </div>

      {/* Middle Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white rounded-2xl border border-orange-200 p-6 flex flex-col justify-between relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-orange-50 rounded-bl-full pointer-events-none"></div>
          <div>
            <div className="flex items-center gap-2 text-orange-600 font-bold text-sm mb-3">
              <Sparkles size={18} /> AI Advisor Insights
            </div>
            <p className="text-sm text-gray-700 leading-relaxed mb-6">
              Based on regional weather patterns and market demand, coffee prices are expected to rise by 15% next month. We recommend holding 30% of your current stock for late-season trading.
            </p>
          </div>
          <div className="grid grid-cols-3 gap-3 pt-2">
            <button className="py-2.5 px-3 bg-orange-50 hover:bg-orange-100 text-orange-700 font-semibold text-xs rounded-xl border border-orange-100 cursor-pointer">
              Scan Crop
            </button>
            <button className="py-2.5 px-3 bg-gray-50 hover:bg-gray-100 text-gray-700 font-semibold text-xs rounded-xl border border-gray-200 cursor-pointer">
              Price Forecast
            </button>
            <button className="py-2.5 px-3 bg-gray-50 hover:bg-gray-100 text-gray-700 font-semibold text-xs rounded-xl border border-gray-200 cursor-pointer">
              Ask Advisor
            </button>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-200 p-6 flex flex-col justify-between">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-sm">Alerts</h3>
            <span className="text-xs bg-red-100 text-red-600 font-bold px-2 py-0.5 rounded-full">2 New</span>
          </div>
          <div className="space-y-4">
            <div className="flex items-start gap-3 pb-3 border-b border-gray-100">
              <div className="w-2 h-2 rounded-full bg-orange-500 mt-1.5 shrink-0"></div>
              <div>
                <p className="text-xs font-bold text-gray-900">Price Update</p>
                <p className="text-xs text-gray-500 mt-0.5">Teff prices up 4% in Addis Ababa market.</p>
                <span className="text-[10px] text-gray-400 mt-1 block">2 mins ago</span>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 rounded-full bg-blue-500 mt-1.5 shrink-0"></div>
              <div>
                <p className="text-xs font-bold text-gray-900">New Inquiry</p>
                <p className="text-xs text-gray-500 mt-0.5">Mela Union wants to buy 500kg of Corn.</p>
                <span className="text-[10px] text-gray-400 mt-1 block">1 hour ago</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}