import React from "react";

interface Option {
  label: string;
  value: string;
}

interface SelectFieldProps {
  label?: string;
  name?: string;
  value: string;
  options: Option[];
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const SelectField: React.FC<SelectFieldProps> = ({
  label,
  name,
  value,
  options,
  onChange,
}) => {
  return (
    <div>
      <label className="block text-sm font-semibold mb-1 text-[#042954]">
        {label}
      </label>

      <select
        name={name}
        value={value}
        onChange={onChange}
        className="w-full rounded-md px-3 py-2 text-[#042954] border border-[#ffa601] bg-white outline-none transition
        focus:ring-2 focus:ring-[#ffa601] focus:border-[#ffa601]"
      >
        {options.map((option, index) => (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectField;