"use client";

import { Input as ShadcnInput } from "@/components/ui/input";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { forwardRef } from "react";
import { LucideIcon } from "lucide-react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: LucideIcon;
  label?: string;
  error?: string;
  className?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ icon: Icon, label, error, className, ...props }, ref) => {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
        className="relative w-full"
      >
        {label && (
          <motion.label
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="block text-sm font-medium text-foreground mb-1.5"
          >
            {label}
          </motion.label>
        )}

        <div className="relative">
          {Icon && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="absolute left-3 top-1/4 text-muted-foreground"
            >
              <Icon className="h-4 w-4" />
            </motion.div>
          )}

          <ShadcnInput
            ref={ref}
            className={cn(
              "transition-all duration-200",
              Icon && "pl-10",
              error && "border-destructive focus-visible:ring-destructive",
              className
            )}
            {...props}
          />

          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute -bottom-6 left-0 text-sm text-destructive"
            >
              {error}
            </motion.div>
          )}
        </div>

        <motion.div
          className={cn(
            "absolute bottom-0 left-0 h-0.5 bg-primary scale-x-0 origin-left transition-transform duration-200",
            "group-focus-within:scale-x-100"
          )}
        />
      </motion.div>
    );
  }
);

Input.displayName = "Input";
