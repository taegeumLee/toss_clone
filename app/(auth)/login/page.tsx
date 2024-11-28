"use client";

import { motion } from "framer-motion";
import { useState, FormEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import tossLogo from "@/public/image/logo/Toss_Symbol_Primary.png";
import Button from "@/components/button";
import Input from "@/components/input";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [birth, setBirth] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          name,
          birth,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "로그인에 실패했습니다.");
      }

      // 로그인 성공 시 메인 페이지로 이동
      window.location.href = "/";
    } catch (err) {
      setError(err instanceof Error ? err.message : "오류가 발생했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center relative items-center h-screen bg-gradient-to-bl from-blue-950 to-#272B38">
      <div className="absolute top-4 left-10 flex items-center gap-2">
        <Image src={tossLogo} alt="toss" width={30} height={30} />
        <span className="text-white text-lg font-extrabold">토스증권</span>
      </div>
      <motion.div
        className="max-w-screen-lg flex flex-col gap-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.h1
          className="text-2xl font-bold text-center mb-4 text-white"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          토스 앱으로 로그인하기
        </motion.h1>

        <motion.form
          onSubmit={handleSubmit}
          className="bg-slate-950 rounded-lg p-6 mt-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          {error && <div className="text-red-500 text-sm mb-4">{error}</div>}

          <div className="flex flex-col gap-4">
            <div className="flex gap-2">
              <Input
                type="text"
                placeholder="이름"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="bg-slate-950 border-2 border-slate-800 rounded-lg p-3 outline-none hover:border-blue-900 focus:border-blue-600"
              />
              <Input
                type="text"
                placeholder="생년월일 6자리"
                value={birth}
                onChange={(e) => setBirth(e.target.value)}
                className="bg-slate-950 border-2 border-slate-800 rounded-lg p-3 outline-none hover:border-blue-900 focus:border-blue-600"
              />
            </div>
            <Input
              type="email"
              placeholder="이메일"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-slate-950 border-2 border-slate-800 rounded-lg p-3 outline-none hover:border-blue-900 focus:border-blue-600"
            />

            <Button
              type="submit"
              className="bg-blue-600 text-white w-full disabled:hover:scale-100 hover:scale-105 rounded p-3 mt-4 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={!email || !name || !birth || isLoading}
            >
              {isLoading ? "로그인 중..." : "로그인"}
            </Button>

            <div className="flex justify-center gap-2 mt-4 text-sm">
              <Link href="/register" className="text-blue-400 hover:underline">
                아직 토스증권 회원이 아니신가요?
              </Link>
            </div>
          </div>
        </motion.form>
      </motion.div>
    </div>
  );
}
