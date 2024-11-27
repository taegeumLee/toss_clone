"use client";

import { motion } from "framer-motion";

export default function AuthMain() {
  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-t from-slate-900 to-blue-950">
      <motion.div
        className="max-w-screen-lg flex flex-col gap-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.h1
          className="text-2xl font-bold text-center mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          Login to toss your App
        </motion.h1>
        <div className="flex gap-2">
          <motion.button
            className="bg-slate-900 rounded-md w-full hover:bg-slate-800 p-3"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            이메일로 로그인
          </motion.button>
          <motion.button
            className="bg-slate-900 rounded-md w-full hover:bg-slate-800 p-3"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            구글로 로그인
          </motion.button>
        </div>

        <motion.div
          className="bg-slate-950 rounded-lg p-6 mt-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <div className="flex flex-col gap-4">
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="이름"
                className="bg-slate-950 border-2 border-slate-800 rounded-lg p-3 outline-none  hover:border-blue-900 focus:border-blue-600"
              />
              <input
                type="text"
                placeholder="생년월일 6자리"
                className="bg-slate-950  border-2 border-slate-800 rounded-lg p-3 outline-none hover:border-blue-900 focus:border-blue-600 "
              />
            </div>
            <input
              type="email"
              placeholder="Email"
              className="bg-slate-950 border-2 border-slate-800 rounded-lg p-3 outline-none hover:border-blue-900  focus:border-blue-600"
            />

            <div className="flex flex-col gap-2 mt-2">
              <label className="flex items-center gap-2 text-sm text-gray-300">
                <input type="checkbox" className="rounded" />
                필수 약관에 모두 동의
              </label>
              <label className="flex items-center gap-2 text-sm text-gray-300">
                <input type="checkbox" className="rounded" />
                <span>개인정보 수집·이용 동의</span>
                <motion.span
                  className="ml-auto cursor-pointer"
                  whileHover={{ x: 3 }}
                >
                  &gt;
                </motion.span>
              </label>
              <label className="flex items-center gap-2 text-sm text-gray-300">
                <input type="checkbox" className="rounded" />
                <span>개인정보 제3자 제공 동의</span>
                <motion.span
                  className="ml-auto cursor-pointer"
                  whileHover={{ x: 3 }}
                >
                  &gt;
                </motion.span>
              </label>
            </div>

            <motion.button
              className="bg-blue-600 text-white rounded p-3 mt-4 disabled:opacity-50"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              다음
            </motion.button>

            <div className="flex justify-center gap-2 mt-4 text-sm">
              <motion.a
                href="#"
                className="text-blue-400 hover:underline"
                whileHover={{ scale: 1.05 }}
              >
                아직 토스증권 회원이 아니신가요?
              </motion.a>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
