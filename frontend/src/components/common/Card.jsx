import React from "react";

function Card({ children, className = "", onClick, hoverable = false, ...props }) {
  return (
    <div
      onClick={onClick}
      className={`rounded-2xl bg-white p-5 border border-slate-200/80 card-shadow ${
        hoverable ? "card-shadow-hover cursor-pointer" : ""
      } ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

export default Card;
