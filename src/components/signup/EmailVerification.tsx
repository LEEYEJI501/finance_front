import React, { useState } from "react";
import { fetchEmailSend, fetchEmailVerify } from "@/services/email";
import CountDown from "@/components/common/CountDown";
import Button from "../common/Button";
import Input from "../common/Input";

type EmailVerificationProps = {
  email: string;
  setEmail: (email: string) => void;
  onEmailChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isEmailValid: boolean;
};

const EmailVerification: React.FC<EmailVerificationProps> = ({
  email,
  setEmail,
  onEmailChange,
  isEmailValid,
}) => {
  const [isCountCompleted, setIsCountCompleted] = useState(true);
  const [countHide, setCountHide] = useState(true);
  const [isVerificationSent, setIsVerificationSent] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");
  const [isCodeValid, setIsCodeValid] = useState<boolean | null>(null);
  const [emailDisabled, setEmailDisabled] = useState(false);

  const handleComplete = () => {
    setIsCountCompleted(true);
    setCountHide(true);
  };

  const handleEmailSend = async () => {
    const response = await fetchEmailSend(email);

    if (response) {
      setIsCountCompleted(false);
      setCountHide(false);
      setIsVerificationSent(true);
      setEmailDisabled(true);
    }
  };

  const handleCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVerificationCode(e.target.value);
  };

  const handleCodeVerify = async () => {
    try {
      const response = await fetchEmailVerify(email, verificationCode);
      if (response && response.isValid) {
        setIsCodeValid(true);
      } else {
        setIsCodeValid(false);
      }
    } catch (error) {
      setIsCodeValid(false);
    }
  };

  return (
    <div className="mb-6">
      <label className="block text-gray-700 mb-2">
        이메일 주소 <span className="text-red-500">*</span>
      </label>
      <div className="flex">
        <Input
          type="text"
          placeholder="이메일 주소"
          className="mr-2"
          value={email}
          onChange={onEmailChange}
          disabled={emailDisabled}
        />
        <CountDown
          className="my-auto mr-1"
          initialTime="3:00"
          color="blue"
          hide={countHide}
          onComplete={handleComplete}
        />
        <Button
          type="button"
          color="slate"
          size="small"
          className="text-white px-4 rounded-r text-xs"
          disabled={!isCountCompleted || !isEmailValid}
          onClick={handleEmailSend}
        >
          메일 인증
        </Button>
      </div>

      {isVerificationSent && (
        <div className="mt-4">
          <label className="block text-gray-700 mb-2">
            인증번호 <span className="text-red-500">*</span>
          </label>
          <div className="flex">
            <Input
              type="text"
              placeholder="인증번호 입력"
              className="mr-2"
              value={verificationCode}
              onChange={handleCodeChange}
            />
            <Button
              type="button"
              color="slate"
              size="small"
              className="text-white px-4 rounded-r text-xs"
              onClick={handleCodeVerify}
            >
              인증 확인
            </Button>
          </div>
          {isCodeValid === false && (
            <p className="text-red-500 mt-2">인증번호가 올바르지 않습니다.</p>
          )}
          {isCodeValid === true && (
            <p className="text-green-500 mt-2">인증이 완료되었습니다.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default EmailVerification;
