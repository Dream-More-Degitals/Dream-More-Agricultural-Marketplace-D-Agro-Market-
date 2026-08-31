import React from 'react';
import { Truck, MapPin, Phone, MessageSquare, CheckCircle, Package } from 'lucide-react';

export default function OrderTracking() {
  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-8 font-sans text-slate-800 max-w-7xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <span className="text-xs text-[#E57036] font-bold uppercase tracking-wider">Orders / Order #AO-00212</span>
          <h1 className="text-2xl font-black text-[#343E4F]">Tracking Status</h1>
        </div>
        <span className="rounded-full bg-orange-100 px-4 py-1.5 text-xs font-bold text-[#E57036] flex items-center gap-1.5 shadow-sm">
          <Truck className="w-4 h-4" /> Out for Delivery
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Map and Progress */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 space-y-4">
            <div className="h-64 rounded-xl bg-slate-200 relative overflow-hidden flex items-center justify-center border border-slate-200">
              <div className="absolute inset-0 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:16px_16px] opacity-60"></div>
              <div className="absolute bg-[#343E4F] text-white px-3.5 py-2 rounded-xl text-xs font-bold shadow-lg flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#E57036]" /> Current Distance: 3.2 km away
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 space-y-4">
            <h3 className="font-bold text-[#343E4F]">Delivery Progress</h3>
            <div className="flex items-center justify-between relative">
              <div className="flex flex-col items-center"><div className="w-8 h-8 rounded-full bg-[#E57036] text-white flex items-center justify-center font-bold text-xs"><CheckCircle className="w-4 h-4" /></div><span className="text-[11px] mt-1 font-bold text-slate-600">Order Placed</span></div>
              <div className="flex-1 h-1 bg-[#E57036] mx-2"></div>
              <div className="flex flex-col items-center"><div className="w-8 h-8 rounded-full bg-[#E57036] text-white flex items-center justify-center font-bold text-xs"><CheckCircle className="w-4 h-4" /></div><span className="text-[11px] mt-1 font-bold text-slate-600">Processing</span></div>
              <div className="flex-1 h-1 bg-[#E57036] mx-2"></div>
              <div className="flex flex-col items-center"><div className="w-8 h-8 rounded-full bg-[#E57036] text-white flex items-center justify-center font-bold text-xs"><Truck className="w-4 h-4" /></div><span className="text-[11px] mt-1 font-bold text-[#E57036]">In Transit</span></div>
              <div className="flex-1 h-1 bg-slate-200 mx-2"></div>
              <div className="flex flex-col items-center"><div className="w-8 h-8 rounded-full bg-slate-200 text-slate-400 flex items-center justify-center font-bold text-xs">4</div><span className="text-[11px] mt-1 text-slate-400">Delivered</span></div>
            </div>
          </div>
        </div>

        {/* Delivery Partner & Summary */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 space-y-4">
            <h4 className="font-bold text-[#343E4F]">Your Delivery Partner</h4>
            <div className="flex items-center gap-3">
              <img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100" alt="Driver" className="w-12 h-12 rounded-full object-cover border border-slate-200 shadow-sm" />
              <div>
                <p className="font-bold text-[#343E4F]">Abebe Lema</p>
                <p className="text-xs text-slate-400 flex items-center gap-1">⭐ 4.9 <span className="text-[10px] text-slate-400">(820+ deliveries)</span></p>
              </div>
            </div>
            <div className="bg-slate-50 p-3.5 rounded-xl text-xs space-y-1">
              <p className="text-slate-500">Vehicle: <span className="font-bold text-[#343E4F]">Isuzu NPR</span></p>
              <p className="text-slate-500">License Plate: <span className="font-bold text-[#343E4F]">ET-3-A1224</span></p>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <button className="w-full bg-[#E57036] text-white py-2.5 rounded-xl text-xs font-bold hover:bg-[#E57036]/90 transition-all flex items-center justify-center gap-1.5 shadow-sm"><Phone className="w-3.5 h-3.5" /> Call Abebe</button>
              <button className="w-full bg-slate-100 text-[#343E4F] py-2.5 rounded-xl text-xs font-bold hover:bg-slate-200 transition-all flex items-center justify-center gap-1.5"><MessageSquare className="w-3.5 h-3.5" /> Message</button>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 space-y-3">
            <h4 className="font-bold text-[#343E4F] flex items-center gap-1.5"><Package className="w-4 h-4 text-[#E57036]" /> Order Summary</h4>
            <div className="text-xs space-y-2 divide-y divide-slate-100">
              <div className="flex justify-between pt-1"><span className="text-slate-600">Organic Teff (Grade A) - 500kg</span><span className="font-bold text-[#343E4F]">ETB 40,000</span></div>
              <div className="flex justify-between pt-2"><span className="text-slate-600">Fertilizer (Nitrogen-rich) - 5 Bags</span><span className="font-bold text-[#343E4F]">ETB 5,200</span></div>
            </div>
            <div className="flex justify-between items-center pt-3 border-t border-slate-200 font-bold text-sm text-[#343E4F]">
              <span>Total Amount</span>
              <span className="text-[#E57036]">ETB 45,200</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}