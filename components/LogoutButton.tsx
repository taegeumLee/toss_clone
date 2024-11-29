"use client";

import { MdOutlineLogout } from "react-icons/md";

export default function LogoutButton() {
  const handleLogout = async () => {
    const response = await fetch("/api/auth/logout", {
      method: "POST",
    });
    if (response.status === 200) {
      window.location.href = "/login";
    }
  };

  return (
    <button
      onClick={handleLogout}
      className="w-full text-sm text-white hover:bg-gray-700 p-2 rounded flex items-center gap-2"
    >
      <MdOutlineLogout size={15} /> 로그아웃
    </button>
  );
}
