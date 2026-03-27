import React from "react";

interface TextAreaFieldProps {
  label: string;
  name: string;
  value: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  rows?: number;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const TextAreaField: React.FC<TextAreaFieldProps> = ({
  label,
  name,
  value,
  placeholder = "",
  onChange,
  required = false,
  disabled = false,
  readOnly = false,
  rows = 3,
}) => {
  return (
    <div>
      <label className="block text-sm font-semibold mb-1 text-[#042954]">
        {label}
      </label>

      <textarea
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        required={required}
        disabled={disabled}
        readOnly={readOnly}
        rows={rows}
        className={`w-full rounded-md px-3 py-2 text-[#042954] border border-[#ffa601] bg-white outline-none transition
        focus:ring-2 focus:ring-[#ffa601] focus:border-[#ffa601]
        placeholder:text-[#042954]/60
        ${disabled ? "bg-gray-100 cursor-not-allowed opacity-70" : ""}`}
      />
    </div>
  );
};

export default TextAreaField;
