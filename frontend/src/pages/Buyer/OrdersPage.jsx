import React from "react";
import { Link } from "react-router-dom";
import { Package, Truck, CheckCircle2, Clock, ChevronRight } from "lucide-react";
import Card from "../../components/common/Card";
import { useCart } from "../../context/CartContext";

function OrdersPage() {
  const { activeOrders } = useCart();

  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-6 pb-20 space-y-6">
      <div className="space-y-1">
        <h1 className="text-2xl sm:text-3xl font-black text-[#343E4F]">Your Active Orders</h1>
        <p className="text-xs sm:text-sm text-slate-500 font-medium">
          Track real-time logistics and farm dispatch for your Ethiopian agricultural orders.
        </p>
      </div>

      <div className="space-y-4">
        {activeOrders.map((order) => (
          <Card key={order.id} className="p-5 rounded-3xl space-y-4 border border-slate-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <span className="text-xs font-bold text-slate-400 block">ORDER ID</span>
                <span className="text-base font-extrabold text-[#343E4F]">{order.id}</span>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-bold ${order.statusColor}`}>
                {order.status}
              </span>
            </div>

            <div className="flex items-center gap-4">
              <div className="p-3 rounded-2xl bg-emerald-100 text-[#107C41]">
                <Package size={24} />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-extrabold text-sm text-[#343E4F] truncate">{order.product}</h4>
                <p className="text-xs text-slate-500 font-medium">Coop / Farmer: {order.farmer}</p>
                <span className="text-xs font-bold text-slate-400 block mt-0.5">{order.date}</span>
              </div>
              <div className="text-right">
                <span className="text-xs text-slate-400 block font-medium">Total Price</span>
                <span className="text-base font-extrabold text-[#107C41]">{order.total}</span>
              </div>
            </div>

            {/* Timeline Progress Tracker */}
            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-slate-500">
              <div className="flex items-center gap-1.5 text-[#107C41]">
                <CheckCircle2 size={14} /> Order Placed
              </div>
              <div className="h-0.5 flex-1 mx-2 bg-emerald-300"></div>
              <div className={`flex items-center gap-1.5 ${order.status === "In Transit" ? "text-[#107C41]" : "text-amber-600"}`}>
                <Truck size={14} /> Dispatching
              </div>
              <div className="h-0.5 flex-1 mx-2 bg-slate-200"></div>
              <div className="flex items-center gap-1.5 text-slate-400">
                <Clock size={14} /> Delivery
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default OrdersPage;
