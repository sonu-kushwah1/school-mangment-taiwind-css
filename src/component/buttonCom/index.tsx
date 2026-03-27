import React from "react";

interface ButtonProps {
  text: string;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  full?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  text,
  type = "button",
  onClick,
  full = false,
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`${
        full ? "w-full" : ""
      } bg-[#ffa601] text-white px-4 py-2 rounded
      transition-all duration-300
      hover:bg-[#e59200] hover:shadow-lg hover:scale-[1.02]
      active:scale-[0.98] active:shadow-sm`}
    >
      {text}
    </button>
  );
};

export default Button;