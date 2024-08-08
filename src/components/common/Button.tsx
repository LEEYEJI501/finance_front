import React from 'react';

type ButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  size?: 'small' | 'medium' | 'large';
  color?: 'blue' | 'green' | 'red' | 'slate';
  purpose?: 'primary' | 'secondary';
  className?: string;
};

const sizeClasses = {
  small: 'text-sm px-2 py-1',
  medium: 'text-md px-4 py-2',
  large: 'text-lg px-6 py-3',
};

const colorClasses = {
  blue: 'bg-blue-500 hover:bg-blue-700 text-white',
  green: 'bg-green-500 hover:bg-green-700 text-white',
  red: 'bg-red-500 hover:bg-red-700 text-white',
  slate: 'bg-slate-500	hover:bg-slate-700 text-white',
};

const purposeClasses = {
  primary: '',
  secondary: 'bg-gray-500 hover:bg-gray-700 text-white',
};

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  type = 'button',
  size = 'medium',
  color = 'blue',
  purpose = 'primary',
  className = '',
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`rounded ${sizeClasses[size]} ${colorClasses[color]} ${purposeClasses[purpose]} ${className} focus:outline-none`}
    >
      {children}
    </button>
  );
};

export default Button;
