import React, { useState } from 'react';
import { Button, Input } from '../components';
import { fetchCheckUsername, fetchSignUp } from '@/services/users';
import EmailVerification from '@/components/signup/EmailVerification';

const SignupPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [email, setEmail] = useState('');
  const [isDuplicate, setIsDuplicate] = useState<boolean | null>(null);
  const [isPasswordMatch, setIsPasswordMatch] = useState<boolean | null>(null);
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const handleCheckClick = async () => {
    const response = await fetchCheckUsername(username);
    setIsDuplicate(response.isDuplicate);
  };

  const handlePasswordConfirmChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.value;
    setPasswordConfirm(value);
    setIsPasswordMatch(value === password);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setProfileImage(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleImageClick = () => {
    document.getElementById('profileImage')?.click();
  };

  const handleSignUp = async () => {
    if (password.length < 8) {
      alert('비밀번호는 최소 8자 이상이어야 합니다.');
      return;
    }

    const formData = new FormData();
    formData.append('username', username);
    formData.append('password', password);
    formData.append('email', email);

    if (profileImage !== null) {
      formData.append('profileImage', profileImage);
    } else {
      const defaultImageResponse = await fetch('/default-profile.png');
      const defaultImageBlob = await defaultImageResponse.blob();
      const defaultImageFile = new File(
        [defaultImageBlob],
        'default-profile.png',
        {
          type: defaultImageBlob.type,
        }
      );

      formData.append('profileImage', defaultImageFile);
    }

    console.log('sign up button click', formData);
    console.log(username, password, email);

    await fetchSignUp(username, password, email, profileImage!);
  };

  const isFormValid =
    username !== '' &&
    password !== '' &&
    passwordConfirm !== '' &&
    email !== '' &&
    isPasswordMatch &&
    isDuplicate === false;

  return (
    <div className="min-h-screen flex items-center justify-center w-full">
      <div className="p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold mb-10 text-center">Sign Up</h1>

        <div className="mb-6 flex flex-col items-center relative">
          <div className="relative">
            <img
              src={previewImage || '/default-profile.png'}
              alt="Profile Preview"
              className="w-24 h-24 object-cover rounded-full cursor-pointer"
              onClick={handleImageClick}
            />
            <input
              type="file"
              id="profileImage"
              accept="image/*"
              className="hidden"
              onChange={handleImageChange}
            />
          </div>
        </div>

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
                  isDuplicate ? 'text-red-500' : 'text-green-500'
                }`}
              >
                {isDuplicate ? '✕' : '◯'}
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

        <div className="mb-6">
          <label className="block text-gray-700 mb-2">
            비밀번호 <span className="text-red-500">*</span>
          </label>
          <Input
            type="password"
            placeholder="비밀번호 입력(문자, 숫자, 특수문자 포함 8~20자)"
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
                  isPasswordMatch ? 'text-green-500' : 'text-red-500'
                }`}
              >
                {isPasswordMatch ? '◯' : '✕'}
              </span>
            )}
          </div>
        </div>

        <EmailVerification email={email} setEmail={setEmail} />

        <div className="flex justify-between">
          <Button
            type="submit"
            size="medium"
            purpose="primary"
            color="sky"
            className="w-full font-bold"
            disabled={!isFormValid}
            onClick={handleSignUp}
          >
            가입 완료
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
