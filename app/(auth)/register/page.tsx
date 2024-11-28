"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import Image from "next/image";
import tossLogo from "@/public/image/logo/Toss_Symbol_Primary.png";
import Input from "@/components/input";
import Button from "@/components/button";
import {
  validateEmail,
  validateVerificationCode,
  validateName,
  validateBirth,
  validateNickname,
} from "./action";

export default function Register() {
  const [step, setStep] = useState(1);
  const [name, setName] = useState("");
  const [birth, setBirth] = useState("");
  const [email, setEmail] = useState("");
  const [emailCheck, setEmailCheck] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");
  const [verificationCodeCheck, setVerificationCodeCheck] = useState(false);
  const [emailError, setEmailError] = useState<string>("");
  const [verificationCodeError, setVerificationCodeError] =
    useState<string>("");
  const [nickname, setNickname] = useState("");
  const [nameError, setNameError] = useState("");
  const [birthError, setBirthError] = useState("");
  const [nicknameError, setNicknameError] = useState("");
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  const handleEmailValidation = (email: string) => {
    const result = validateEmail(email);
    setEmailError(result.error || "");
    setEmailCheck(result.success);
  };

  const handleVerificationCodeValidation = (code: string) => {
    const result = validateVerificationCode(code);
    setVerificationCodeCheck(result.success);
    setVerificationCodeError(result.error || "");
  };

  const handleNameValidation = (name: string) => {
    const result = validateName(name);
    setNameError(result.error || "");
    return result.success;
  };

  const handleBirthValidation = (birth: string) => {
    const result = validateBirth(birth);
    setBirthError(result.error || "");
    return result.success;
  };

  const handleNicknameValidation = (nickname: string) => {
    const result = validateNickname(nickname);
    setNicknameError(result.error || "");
    return result.success;
  };

  return (
    <div className="flex justify-center relative items-center h-screen bg-gradient-to-bl from-blue-950 to-#272B38">
      <div className="absolute top-4 left-10 flex items-center gap-2">
        <Image src={tossLogo} alt="toss" width={30} height={30} />
        <span className="text-white text-lg font-extrabold">토스증권</span>
      </div>

      <motion.div
        className="max-w-screen-lg flex flex-col gap-4"
        initial="hidden"
        animate="show"
        variants={container}
      >
        <motion.h1
          className="text-2xl font-bold text-center mb-4"
          variants={item}
        >
          토스증권 시작하기
        </motion.h1>

        <motion.div
          className="bg-slate-950 rounded-lg p-6 mt-4 w-[400px]"
          variants={item}
        >
          <motion.div className="flex flex-col gap-4">
            {step === 1 && (
              <motion.div variants={item} className="flex flex-col gap-2">
                <motion.div variants={item} className="flex flex-col gap-1">
                  <Input
                    type="email"
                    placeholder="이메일"
                    disabled={emailCheck}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    error={emailError}
                    className="disabled:text-gray-500 disabled:cursor-not-allowed disabled:hover:border-slate-800"
                  />
                  {emailCheck && (
                    <Input
                      type="text"
                      placeholder="인증코드"
                      value={verificationCode}
                      error={verificationCodeError}
                      onChange={(e) => setVerificationCode(e.target.value)}
                    />
                  )}
                </motion.div>
                <Button
                  variants={item}
                  onClick={() =>
                    emailCheck
                      ? verificationCodeCheck
                        ? setStep(2)
                        : handleVerificationCodeValidation(verificationCode)
                      : handleEmailValidation(email)
                  }
                  disabled={!email}
                >
                  {!emailCheck ? "인증코드 받기" : "인증코드 확인"}
                </Button>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div variants={item} className="flex flex-col gap-4">
                <Input
                  type="text"
                  placeholder="이름"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  error={nameError}
                  onBlur={() => handleNameValidation(name)}
                />
                <Input
                  type="text"
                  placeholder="생년월일 6자리"
                  value={birth}
                  onChange={(e) => setBirth(e.target.value)}
                  error={birthError}
                  onBlur={() => handleBirthValidation(birth)}
                />
                <Input
                  type="text"
                  placeholder="닉네임 (선택사항)"
                  value={nickname}
                  onChange={(e) => setNickname(e.target.value)}
                  error={nicknameError}
                  onBlur={() => handleNicknameValidation(nickname)}
                />
                <Button disabled={!name || birth.length !== 6}>가입하기</Button>
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}
