"use client";

import { motion } from "framer-motion";
import Header from "@/components/Header";
import SideBar from "./components/sideBar";
import Footer from "./components/footer";
import { useState } from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="bg-neutral-900 min-h-screen ">
      <div className="flex ">
        <motion.div
          className="flex-1"
          animate={{
            marginRight: isSidebarOpen ? "360px" : "80px",
          }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 30,
          }}
        >
          <Header />
          {children}
          <Footer />
        </motion.div>
        <SideBar onOpenChange={setIsSidebarOpen} />
      </div>
    </div>
  );
}
