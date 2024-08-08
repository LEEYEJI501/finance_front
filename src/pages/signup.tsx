import React from 'react';
import { Button } from '../components';
import { Input } from '../components';

const SignupPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center w-full">
      <div className="p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold mb-10 text-center">Sign Up</h1>

        <div className="mb-6">
          <label className="block text-gray-700 mb-2">
            아이디 <span className="text-red-500">*</span>
          </label>
          <div className="flex">
            <Input
              type="text"
              placeholder="아이디 입력(6~20자)"
              className="mr-2"
            />
            <Button
              type="button"
              color="slate"
              size="small"
              className="text-white px-4 rounded-r text-xs"
            >
              중복 확인
            </Button>
          </div>
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 mb-2">
            비밀번호 <span className="text-red-500">*</span>
          </label>
          <Input
            type="password"
            placeholder="비밀번호 입력 (문자, 숫자, 특수문자 포함 8~20자)"
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 mb-2">
            비밀번호 확인 <span className="text-red-500">*</span>
          </label>
          <Input type="password" placeholder="비밀번호 재입력" />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 mb-2">이메일 주소</label>
          <div className="flex">
            <Input type="text" placeholder="이메일 주소" />
            {/* <span className="p-2 border-t border-b border-gray-300">@</span>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded-r focus:outline-none focus:border-black"
              placeholder="선택"
            /> */}
          </div>
        </div>
        <div className="flex justify-between">
          <Button
            type="submit"
            size="medium"
            purpose="primary"
            color="sky"
            className="w-full font-bold"
          >
            가입 완료
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
