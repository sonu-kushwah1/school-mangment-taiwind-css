import React from "react";

type Variant = "primary" | "outline";
type Size = "sm" | "md" | "lg";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  variant?: Variant;
  size?: Size;
}

const sizeClasses: Record<Size, string> = {
  sm: "px-3 py-1 text-xs",
  md: "px-4 py-2 text-sm",
  lg: "px-5 py-3 text-base",
};

const Button: React.FC<ButtonProps> = ({
  label,
  variant = "primary",
  size = "md",
  className = "",
  disabled,
  ...rest
}) => {
  const base =
    "inline-flex items-center justify-center rounded-md font-medium transition focus:outline-none focus:ring-2 focus:ring-offset-1";

  const variants: Record<Variant, string> = {
    primary:
      "bg-[#ffa601] text-white hover:bg-[#e59200] focus:ring-[#ffa601]",
    outline:
      "border border-[#ffa601] text-[#042954] bg-white hover:bg-[#ffa601] hover:text-white focus:ring-[#ffa601]",
  };

  const disabledClasses =
    "opacity-60 cursor-not-allowed hover:bg-inherit hover:text-inherit";

  return (
    <button
      className={`${base} ${sizeClasses[size]} ${variants[variant]} ${
        disabled ? disabledClasses : ""
      } ${className}`}
      disabled={disabled}
      {...rest}
    >
      {label}
    </button>
  );
};

export default Button;

