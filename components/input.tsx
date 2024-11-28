import { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: string;
}

export default function Input({ className = "", error, ...props }: InputProps) {
  return (
    <div className="w-full">
      <input
        className={`w-full bg-slate-950 border-2 border-slate-800 rounded-lg p-3 outline-none hover:border-blue-900 focus:border-blue-600 ${className}`}
        {...props}
      />
      {error && <span className="text-red-500 text-sm mt-1">{error}</span>}
    </div>
  );
}
