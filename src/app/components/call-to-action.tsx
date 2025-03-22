"use client";

import { motion } from 'framer-motion';
import { FaArrowRight } from 'react-icons/fa';

export default function CallToAction() {
    return (
        <section className="py-8 bg-gradient-to-b from-gray-50 to-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="relative overflow-hidden rounded-3xl">
                    {/* Background decorative elements */}
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-50/50 to-purple-50/50"></div>
                    <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
                    <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>

                    <div className="relative py-20 px-6 sm:px-12">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                            className="text-center space-y-8"
                        >
                            <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
                                ¿Listo para Transformar tu Negocio?
                            </h2>
                            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                                Únete a las empresas que ya están creciendo con nuestras soluciones tecnológicas innovadoras.
                            </p>

                            <motion.div
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="pt-4"
                            >
                                <a
                                    href="#contact"
                                    className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 group"
                                >
                                    Comienza tu Proyecto
                                    <FaArrowRight className="ml-3 group-hover:translate-x-1 transition-transform duration-300" />
                                </a>
                            </motion.div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
}