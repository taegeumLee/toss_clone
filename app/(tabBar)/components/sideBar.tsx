"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { FaChartSimple } from "react-icons/fa6";
import { FaHeart } from "react-icons/fa";
import { GoChecklist } from "react-icons/go";
import { FaFire } from "react-icons/fa";

const sideBarItem = [
  { icon: <FaChartSimple className="text-xl" />, text: "내 투자" },
  { icon: <FaHeart className="text-xl" />, text: "관심" },
  { icon: <GoChecklist className="text-xl" />, text: "최근 본" },
  { icon: <FaFire className="text-xl" />, text: "실시간" },
];

interface SideBarProps {
  onOpenChange: (isOpen: boolean) => void;
}

export default function SideBar({ onOpenChange }: SideBarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState("");

  useEffect(() => {
    onOpenChange(isOpen);
  }, [isOpen, onOpenChange]);

  const contentVariants = {
    open: {
      width: "280px",
      opacity: 1,
      display: "block",
      transition: {
        type: "spring",
        stiffness: 280,
        damping: 30,
      },
    },
    closed: {
      width: "0px",
      opacity: 0,
      transitionEnd: {
        display: "none",
      },
      transition: {
        type: "spring",
        stiffness: 280,
        damping: 30,
      },
    },
  };

  return (
    <div className="flex">
      {/* 선택된 메뉴의 컨텐츠 영역 */}
      <motion.div
        initial="closed"
        animate={isOpen ? "open" : "closed"}
        variants={contentVariants}
        className="fixed right-[80px] h-screen bg-neutral-900 border-l border-neutral-800 overflow-hidden"
      >
        <div className="p-4 w-[280px]">
          <h2 className="text-white text-lg">{selected}</h2>
          {/* 여기에 선택된 메뉴의 컨텐츠를 추가하세요 */}
        </div>
      </motion.div>

      {/* 카테고리 메뉴 */}
      <div className="fixed right-0 w-[70px] h-screen bg-neutral-900 border-l border-neutral-800 shadow-lg">
        <div className="flex flex-col gap-7 p-3 mt-1">
          {sideBarItem.map((item, index) => (
            <motion.div
              onClick={() => {
                if (selected === item.text) {
                  setIsOpen(false);
                  setSelected("");
                } else {
                  setIsOpen(true);
                  setSelected(item.text);
                }
              }}
              key={index}
              className={`flex items-center flex-col justify-center cursor-pointer gap-1 hover:text-neutral-200 p-1 hover:bg-neutral-700 rounded-md text-neutral-400 transition-colors ${
                selected === item.text ? "*:text-white" : ""
              }`}
            >
              {item.icon}
              <span className="text-xs">{item.text}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
