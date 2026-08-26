import React from 'react';

export default function Notifications() {
  const notificationsList = [
    { id: 1, title: "Order Dispatched", desc: "Your order #AG-88219 is now out for delivery with local transport provider.", time: "10 mins ago", unread: true, type: "delivery" },
    { id: 2, title: "AI Price Alert", desc: "Teff market prices have surged by 8% in your region this week. Tap to view market insights.", time: "2 hours ago", unread: true, type: "ai" },
    { id: 3, title: "Payment Successful", desc: "1,450 ETB payment for Fertilizer Order #AG-88102 was verified successfully.", time: "Yesterday", unread: false, type: "payment" },
  ];

  return (
    <div className="min-h-screen bg-slate-50 pb-24 font-sans text-slate-800">
      <header className="flex items-center justify-between bg-white px-4 py-3 shadow-sm border-b border-slate-100">
        <h1 className="text-base font-bold text-[#343E4F]">Notifications</h1>
        <button className="text-xs font-semibold text-[#E57036] hover:underline">Mark all as read</button>
      </header>

      <main className="p-4 space-y-3">
        {notificationsList.map((item) => (
          <div key={item.id} className={`rounded-2xl p-4 shadow-sm border transition-all ${item.unread ? 'bg-[#E57036]/5 border-[#E57036]/30' : 'bg-white border-slate-100'}`}>
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-start gap-3">
                <span className="rounded-xl bg-[#E57036]/10 p-2.5 text-[#E57036] text-sm font-mono">
                  {item.type === 'delivery' ? 'local_shipping' : item.type === 'ai' ? 'psychology' : 'payments'}
                </span>
                <div>
                  <h3 className="text-xs font-bold text-[#343E4F]">{item.title}</h3>
                  <p className="text-xs text-slate-600 mt-1">{item.desc}</p>
                  <span className="text-[10px] text-slate-400 mt-2 block">{item.time}</span>
                </div>
              </div>
              {item.unread && <span className="h-2 w-2 rounded-full bg-[#E57036] mt-1"></span>}
            </div>
          </div>
        ))}
      </main>
    </div>
  );
}