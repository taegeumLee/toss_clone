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
  const [isLoading, setIsLoading] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [isNicknameValid, setIsNicknameValid] = useState(false);
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

  const handleEmailValidation = async (email: string) => {
    const result = validateEmail(email);
    if (!result.success) {
      setEmailError(result.error || "");
      setEmailCheck(false);
      return;
    }

    try {
      const response = await fetch("/api/auth/register/check", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        setEmailError(data.error);
        setEmailCheck(false);
        return;
      }

      setEmailError("");
      setEmailCheck(true);
    } catch (error) {
      setEmailError("이메일 중복 검사 중 오류가 발생했습니다.");
      setEmailCheck(false);
    }
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

  const handleNicknameValidation = async (nickname: string) => {
    const result = validateNickname(nickname);
    if (!result.success) {
      setNicknameError(result.error || "");
      setIsNicknameValid(false);
      return false;
    }

    try {
      const response = await fetch("/api/auth/check", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ nickname }),
      });

      const data = await response.json();

      if (!response.ok) {
        setNicknameError(data.error);
        setIsNicknameValid(false);
        return false;
      }

      setNicknameError("");
      setIsNicknameValid(true);
      return true;
    } catch (error) {
      setNicknameError("닉네임 중복 검사 중 오류가 발생했습니다.");
      setIsNicknameValid(false);
      return false;
    }
  };

  const handleSubmit = async () => {
    if (!name || birth.length !== 6 || !nickname) return;

    const isValidNickname = await handleNicknameValidation(nickname);
    if (!isValidNickname) return;

    setIsLoading(true);
    setSubmitError("");

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          name,
          birth,
          nickname,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "회원가입 중 오류가 발생했습니다.");
      }

      window.location.href = "/home";
    } catch (err) {
      setSubmitError(
        err instanceof Error ? err.message : "오류가 발생했습니다."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center relative items-center h-screen bg-gradient-to-bl from-blue-950 to-#272B38">
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
                  onClick={async () =>
                    emailCheck
                      ? verificationCodeCheck
                        ? setStep(2)
                        : handleVerificationCodeValidation(verificationCode)
                      : await handleEmailValidation(email)
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
                  onChange={(e) => {
                    const numbers = e.target.value.replace(/[^0-9]/g, "");
                    if (numbers.length <= 6) {
                      setBirth(numbers);
                    }
                  }}
                  error={birthError}
                  onBlur={() => handleBirthValidation(birth)}
                  maxLength={14}
                />
                <Input
                  type="text"
                  placeholder="닉네임"
                  value={nickname}
                  onChange={(e) => setNickname(e.target.value)}
                  error={nicknameError}
                  onBlur={() => handleNicknameValidation(nickname)}
                  required
                />
                <Button
                  disabled={
                    !name ||
                    birth.length !== 6 ||
                    !nickname ||
                    !isNicknameValid ||
                    isLoading
                  }
                  onClick={handleSubmit}
                  isLoading={isLoading}
                  loadingText="가입 중..."
                >
                  가입하기
                </Button>
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}
