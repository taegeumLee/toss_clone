import { motion, HTMLMotionProps } from "framer-motion";

interface ButtonProps extends HTMLMotionProps<"button"> {
  isLoading?: boolean;
  loadingText?: string;
}

export default function Button({
  children,
  isLoading,
  loadingText = "로딩 중...",
  variants,
  className = "",
  ...props
}: ButtonProps) {
  return (
    <motion.button
      className={`bg-blue-600 text-white w-full disabled:hover:scale-100 hover:scale-105 rounded p-3 disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-slate-800 ${className}`}
      variants={variants}
      {...props}
    >
      {isLoading ? loadingText : children}
    </motion.button>
  );
}
