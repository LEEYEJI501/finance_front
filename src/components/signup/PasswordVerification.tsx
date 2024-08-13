import React from "react";
import { Input } from "@/components";

type PasswordVerificationProps = {
  password: string;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  passwordConfirm: string;
  setPasswordConfirm: React.Dispatch<React.SetStateAction<string>>;
  isPasswordMatch: boolean | null;
  setIsPasswordMatch: React.Dispatch<React.SetStateAction<boolean | null>>;
};

const PasswordVerification: React.FC<PasswordVerificationProps> = ({
  password,
  setPassword,
  passwordConfirm,
  setPasswordConfirm,
  isPasswordMatch,
  setIsPasswordMatch,
}) => {
  const handlePasswordConfirmChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.value;
    setPasswordConfirm(value);
    setIsPasswordMatch(value === password);
  };

  return (
    <>
      <div className="mb-6">
        <label className="block text-gray-700 mb-2">
          비밀번호 <span className="text-red-500">*</span>
        </label>
        <Input
          type="password"
          placeholder="비밀번호 입력(8~20자)"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <div className="mb-6">
        <label className="block text-gray-700 mb-2">
          비밀번호 확인 <span className="text-red-500">*</span>
        </label>
        <div className="flex items-center">
          <Input
            type="password"
            placeholder="비밀번호 재입력"
            value={passwordConfirm}
            onChange={handlePasswordConfirmChange}
          />
          {isPasswordMatch !== null && (
            <span
              className={`text-lg font-bold ml-2 ${
                isPasswordMatch ? "text-green-500" : "text-red-500"
              }`}
            >
              {isPasswordMatch ? "◯" : "✕"}
            </span>
          )}
        </div>
      </div>
    </>
  );
};

export default PasswordVerification;
