"use client";

import { motion } from "framer-motion";
import Header from "@/components/Header";
import SideBar from "./components/sideBar";
import Footer from "./components/footer";
import { useState, useEffect } from "react";
import LoadingSkeleton from "./components/LoadingSkeleton";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <LoadingSkeleton />;
  }

  return (
    <div className="bg-neutral-900 min-h-screen overflow-y-auto scrollbar-hide">
      <div className="flex">
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
