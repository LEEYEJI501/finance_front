import React from 'react';

type Option = {
  label: string;
  value: string;
};

type SelectBoxProps = {
  options: Option[];
  selectedValue: string;
  onChange: (value: string) => void;
  label?: string; 
};

const SelectBox: React.FC<SelectBoxProps> = ({ options, selectedValue, onChange, label }) => {
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(event.target.value);
  };

  return (
    <div className="flex flex-col">
      {label && <label className="mb-2 text-sm text-gray-700">{label}</label>}
      <select
        value={selectedValue}
        onChange={handleChange}
        className="p-2 border border-gray-300 rounded-md focus:outline-none focus:border-green-500"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectBox;
