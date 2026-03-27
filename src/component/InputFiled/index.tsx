import React from "react";

interface InputFieldProps {
  label?: string; // ✅ optional
  name?: string;
  type?: string;
  value: string;
  placeholder?: string; // already optional
  required?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  name,
  type = "text",
  value,
  placeholder,
  onChange,
  required = false,
  disabled = false,
  readOnly = false,
}) => {
  return (
    <div>
      {/* ✅ Label only if exists */}
      {label && (
        <label className="block text-sm font-semibold mb-1 text-[#042954]">
          {label}
        </label>
      )}

      <input
        type={type}
        name={name}
        value={value}
        placeholder={placeholder || ""} // ✅ safe
        onChange={onChange}
        required={required}
        disabled={disabled}
        readOnly={readOnly}
        className={`w-full rounded-md px-3 py-2 text-[#042954] border border-[#ffa601] bg-white outline-none transition
        focus:ring-2 focus:ring-[#ffa601] focus:border-[#ffa601]
        placeholder:text-[#042954]/60
        ${disabled ? "bg-gray-100 cursor-not-allowed opacity-70" : ""}`}
      />
    </div>
  );
};

export default InputField;