"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { LogIn } from "lucide-react";

interface LoginButtonProps {
  isLoading?: boolean;
  onClick?: () => void;
  className?: string;
}

export function LoginButton({
  isLoading,
  onClick,
  className,
}: LoginButtonProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
    >
      <Button
        onClick={onClick}
        disabled={isLoading}
        className={`relative overflow-hidden group ${className}`}
        size="lg"
      >
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-primary/20 to-primary/0"
          initial={{ x: "-100%" }}
          whileHover={{ x: "100%" }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        />

        <motion.div
          className="flex items-center gap-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <LogIn className="w-5 h-5" />
          <span className="font-semibold">
            {isLoading ? "Signing in..." : "Sign in"}
          </span>
        </motion.div>

        {isLoading && (
          <motion.div
            className="absolute inset-0 bg-primary/20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
        )}
      </Button>
    </motion.div>
  );
}
