import React from "react";

function Button({
  children,
  variant = "orange",
  size = "md",
  className = "",
  type = "button",
  onClick,
  disabled = false,
  icon: Icon,
  fullWidth = false,
  ...props
}) {
  const baseStyles =
    "inline-flex items-center justify-center font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer active:scale-[0.99]";

  const variants = {
    orange:
      "bg-[#E57036] hover:bg-[#D45D22] text-white shadow-md shadow-[#E57036]/20 focus:ring-[#E57036]",
    navy:
      "bg-[#343E4F] hover:bg-[#2A3241] text-white shadow-md shadow-[#343E4F]/20 focus:ring-[#343E4F]",
    green:
      "bg-[#107C41] hover:bg-[#0B6132] text-white shadow-md shadow-[#107C41]/20 focus:ring-[#107C41]",
    outline:
      "border-2 border-[#343E4F] text-[#343E4F] hover:bg-[#343E4F] hover:text-white bg-transparent focus:ring-[#343E4F]",
    outlineOrange:
      "border-2 border-[#E57036] text-[#E57036] hover:bg-[#E57036] hover:text-white bg-transparent focus:ring-[#E57036]",
    ghost:
      "bg-transparent text-[#343E4F] hover:bg-slate-100 focus:ring-slate-400",
    light:
      "bg-slate-100 text-[#343E4F] hover:bg-slate-200 focus:ring-slate-300"
  };

  const sizes = {
    sm: "px-3 py-1.5 text-xs rounded-lg gap-1.5",
    md: "px-5 py-2.5 text-sm rounded-xl gap-2",
    lg: "px-6 py-3.5 text-base rounded-2xl gap-2.5 font-bold"
  };

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${
        fullWidth ? "w-full" : ""
      } ${className}`}
      {...props}
    >
      {Icon && <Icon className="h-4 w-4 shrink-0" />}
      {children}
    </button>
  );
}

export default Button;
