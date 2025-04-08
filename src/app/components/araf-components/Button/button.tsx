import * as React from "react";
import { Button as ShadcnButton, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

export interface CustomButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link";
  size?: "default" | "sm" | "lg" | "icon";
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
  color?: "primary" | "secondary" | "success" | "warning" | "danger" | "info";
}

const colorStyles = {
  primary: {
    solid: "bg-blue-600 hover:bg-blue-700 text-white",
    outline: "border-blue-600 text-blue-600 hover:bg-blue-50",
  },
  secondary: {
    solid: "bg-gray-600 hover:bg-gray-700 text-white",
    outline: "border-gray-600 text-gray-600 hover:bg-gray-50",
  },
  success: {
    solid: "bg-green-600 hover:bg-green-700 text-white",
    outline: "border-green-600 text-green-600 hover:bg-green-50",
  },
  warning: {
    solid: "bg-yellow-600 hover:bg-yellow-700 text-white",
    outline: "border-yellow-600 text-yellow-600 hover:bg-yellow-50",
  },
  danger: {
    solid: "bg-red-600 hover:bg-red-700 text-white",
    outline: "border-red-600 text-red-600 hover:bg-red-50",
  },
  info: {
    solid: "bg-cyan-600 hover:bg-cyan-700 text-white",
    outline: "border-cyan-600 text-cyan-600 hover:bg-cyan-50",
  },
};

const CustomButton = React.forwardRef<HTMLButtonElement, CustomButtonProps>(
  (
    {
      className,
      variant = "default",
      size = "default",
      isLoading = false,
      leftIcon,
      rightIcon,
      fullWidth = false,
      color = "primary",
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    const colorStyle =
      variant === "outline"
        ? colorStyles[color].outline
        : colorStyles[color].solid;

    return (
      <ShadcnButton
        ref={ref}
        className={cn(
          buttonVariants({ variant, size }),
          colorStyle,
          fullWidth && "w-full",
          isLoading && "cursor-not-allowed",
          className
        )}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        {!isLoading && leftIcon && <span className="mr-2">{leftIcon}</span>}
        {children}
        {!isLoading && rightIcon && <span className="ml-2">{rightIcon}</span>}
      </ShadcnButton>
    );
  }
);

CustomButton.displayName = "CustomButton";

export { CustomButton };
