import { UserCheck, CreditCard, Building, Plus, Sparkles, ArrowRightLeft } from 'lucide-react';

export default function Profile() {
  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-8 font-sans text-slate-800 max-w-6xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-black text-[#343E4F]">Profile & Account</h1>
          <p className="text-xs text-slate-500">Manage your account settings and preferences.</p>
        </div>
        <button className="bg-[#E57036] text-white text-xs font-bold px-4.5 py-2.5 rounded-xl shadow-md hover:bg-[#E57036]/90 flex items-center gap-1.5 transition-all">
          <ArrowRightLeft className="w-4 h-4" /> Switch to Farmer
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Basic Info */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-slate-100 space-y-6">
          <div className="flex items-center gap-4">
            <div className="relative">
              <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150" alt="User" className="w-20 h-20 rounded-2xl object-cover border-2 border-[#E57036] shadow-sm" />
              <span className="absolute -bottom-2 -right-2 bg-emerald-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-0.5 shadow-sm">
                <UserCheck className="w-3 h-3" /> Verified
              </span>
            </div>
            <div>
              <h3 className="text-lg font-black text-[#343E4F]">Selamawit Kebede</h3>
              <p className="text-xs text-slate-400">selam.k@d-agro.com • +251 911 234 567</p>
              <p className="text-xs text-slate-500 mt-1">Region: <span className="font-bold text-[#343E4F]">Addis Ababa, Ethiopia</span></p>
            </div>
          </div>
          <button className="text-xs font-bold text-[#E57036] bg-orange-50 px-4 py-2.5 rounded-xl border border-orange-100 hover:bg-orange-100/50 transition-all">
            Edit Basic Information
          </button>
        </div>

        {/* AI Buyer Analysis Box */}
        <div className="bg-gradient-to-brfrom-[#343E4F] to-slate-900 text-white p-6 rounded-2xl shadow-md space-y-3">
          <span className="bg-[#E57036] text-[10px] font-bold px-3 py-1 rounded-full uppercase flex items-center gap-1 w-fit">
            <Sparkles className="w-3 h-3" /> Buyer AI Analysis
          </span>
          <p className="text-xs text-slate-200 leading-relaxed">
            You have focused <strong className="text-white">82%</strong> of your purchases on high-yield cereal crops. AI suggests locking in <strong className="text-white">Oromia Teff</strong> suppliers for next week's predicted price dip.
          </p>
          <div className="pt-2">
            <div className="w-full bg-slate-700 h-2 rounded-full overflow-hidden">
              <div className="bg-[#E57036] h-full w-[82%]"></div>
            </div>
            <span className="text-[10px] text-slate-400 mt-1.5 block font-semibold">Trust Score: 88/100</span>
          </div>
        </div>
      </div>

      {/* Payment Methods & Addresses */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 space-y-4">
          <div className="flex justify-between items-center">
            <h4 className="font-bold text-[#343E4F] flex items-center gap-1.5"><CreditCard className="w-4 h-4 text-[#E57036]" /> Payment Methods</h4>
            <button className="text-xs font-bold text-[#E57036] flex items-center gap-1 hover:underline"><Plus className="w-3.5 h-3.5" /> Add New</button>
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3.5 rounded-xl border border-orange-200 bg-orange-50/30">
              <div className="flex items-center gap-3">
                <CreditCard className="w-5 h-5 text-[#E57036]" />
                <div>
                  <p className="text-xs font-bold text-[#343E4F]">Telebirr Wallet</p>
                  <p className="text-[10px] text-slate-400">Linked: 091*****67</p>
                </div>
              </div>
              <span className="text-[10px] bg-[#E57036] text-white font-bold px-2 py-0.5 rounded-md shadow-sm">DEFAULT</span>
            </div>
            <div className="flex items-center justify-between p-3.5 rounded-xl border border-slate-200">
              <div className="flex items-center gap-3">
                <Building className="w-5 h-5 text-slate-500" />
                <div>
                  <p className="text-xs font-bold text-[#343E4F]">CBE Birr</p>
                  <p className="text-[10px] text-slate-400">Linked: 091*****37</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 space-y-4">
          <div className="flex justify-between items-center">
            <h4 className="font-bold text-[#343E4F] flex items-center gap-1.5"><Building className="w-4 h-4 text-[#E57036]" /> Saved Addresses</h4>
            <button className="text-xs font-bold text-[#E57036] flex items-center gap-1 hover:underline"><Plus className="w-3.5 h-3.5" /> Add New</button>
          </div>
          <div className="space-y-3 text-xs">
            <div className="p-3.5 rounded-xl border border-slate-200 space-y-1">
              <p className="font-bold text-[#343E4F]">Primary Warehouse</p>
              <p className="text-slate-500">Bole Sub-city, Woreda 03, House No. 455, Addis Ababa</p>
            </div>
            <div className="p-3.5 rounded-xl border border-slate-200 space-y-1">
              <p className="font-bold text-[#343E4F]">Retail Hub</p>
              <p className="text-slate-500">Mercato, Central Market Block Q, Addis Ababa</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}