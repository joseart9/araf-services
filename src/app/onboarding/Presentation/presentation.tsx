"use client";

import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import { useState, useRef } from "react";
import { StepComponent } from "../StepComponent/step-component";
import { CustomButton as Button } from "@/app/components/araf-components/Button";
import {
  ArrowRight,
  Users,
  FolderGit2,
  Building2,
  Sparkles,
  Rocket,
  Star,
} from "lucide-react";
import { LogoButton } from "@/app/login/logo-button";

interface PresentationProps {
  projectId: string | undefined;
  token: string;
}

export const Presentation = ({ projectId, token }: PresentationProps) => {
  const [showSteps, setShowSteps] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
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

  const floatingVariants = {
    initial: { y: 0 },
    animate: {
      y: [0, -20, 0],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  if (showSteps) {
    return <StepComponent projectId={projectId} token={token} />;
  }

  return (
    <div
      ref={containerRef}
      className="relative w-screen h-screen overflow-auto"
    >
      {/* Animated Background */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-b from-blue-900 via-blue-800 to-blue-900"
        style={{ y, opacity }}
      >
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-yellow-400 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.3, 0.8, 0.3],
              }}
              transition={{
                duration: 2 + Math.random() * 2,
                repeat: Infinity,
                repeatType: "reverse" as const,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>
      </motion.div>

      <motion.div
        className="relative z-10 mt-12 max-w-6xl w-full mx-auto px-4 py-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="relative">
          {/* Floating Elements */}
          <motion.div
            className="absolute -top-20 -left-20 w-40 h-40"
            variants={floatingVariants}
            initial="initial"
            animate="animate"
          >
            <div className="relative">
              <motion.div
                className="absolute inset-0 bg-blue-500/20 rounded-full blur-3xl"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.5, 0.3],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  repeatType: "reverse" as const,
                }}
              />
            </div>
          </motion.div>

          <motion.div
            className="absolute -bottom-20 -right-20 w-40 h-40"
            variants={floatingVariants}
            initial="initial"
            animate="animate"
          >
            <div className="relative">
              <motion.div
                className="absolute inset-0 bg-yellow-500/20 rounded-full blur-3xl"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.5, 0.3],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  repeatType: "reverse" as const,
                  delay: 1,
                }}
              />
              <Star className="w-16 h-16 text-yellow-400" />
            </div>
          </motion.div>

          {/* Main Content */}
          <div className="absolute z-10 bg-white/5 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/10 rounded-b-none h-screen">
            <motion.h1
              className="text-5xl md:text-7xl font-bold text-white text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-yellow-600"
              variants={itemVariants}
            >
              ¿Listo para impulsar tu proyecto?
            </motion.h1>

            <motion.div className="space-y-12 mb-16" variants={itemVariants}>
              <motion.div
                className="flex items-start space-x-6 p-6 rounded-2xl bg-white/5 hover:bg-white/10 transition-all duration-300"
                whileHover={{ scale: 1.02 }}
              >
                <div className="bg-blue-500/20 p-4 rounded-full">
                  <Building2 className="w-8 h-8 text-yellow-400" />
                </div>
                <div>
                  <h3 className="text-2xl font-semibold text-white mb-3">
                    Crear Organización
                  </h3>
                  <p className="text-white/80 text-lg max-w-xl">
                    Crea una organización, esta organización será utilizada para
                    gestionar todos tus proyectos dentro de Araf Innovations.
                  </p>
                </div>
              </motion.div>

              <motion.div
                className="flex items-start space-x-6 p-6 rounded-2xl bg-white/5 hover:bg-white/10 transition-all duration-300"
                whileHover={{ scale: 1.02 }}
              >
                <div className="bg-blue-500/20 p-4 rounded-full">
                  <Users className="w-8 h-8 text-yellow-400" />
                </div>
                <div>
                  <h3 className="text-2xl font-semibold text-white mb-3">
                    Crear Cuenta
                  </h3>
                  <p className="text-white/80 text-lg max-w-xl">
                    Crea tu cuenta de administrador con los datos necesarios
                    para gestionar tus proyectos.
                  </p>
                </div>
              </motion.div>

              <motion.div
                className="flex items-start space-x-6 p-6 rounded-2xl bg-white/5 hover:bg-white/10 transition-all duration-300"
                whileHover={{ scale: 1.02 }}
              >
                <div className="bg-blue-500/20 p-4 rounded-full">
                  <FolderGit2 className="w-8 h-8 text-yellow-400" />
                </div>
                <div>
                  <h3 className="text-2xl font-semibold text-white mb-3">
                    Configurar Proyecto
                  </h3>
                  <p className="text-white/80 text-lg max-w-xl">
                    Define los detalles de tu proyecto, incluyendo nombre,
                    descripción y configuración inicial.
                  </p>
                </div>
              </motion.div>
            </motion.div>

            <motion.div className="flex justify-center" variants={itemVariants}>
              <Button
                onClick={() => setShowSteps(true)}
                className="group bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-12 py-6 rounded-full text-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden"
              >
                <motion.span
                  className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-yellow-600 opacity-0 group-hover:opacity-20 transition-opacity duration-300"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "100%" }}
                  transition={{ duration: 1, repeat: Infinity }}
                />
                <span className="relative flex items-center">
                  Comenzar
                  <ArrowRight className="ml-3 w-6 h-6 group-hover:translate-x-1 transition-transform duration-300" />
                </span>
              </Button>
            </motion.div>
            <motion.div
              className="text-center text-white/60 text-sm mt-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              Powered by <span className="font-bold">Araf Innovations</span>{" "}
              {new Date().getFullYear()}
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
