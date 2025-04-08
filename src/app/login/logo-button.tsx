"use client";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

export function LogoButton() {
  const router = useRouter();
  return (
    <motion.h2
      className="z-50 text-center text-sm text-white pt-6 absolute -top-2 left-44 cursor-pointer"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      onClick={() => router.push("/")}
    >
      <span className="font-bold text-white text-2xl">Araf Innovations</span>
    </motion.h2>
  );
}
