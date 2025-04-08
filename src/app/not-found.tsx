"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { CustomButton as Button } from "@/app/components/araf-components/Button";
import { Home } from "lucide-react";
import { LogoButton } from "@/app/login/logo-button";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-500 to-blue-900 flex items-center justify-center p-4">
      <div className="text-center">
        <LogoButton />
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative"
        >
          <h1 className="text-[12rem] font-bold text-blue-50/25 leading-none select-none">
            404
          </h1>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <h2 className="text-4xl font-bold text-blue-100">
              Página no encontrada
            </h2>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="mt-6 space-y-6"
        >
          <p className="text-lg text-blue-100/80 max-w-md mx-auto">
            Lo sentimos, la página que estás buscando no existe o ha sido
            movida.
          </p>

          <div className="flex justify-center gap-4">
            <Link href="/">
              <Button
                variant="default"
                className="bg-blue-600 hover:bg-blue-700 text-white"
                leftIcon={<Home className="w-4 h-4" />}
              >
                Volver al inicio
              </Button>
            </Link>
          </div>
        </motion.div>

        {/* Decorative elements */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="absolute inset-0 pointer-events-none"
        >
          <div className="absolute top-1/4 left-1/4 w-4 h-4 bg-yellow-400 rounded-full opacity-50" />
          <div className="absolute top-1/3 right-1/4 w-6 h-6 bg-blue-400 rounded-full opacity-30" />
          <div className="absolute bottom-1/4 left-1/3 w-8 h-8 bg-yellow-300 rounded-full opacity-40" />
          <div className="absolute top-1/2 right-1/3 w-5 h-5 bg-blue-300 rounded-full opacity-20" />
        </motion.div>
      </div>
    </div>
  );
}
