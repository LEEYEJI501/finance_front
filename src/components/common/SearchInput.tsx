import React from "react";
import Input from "./Input";
import Button from "./Button";

type SearchInputProps = {
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSearch: () => void;
  size?: "small" | "medium" | "large";
  color?: "blue" | "green" | "red" | "slate" | "sky" | "none";
  disabled?: boolean;
  className?: string;
  buttonLabel?: string;
};

const sizeClasses = {
  small: "text-sm h-10 px-3", 
  medium: "text-md h-12 px-4",
  large: "text-lg h-14 px-5",  
};

const SearchInput: React.FC<SearchInputProps> = ({
  placeholder = "검색어를 입력하세요.",
  value,
  onChange,
  onSearch,
  size = "medium",
  color = "none",
  disabled = false,
  className = "",
  buttonLabel = "검색",
}) => {
  return (
    <div className={`flex items-center ${className}`}>
      <Input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`flex-grow border rounded-l ${sizeClasses[size]}`}
        disabled={disabled}
      />
      <Button
        onClick={onSearch}
        color="slate"
        disabled={disabled}
        className={`${sizeClasses[size]} rounded-l-none`} 
      >
        {buttonLabel}
      </Button>
    </div>
  );
};

export default SearchInput;
