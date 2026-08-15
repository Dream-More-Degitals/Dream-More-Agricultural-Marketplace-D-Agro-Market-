import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ChevronLeft,
  Truck,
  CreditCard,
  Sparkles,
  ShieldCheck,
  CheckCircle,
  Smartphone,
  Building2,
  Lock
} from "lucide-react";
import Card from "../../components/common/Card";
import Button from "../../components/common/Button";
import Modal from "../../components/common/Modal";
import { useCart } from "../../context/CartContext";

function CheckoutPage() {
  const navigate = useNavigate();
  const { cart, userProfile, placeOrder, cartSubtotal, vatAmount, totalAmount } = useCart();
  
  const [paymentMethod, setPaymentMethod] = useState("telebirr");
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [placedOrderInfo, setPlacedOrderInfo] = useState(null);

  const displayTotal = totalAmount || 11385;
  const displaySubtotal = cartSubtotal || 9900;
  const displayVat = vatAmount || 1485;

  const handleConfirmOrder = () => {
    const newOrder = placeOrder({ total: displayTotal });
    setPlacedOrderInfo(newOrder);
    setIsSuccessModalOpen(true);
  };

  return (
    <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8 pt-4 pb-20 space-y-6">
      
      {/* Top Header Back Button */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => navigate(-1)}
          className="p-1.5 rounded-full text-[#343E4F] hover:bg-slate-200 transition"
        >
          <ChevronLeft size={20} />
        </button>
        <span className="text-sm font-bold text-[#107C41]">D-Agro Market AI</span>
      </div>

      {/* Page Title */}
      <h1 className="text-2xl sm:text-3xl font-black text-[#343E4F] tracking-tight">
        Complete Your Order
      </h1>

      {/* 1. Shipping Address Card */}
      <Card className="p-5 rounded-3xl space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5 text-[#343E4F] font-extrabold text-base">
            <Truck className="w-5 h-5 text-[#107C41]" />
            <span>Shipping Address</span>
          </div>
          <button className="text-xs font-bold text-[#107C41] hover:underline">
            Change
          </button>
        </div>

        <div className="p-4 rounded-2xl bg-slate-50 border border-dashed border-slate-300 text-xs sm:text-sm space-y-1.5">
          <div className="font-bold text-[#343E4F]">
            Recipient: {userProfile.name}
          </div>
          <div className="text-slate-500 font-medium">
            {userProfile.phone}
          </div>
          <div className="pt-1 text-[#343E4F] font-semibold">
            <span className="text-slate-400 block font-normal">Delivery Location:</span>
            {userProfile.city}, {userProfile.subCity}
          </div>
          <div className="text-slate-500 font-medium">
            {userProfile.woreda}, {userProfile.houseNo}
          </div>
        </div>
      </Card>

      {/* 2. Payment Method Card */}
      <Card className="p-5 rounded-3xl space-y-3">
        <div className="flex items-center gap-2.5 text-[#343E4F] font-extrabold text-base">
          <CreditCard className="w-5 h-5 text-[#107C41]" />
          <span>Payment Method</span>
        </div>

        <div className="space-y-3 pt-1">
          {/* Telebirr Radio Option */}
          <label
            onClick={() => setPaymentMethod("telebirr")}
            className={`flex items-center justify-between p-4 rounded-2xl border-2 transition cursor-pointer ${
              paymentMethod === "telebirr"
                ? "border-[#107C41] bg-[#EBF7F0]/60 ring-2 ring-[#107C41]/20"
                : "border-slate-200 bg-white hover:border-slate-300"
            }`}
          >
            <div className="flex items-center gap-3.5">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white font-bold text-xs shadow-xs">
                telebirr
              </div>
              <div>
                <span className="font-extrabold text-xs sm:text-sm text-[#343E4F] block">
                  Telebirr
                </span>
                <span className="text-[11px] text-slate-500 font-medium">
                  Instant Mobile Payment
                </span>
              </div>
            </div>

            <div
              className={`h-5 w-5 rounded-full border-2 flex items-center justify-center ${
                paymentMethod === "telebirr"
                  ? "border-[#107C41] bg-[#107C41] text-white"
                  : "border-slate-300"
              }`}
            >
              {paymentMethod === "telebirr" && <CheckCircle size={12} />}
            </div>
          </label>

          {/* CBE Birr Radio Option */}
          <label
            onClick={() => setPaymentMethod("cbe")}
            className={`flex items-center justify-between p-4 rounded-2xl border-2 transition cursor-pointer ${
              paymentMethod === "cbe"
                ? "border-[#107C41] bg-[#EBF7F0]/60 ring-2 ring-[#107C41]/20"
                : "border-slate-200 bg-white hover:border-slate-300"
            }`}
          >
            <div className="flex items-center gap-3.5">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-800 text-white font-bold text-xs shadow-xs">
                CBE
              </div>
              <div>
                <span className="font-extrabold text-xs sm:text-sm text-[#343E4F] block">
                  CBE Birr
                </span>
                <span className="text-[11px] text-slate-500 font-medium">
                  Bank Transfer Mobile
                </span>
              </div>
            </div>

            <div
              className={`h-5 w-5 rounded-full border-2 flex items-center justify-center ${
                paymentMethod === "cbe"
                  ? "border-[#107C41] bg-[#107C41] text-white"
                  : "border-slate-300"
              }`}
            >
              {paymentMethod === "cbe" && <CheckCircle size={12} />}
            </div>
          </label>
        </div>
      </Card>

      {/* 3. D-AGRO AI ADVISOR Callout Banner */}
      <div className="rounded-3xl bg-[#F5FAF3] border border-emerald-200/80 p-5 space-y-2">
        <div className="flex items-center gap-2">
          <div className="p-1 rounded bg-[#107C41] text-white">
            <Sparkles size={14} />
          </div>
          <span className="text-xs font-black uppercase tracking-wider text-[#107C41]">
            D-AGRO AI ADVISOR
          </span>
        </div>
        <p className="text-xs sm:text-sm text-emerald-900 leading-relaxed font-medium">
          You are securing a 12% lower price than the Addis Ababa market average for premium teff. We recommend confirming payment now to lock in this wholesale rate before weekend volatility.
        </p>
      </div>

      {/* 4. Order Summary */}
      <Card className="p-5 rounded-3xl space-y-4">
        <h3 className="text-base font-extrabold text-[#343E4F]">Order Summary</h3>

        {/* Item List */}
        <div className="space-y-3 divide-y divide-slate-100">
          {cart.length > 0 ? (
            cart.map((item) => (
              <div key={item.id} className="pt-3 first:pt-0 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="h-12 w-12 rounded-xl object-cover border border-slate-200"
                  />
                  <div>
                    <span className="font-bold text-xs sm:text-sm text-[#343E4F] block">
                      {item.title}
                    </span>
                    <span className="text-[11px] text-slate-500 font-medium">
                      {item.subtitle} • Qty: {item.quantity}
                    </span>
                  </div>
                </div>
                <span className="font-extrabold text-xs sm:text-sm text-[#343E4F]">
                  {(item.price * item.quantity).toLocaleString()} ETB
                </span>
              </div>
            ))
          ) : (
            <>
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-xl bg-amber-100 flex items-center justify-center text-xl">
                    🌾
                  </div>
                  <div>
                    <span className="font-bold text-xs sm:text-sm text-[#343E4F] block">
                      Premium White Teff
                    </span>
                    <span className="text-[11px] text-slate-500 font-medium">
                      50kg Bulk Bag • Qty: 1
                    </span>
                  </div>
                </div>
                <span className="font-extrabold text-xs sm:text-sm text-[#343E4F]">
                  7,500 ETB
                </span>
              </div>

              <div className="pt-3 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-xl bg-emerald-100 flex items-center justify-center text-xl">
                    🧪
                  </div>
                  <div>
                    <span className="font-bold text-xs sm:text-sm text-[#343E4F] block">
                      Organic NPK Fertilizer
                    </span>
                    <span className="text-[11px] text-slate-500 font-medium">
                      25L Liquid • Qty: 2
                    </span>
                  </div>
                </div>
                <span className="font-extrabold text-xs sm:text-sm text-[#343E4F]">
                  2,400 ETB
                </span>
              </div>
            </>
          )}
        </div>

        {/* Financial Totals */}
        <div className="pt-4 border-t border-slate-200 space-y-2 text-xs sm:text-sm">
          <div className="flex justify-between text-slate-500">
            <span>Subtotal</span>
            <span className="font-bold text-[#343E4F]">
              {displaySubtotal.toLocaleString()} ETB
            </span>
          </div>

          <div className="flex justify-between text-slate-500">
            <span>Delivery Fee</span>
            <span className="font-bold text-[#107C41]">FREE</span>
          </div>

          <div className="flex justify-between text-slate-500">
            <span>VAT (15%)</span>
            <span className="font-bold text-[#343E4F]">
              {displayVat.toLocaleString()} ETB
            </span>
          </div>

          <div className="pt-3 border-t border-slate-200 flex justify-between items-baseline">
            <span className="text-base font-extrabold text-[#343E4F]">Total</span>
            <span className="text-2xl font-black text-[#0B6132]">
              {displayTotal.toLocaleString()} ETB
            </span>
          </div>
        </div>

        {/* Action Button */}
        <div className="pt-2 space-y-3">
          <button
            onClick={handleConfirmOrder}
            className="w-full py-4 rounded-2xl bg-[#0B6132] hover:bg-[#084825] text-white font-black text-base flex items-center justify-center gap-2 transition shadow-lg shadow-[#0B6132]/20 cursor-pointer"
          >
            <span>Confirm and Pay</span>
            <Lock size={18} />
          </button>

          <p className="text-[11px] text-center text-slate-400 font-medium">
            By clicking confirm, you agree to our{" "}
            <a href="#terms" className="underline text-slate-600">
              Terms of Service
            </a>
          </p>

          <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-400 font-medium">
            <ShieldCheck size={14} className="text-[#107C41]" />
            <span>SSL Secured Transaction</span>
          </div>
        </div>
      </Card>

      {/* Success Modal */}
      <Modal
        isOpen={isSuccessModalOpen}
        onClose={() => setIsSuccessModalOpen(false)}
        title="Order Successfully Confirmed! 🎉"
      >
        <div className="text-center space-y-4 py-2">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-[#107C41]">
            <CheckCircle size={36} />
          </div>
          <div>
            <h4 className="font-extrabold text-lg text-[#343E4F]">
              Order ID: {placedOrderInfo?.id || "#ORD-9908"}
            </h4>
            <p className="text-xs text-slate-500 mt-1">
              Your payment via {paymentMethod === "telebirr" ? "Telebirr" : "CBE Birr"} was verified. Farmers are preparing your shipment.
            </p>
          </div>
          <Button
            variant="navy"
            fullWidth
            onClick={() => {
              setIsSuccessModalOpen(false);
              navigate("/orders");
            }}
          >
            Track Active Order
          </Button>
        </div>
      </Modal>

    </div>
  );
}

export default CheckoutPage;
