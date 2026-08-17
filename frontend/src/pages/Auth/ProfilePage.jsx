import React from "react";
import { User, MapPin, Phone, Mail, ShieldCheck } from "lucide-react";
import Card from "../../components/common/Card";
import { useCart } from "../../context/CartContext";

function ProfilePage() {
  const { userProfile } = useCart();

  return (
    <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8 pt-6 pb-20 space-y-6">
      <Card className="p-6 rounded-3xl space-y-6 border border-slate-200">
        <div className="flex items-center gap-4 border-b border-slate-100 pb-6">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#107C41] text-white text-xl font-bold">
            {userProfile.initials}
          </div>
          <div>
            <h2 className="text-xl font-extrabold text-[#343E4F]">{userProfile.name}</h2>
            <p className="text-xs font-bold text-[#107C41] flex items-center gap-1 mt-0.5">
              <ShieldCheck size={14} /> {userProfile.role}
            </p>
          </div>
        </div>

        <div className="space-y-4 text-xs sm:text-sm">
          <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
            <Phone size={18} className="text-slate-400" />
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase block">Phone</span>
              <span className="font-bold text-[#343E4F]">{userProfile.phone}</span>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
            <MapPin size={18} className="text-slate-400" />
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase block">Address</span>
              <span className="font-bold text-[#343E4F]">
                {userProfile.city}, {userProfile.subCity}, {userProfile.woreda}, {userProfile.houseNo}
              </span>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}

export default ProfilePage;
