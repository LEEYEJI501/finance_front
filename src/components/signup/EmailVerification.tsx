import React, { useState } from 'react';
import { fetchEmailSend } from '@/services/email';
import CountDown from '@/components/common/CountDown';
import Button from '../common/Button';
import Input from '../common/Input';

type EmailVerificationProps = {
  email: string;
  setEmail: (email: string) => void;
};

const EmailVerification: React.FC<EmailVerificationProps> = ({ email, setEmail }) => {
  const [isCountCompleted, setIsCountCompleted] = useState(true); 
  const [countHide, setCountHide] = useState(true);

  const handleComplete = () => {
    setIsCountCompleted(true);
    setCountHide(true);
  };

  const handleEmailSend = async () => {
    const response = await fetchEmailSend(email);

    if (response) {
      setIsCountCompleted(false);
      setCountHide(false);
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
          onChange={(e) => setEmail(e.target.value)}
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
          disabled={!isCountCompleted}
          onClick={handleEmailSend}
        >
          메일 인증
        </Button>
      </div>
    </div>
  );
};

export default EmailVerification;
