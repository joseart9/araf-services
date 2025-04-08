"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { CustomButton as Button } from "@/app/components/araf-components/Button";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";
import { useState } from "react";

export interface Step {
  title: string;
  description?: string;
  content: React.ReactNode;
  isCompleted?: boolean;
  onSubmit?: (data?: any) => Promise<boolean>;
}

interface StepIndicatorProps {
  step: number;
  currentStep: number;
  isCompleted: boolean;
  isClickable: boolean;
  onClick?: () => void;
}

const StepIndicator = ({
  step,
  currentStep,
  isCompleted,
  isClickable,
  onClick,
}: StepIndicatorProps) => {
  const isActive = step === currentStep;

  return (
    <motion.button
      initial={false}
      animate={{
        scale: isActive ? 1.1 : 1,
        backgroundColor: isCompleted
          ? "rgb(37, 99, 235)"
          : isActive
          ? "rgb(59, 130, 246)"
          : "rgb(229, 231, 235)",
      }}
      onClick={isClickable ? onClick : undefined}
      className={cn(
        "w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors",
        isCompleted ? "text-white" : isActive ? "text-white" : "text-gray-600",
        isClickable
          ? "cursor-pointer hover:opacity-80"
          : "cursor-not-allowed opacity-50"
      )}
    >
      {isCompleted ? <Check className="w-4 h-4" /> : <span>{step + 1}</span>}
    </motion.button>
  );
};

interface MultiStepProps {
  steps: Step[];
  currentStep: number;
  onStepChange: (step: number) => void;
  onComplete?: () => void;
  className?: string;
}

export function MultiStep({
  steps,
  currentStep,
  onStepChange,
  onComplete,
  className,
}: MultiStepProps) {
  const [isLoading, setIsLoading] = useState(false);
  const isLastStep = currentStep === steps.length - 1;

  const handleStepSubmit = async () => {
    const currentStepData = steps[currentStep];
    if (!currentStepData.onSubmit) return;

    setIsLoading(true);
    try {
      const success = await currentStepData.onSubmit();
      if (success) {
        if (isLastStep) {
          onComplete?.();
        } else {
          onStepChange(currentStep + 1);
        }
      }
    } catch (error) {
      console.error("Error in step submission:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={cn("w-full space-y-8", className)}>
      {/* Steps indicator */}
      <div className="relative">
        <div className="flex justify-between items-center">
          {steps.map((step, index) => (
            <React.Fragment key={index}>
              <StepIndicator
                step={index}
                currentStep={currentStep}
                isCompleted={step.isCompleted || index < currentStep}
                isClickable={false}
                onClick={() => onStepChange(index)}
              />
              {index < steps.length - 1 && (
                <div className="flex-1 h-0.5 bg-gray-200 mx-2">
                  <motion.div
                    initial={false}
                    animate={{
                      width: index < currentStep ? "100%" : "0%",
                    }}
                    className="h-full bg-blue-600"
                    transition={{ duration: 0.3 }}
                  />
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Step content */}
      <motion.div
        key={currentStep}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        transition={{ duration: 0.3 }}
        className="min-h-[200px]"
      >
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-900">
            {steps[currentStep].title}
          </h3>
          {steps[currentStep].description && (
            <p className="mt-1 text-sm text-gray-500">
              {steps[currentStep].description}
            </p>
          )}
        </div>
        {steps[currentStep].content}
      </motion.div>
    </div>
  );
}
