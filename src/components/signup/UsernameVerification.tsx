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
    const response = await fetchCheckUsername(username);
    console.log("API Response:", response);
    setIsDuplicate(response.isDuplicate);
    console.log("isDuplicate Updated:", response.isDuplicate);
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
          className="mr-2"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        {isDuplicate !== null && (
          <span
            className={`text-lg font-bold ml-2 ${
              isDuplicate ? "text-red-500" : "text-green-500"
            }`}
          >
            {isDuplicate ? "✕" : "◯"}
          </span>
        )}
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
