import React from "react";
import { Link } from "react-router-dom";
import { Sparkles, ArrowRight, Truck, Sun } from "lucide-react";
import Card from "../common/Card";
import Badge from "../common/Badge";

function PredictionCard({ type, title, description, actionText = "View Details", badgeText }) {
  const getIcon = () => {
    if (type === "logistics") return Truck;
    if (type === "climate") return Sun;
    return Sparkles;
  };

  const Icon = getIcon();

  const styles = {
    highYield: {
      bg: "bg-[#0B6132] text-white border-none",
      badgeBg: "bg-emerald-700/80 text-emerald-100",
      btnClass: "bg-white text-[#0B6132] hover:bg-slate-100 font-bold",
      titleColor: "text-white",
      descColor: "text-emerald-100"
    },
    logistics: {
      bg: "bg-[#964B00] text-white border-none",
      badgeBg: "bg-amber-800/80 text-amber-100",
      btnClass: "bg-white/20 text-white hover:bg-white/30 font-semibold backdrop-blur-xs",
      titleColor: "text-white",
      descColor: "text-amber-100"
    },
    climate: {
      bg: "bg-[#F9FAF6] text-[#343E4F] border border-amber-200/70",
      badgeBg: "bg-amber-100 text-amber-900",
      btnClass: "text-[#343E4F] hover:bg-amber-100/50 font-semibold",
      titleColor: "text-[#343E4F]",
      descColor: "text-slate-600"
    }
  };

  const currentStyle = styles[type] || styles.highYield;

  return (
    <Card className={`rounded-3xl p-6 relative overflow-hidden transition-transform duration-300 hover:scale-[1.01] ${currentStyle.bg}`}>
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <Badge className={currentStyle.badgeBg} icon={Icon}>
            {badgeText || "AI ADVISOR"}
          </Badge>
        </div>

        <div className="space-y-2">
          <h3 className={`text-xl font-extrabold leading-snug tracking-tight ${currentStyle.titleColor}`}>
            {title}
          </h3>
          <p className={`text-xs sm:text-sm leading-relaxed ${currentStyle.descColor}`}>
            {description}
          </p>
        </div>

        <div className="pt-2">
          <Link to="/ai">
            <button className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs transition duration-200 cursor-pointer ${currentStyle.btnClass}`}>
              <span>{actionText}</span>
              <ArrowRight size={14} />
            </button>
          </Link>
        </div>
      </div>
    </Card>
  );
}

export default PredictionCard;
