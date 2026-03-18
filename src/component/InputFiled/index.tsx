import React from "react";

interface InputFieldProps {
  label: string;
  name: string;
  type?: string;
  value: string;
  placeholder?: string;
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
  placeholder = "",
  onChange,
  required = false,
  disabled = false,
  readOnly = false,
}) => {
  return (
    <div>
      <label className="block text-sm font-medium mb-1">
        {label}
      </label>

      <input
        type={type}
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        required={required}
        disabled={disabled}
        readOnly={readOnly}
        className={`w-full border rounded px-3 py-2 
        ${disabled ? "bg-gray-100 cursor-not-allowed" : ""}`}
      />
    </div>
  );
};

export default InputField;