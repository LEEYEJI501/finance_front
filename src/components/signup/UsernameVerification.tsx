import React from "react";
import { Input, Button } from "@/components";
import { fetchCheckUsername } from "@/services/users";

type UsernameVerificationProps = {
  username: string;
  setUsername: React.Dispatch<React.SetStateAction<string>>;
  isDuplicate: boolean | null;
  setIsDuplicate: React.Dispatch<React.SetStateAction<boolean | null>>;
};

const UsernameVerification: React.FC<UsernameVerificationProps> = ({
  username,
  setUsername,
  isDuplicate,
  setIsDuplicate,
}) => {
  const handleCheckClick = async () => {
    const isDuplicate = await fetchCheckUsername(username);
    setIsDuplicate(isDuplicate);
  };

  return (
    <div className="mb-6">
      <label className="block text-gray-700 mb-2">
        아이디 <span className="text-red-500">*</span>
      </label>
      <div className="flex">
        <Input
          type="text"
          placeholder="아이디 입력"
          className={`mr-2 ${isDuplicate === false ? "border-green-500" : ""}`}
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <Button
          type="button"
          color="slate"
          size="small"
          className="text-white px-4 rounded-r text-xs"
          onClick={handleCheckClick}
        >
          중복 확인
        </Button>
      </div>
    </div>
  );
};

export default UsernameVerification;
