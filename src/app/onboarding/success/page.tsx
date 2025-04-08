"use client";

import { motion } from "framer-motion";
import { CheckCircle2, Rocket, Sparkles, ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { CustomButton as Button } from "@/app/components/araf-components/Button";
import { LogoButton } from "@/app/login/logo-button";

export default function Success() {
  const router = useRouter();
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    // Trigger animations after component mount
    const timer = setTimeout(() => setShowContent(true), 500);
    return () => clearTimeout(timer);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10,
      },
    },
  };

  const rocketVariants = {
    initial: { x: -100, rotate: -45 },
    animate: {
      x: 0,
      rotate: 0,
      transition: {
        type: "spring",
        stiffness: 50,
        damping: 10,
        delay: 0.5,
      },
    },
  };

  const sparkleVariants = {
    initial: { scale: 0, opacity: 0 },
    animate: {
      scale: [1, 1.2, 1],
      opacity: [0, 1, 0],
      transition: {
        duration: 2,
        repeat: Infinity,
        repeatType: "reverse" as const,
      },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-800 to-blue-900 flex items-center justify-center p-4">
      <LogoButton />
      <motion.div
        className="max-w-4xl w-full bg-white/10 backdrop-blur-lg rounded-3xl p-8 shadow-2xl"
        variants={containerVariants}
        initial="hidden"
        animate={showContent ? "visible" : "hidden"}
      >
        <div className="relative">
          {/* Animated Background Elements */}
          <motion.div
            className="absolute -top-20 -left-20 w-40 h-40 bg-blue-500/20 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          />
          <motion.div
            className="absolute -bottom-20 -right-20 w-40 h-40 bg-yellow-500/20 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              repeatType: "reverse",
              delay: 1,
            }}
          />

          {/* Main Content */}
          <div className="relative z-10 text-center">
            <motion.div
              className="flex justify-center mb-8"
              variants={itemVariants}
            >
              <div className="relative">
                <motion.div
                  className="absolute -inset-4 bg-blue-500/30 rounded-full blur-xl"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.5, 0.8, 0.5],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    repeatType: "reverse",
                  }}
                />
                <CheckCircle2 className="w-24 h-24 text-yellow-400" />
              </div>
            </motion.div>

            <motion.h1
              className="text-4xl md:text-6xl font-bold text-white mb-6"
              variants={itemVariants}
            >
              ¡Felicidades!
            </motion.h1>

            <motion.p
              className="text-xl text-white/80 mb-8"
              variants={itemVariants}
            >
              Tu cuenta ha sido creada exitosamente
            </motion.p>

            <motion.div
              className="flex justify-center mb-8"
              variants={itemVariants}
            >
              <motion.div
                variants={rocketVariants}
                initial="initial"
                animate="animate"
                className="relative"
              >
                <Rocket className="w-16 h-16 text-yellow-400" />
                <motion.div
                  className="absolute -top-2 -right-2"
                  variants={sparkleVariants}
                >
                  <Sparkles className="w-6 h-6 text-yellow-400" />
                </motion.div>
              </motion.div>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Button
                onClick={() => router.push(`/dashboard`)}
                className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-8 py-4 rounded-full text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Ir al Dashboard
                <ArrowRight className="ml-2" />
              </Button>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
