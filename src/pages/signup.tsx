import React, { useState, useEffect } from "react";
import { Button } from "../components";
import { fetchSignUp } from "@/services/users";
import EmailVerification from "@/components/signup/EmailVerification";
import UsernameVerification from "@/components/signup/UsernameVerification";
import PasswordVerification from "@/components/signup/PasswordVerification";
import { Tooltip } from "@/components/index";
import { useRouter } from "next/router";

const SignupPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [email, setEmail] = useState("");
  const [isDuplicate, setIsDuplicate] = useState<boolean | null>(null);
  const [isPasswordMatch, setIsPasswordMatch] = useState<boolean | null>(null);
  const [isPasswordValid, setIsPasswordValid] = useState<boolean | null>(null);
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [isImageSelected, setIsImageSelected] = useState<boolean>(false);
  const [isFormValid, setIsFormValid] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    setIsFormValid(
      username !== "" &&
        password !== "" &&
        passwordConfirm !== "" &&
        email !== "" &&
        isPasswordMatch === true &&
        isPasswordValid === true &&
        isDuplicate === false &&
        isImageSelected === true
    );
  }, [
    username,
    password,
    passwordConfirm,
    email,
    isPasswordMatch,
    isPasswordValid,
    isDuplicate,
    isImageSelected,
  ]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setProfileImage(file);
      setPreviewImage(URL.createObjectURL(file));
      setIsImageSelected(true);
    }
  };

  const handleImageClick = () => {
    document.getElementById("profileImage")?.click();
  };

  const handleSignUp = async () => {
    const { success } = await fetchSignUp(username, password, email, profileImage!);
  
    if (success) {
      router.push("/login");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center w-full">
      <div className="p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold mb-10 text-center">Sign Up</h1>

        <div className="mb-6 flex flex-col items-center relative">
          <Tooltip message="프로필 사진 업로드" position="bottom">
            <div className="relative">
              <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-yellow-500 via-pink-500 to-purple-500 p-1">
                <img
                  src={previewImage || "/default-profile.png"}
                  alt="Profile Preview"
                  className="w-full h-full object-cover rounded-full"
                  onClick={handleImageClick}
                />
              </div>
              <input
                type="file"
                id="profileImage"
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
              />
            </div>
          </Tooltip>
        </div>

        <UsernameVerification
          username={username}
          setUsername={setUsername}
          isDuplicate={isDuplicate}
          setIsDuplicate={setIsDuplicate}
        />

        <PasswordVerification
          password={password}
          setPassword={setPassword}
          passwordConfirm={passwordConfirm}
          setPasswordConfirm={setPasswordConfirm}
          isPasswordMatch={isPasswordMatch}
          setIsPasswordMatch={setIsPasswordMatch}
          isPasswordValid={isPasswordValid}
          setIsPasswordValid={setIsPasswordValid}
        />

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
