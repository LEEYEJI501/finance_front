import React from "react";

type CardProps = {
  title: string;
  subtitle?: string;
  icon?: React.ReactNode;
  badgeText?: string;
  badgeColor?: "blue" | "green" | "red" | "yellow" | "gray";
  children?: React.ReactNode;
  className?: string;
  onClick?: () => void;
};

const badgeColorClasses = {
  blue: "bg-blue-100 text-blue-800",
  green: "bg-green-100 text-green-800",
  red: "bg-red-100 text-red-800",
  yellow: "bg-yellow-100 text-yellow-800",
  gray: "bg-gray-100 text-gray-800",
};

const Card: React.FC<CardProps> = ({
  title,
  subtitle,
  icon,
  badgeText,
  badgeColor = "gray",
  children,
  className = "",
  onClick,
}) => {
  return (
    <div
      className={`p-4 bg-white rounded-lg shadow hover:shadow-md cursor-pointer flex items-center justify-center ${className}`}
      onClick={onClick}
    >
      <div className="text-center">
        <h2 className="text-md font-semibold">{title}</h2>
        {subtitle && <p className="text-xs text-gray-500">{subtitle}</p>}
        {badgeText && (
          <div
            className={`mt-2 px-3 py-1 rounded-full text-xs font-semibold ${badgeColorClasses[badgeColor]}`}
          >
            {badgeText}
          </div>
        )}
      </div>
    </div>
  );
};

export default Card;
