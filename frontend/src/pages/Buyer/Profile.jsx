import React from 'react';

export default function Profile() {
  return (
    <div className="min-h-screen bg-slate-50 pb-24 font-sans text-slate-800">
      {/* Top Header */}
      <header className="flex items-center justify-between bg-white px-4 py-3 shadow-sm border-b border-slate-100">
        <button className="text-sm font-medium text-slate-700">menu</button>
        <h1 className="text-sm font-bold text-[#343E4F]">D-Agro Market AI</h1>
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-700">notifications</span>
          <div className="h-7 w-7 rounded-full overflow-hidden bg-[#343E4F]/10 border border-[#343E4F]">
            <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100" alt="Profile" className="h-full w-full object-cover" />
          </div>
        </div>
      </header>

      <main className="p-4 space-y-4">
        <div>
          <h2 className="text-xl font-black text-[#343E4F]">Profile & Account</h2>
          <p className="text-xs text-slate-600">Manage your account settings and preferences.</p>
        </div>

        {/* Switch Role Button */}
        <button className="w-full flex items-center justify-center gap-2 rounded-xl bg-[#343E4F] py-3 text-xs font-bold text-white shadow-sm hover:bg-[#343E4F]/90 transition-colors">
          <span>swap_horiz</span> Switch to Farmer
        </button>

        {/* User Card Container */}
        <div className="rounded-2xl bg-white p-5 shadow-sm border border-slate-100 space-y-4">
          <div className="flex flex-col items-center text-center">
            <div className="relative h-24 w-24 rounded-2xl overflow-hidden border-2 border-[#E57036] shadow-sm">
              <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300" alt="Selamawit Kebede" className="h-full w-full object-cover" />
              <div className="absolute bottom-1 right-1 bg-[#E57036] p-1 rounded-full text-white text-[10px]">photo_camera</div>
            </div>
            <span className="mt-2 rounded-full bg-[#E57036] px-3 py-0.5 text-[10px] font-bold text-white">Verified Buyer</span>
          </div>

          <div className="space-y-3 pt-2 text-sm">
            <div>
              <p className="text-[10px] font-bold tracking-wider text-slate-400 uppercase">Full Name</p>
              <p className="font-bold text-[#343E4F]">Selamawit Kebede</p>
            </div>
            <div>
              <p className="text-[10px] font-bold tracking-wider text-slate-400 uppercase">Email Address</p>
              <p className="font-bold text-[#343E4F]">selam.k@d-agro.com</p>
            </div>
            <div>
              <p className="text-[10px] font-bold tracking-wider text-slate-400 uppercase">Phone Number</p>
              <p className="font-bold text-[#343E4F]">+251 911 234 567</p>
            </div>
            <div>
              <p className="text-[10px] font-bold tracking-wider text-slate-400 uppercase">Region</p>
              <p className="font-bold text-[#343E4F]">Addis Ababa, Ethiopia</p>
            </div>
          </div>

          <button className="w-full pt-2 text-center text-xs font-bold text-[#E57036] hover:underline">
            Edit Basic Information
          </button>
        </div>
      </main>
    </div>
  );
}