import React from "react";

export default function Button({
  title,
  variant = "contained",
  color = "primary",
  type="button",
  onClick,
  fullWidth = false,
  disabled,
}) {
  let className = fullWidth? "w-100 rounded ":"pr-2 pl-2 rounded ";
  if (variant === "contained" && !disabled) {
    className += "bg-" + color + " txt-white";
  } else if (variant === "outlined" && !disabled) {
    className += "border-" + color + " txt-" + color;
  }
  if(disabled){
    className+="disabled-btn";
  }
  return <button className={className} type={type} onClick={onClick}>{title}</button>;
}
