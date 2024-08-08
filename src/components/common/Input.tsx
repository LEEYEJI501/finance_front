import React from 'react';

type InputProps = {
  type: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  className?: string;
  name?: string;
};

const baseClasses =
  'w-full p-2 border-b border-gray-300 focus:outline-none focus:border-black';

const Input: React.FC<InputProps> = ({
  type,
  value,
  onChange,
  placeholder,
  className = '',
  name,
}) => {
  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={`${baseClasses} ${className}`}
      name={name}
    />
  );
};

export default Input;
