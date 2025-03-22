"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import React from 'react';

export default function Hero() {
    return (
        <section className="relative min-h-screen bg-gradient-to-b from-blue-900 to-blue-800 text-white overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
            </div>

            {/* Content Container */}
            <div className="container mx-auto px-4 py-20 relative z-10">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Left Column - Text Content */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="space-y-8"
                    >
                        <motion.h1
                            className="text-5xl md:text-6xl font-bold leading-tight"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                        >
                            Transformando Ideas en
                            <span className="text-yellow-400"> Realidad Digital</span>
                        </motion.h1>

                        <motion.p
                            className="text-xl text-blue-100 max-w-xl"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                        >
                            Creamos soluciones web innovadoras, chatbots inteligentes y páginas web impactantes que ayudan a las empresas a prosperar en la era digital.
                        </motion.p>

                        <motion.div
                            className="flex gap-4"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.6 }}
                        >
                            <a
                                href="#contact"
                                className="bg-yellow-400 text-blue-900 px-8 py-3 rounded-full font-semibold hover:bg-yellow-300 transition-colors"
                            >
                                Contáctanos
                            </a>
                            <a
                                href="#services"
                                className="border-2 border-white px-8 py-3 rounded-full font-semibold hover:bg-white/10 transition-colors"
                            >
                                Nuestros Servicios
                            </a>
                        </motion.div>
                    </motion.div>

                    {/* Right Column - Visual Element */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="relative"
                    >
                        <div className="relative w-full aspect-square">
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-blue-700 rounded-full blur-3xl opacity-20 animate-pulse" />
                            <div className="absolute inset-0 bg-white/5 rounded-full backdrop-blur-xl" />
                            <div className="absolute inset-0 flex items-center justify-center">
                                <motion.div
                                    animate={{
                                        rotate: 360,
                                        scale: [1, 1.1, 1],
                                    }}
                                    transition={{
                                        duration: 20,
                                        repeat: Infinity,
                                        ease: "linear"
                                    }}
                                    className="w-64 h-64"
                                >
                                    <div className="w-full h-full border-4 border-yellow-400 rounded-full animate-spin-slow" >
                                        <img src="/logo.jpeg" alt="logo" className="w-full h-full object-cover rounded-full" />
                                    </div>
                                </motion.div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}