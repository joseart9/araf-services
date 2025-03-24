"use client";

import { motion } from 'framer-motion';
import Image from 'next/image';

const testimonials = [
    {
        name: "Carlos Rodríguez",
        role: "CEO, TechVision",
        image: "https://imxdhdqvbpzxypvwfnbp.supabase.co/storage/v1/object/public/images/ADMIN/9ffd91b4-092e-4c43-9a62-d154cca36c75.webp",
        text: "ARAF Services transformó completamente nuestra presencia digital. Su equipo es excepcional y los resultados superaron nuestras expectativas."
    },
    {
        name: "Ana Martínez",
        role: "Directora de Marketing, InnovaTech",
        image: "https://imxdhdqvbpzxypvwfnbp.supabase.co/storage/v1/object/public/images/ADMIN/9ffd91b4-092e-4c43-9a62-d154cca36c75.webp",
        text: "La atención al detalle y profesionalismo de ARAF es incomparable. Han sido fundamentales en nuestro crecimiento digital."
    },
    {
        name: "Miguel Sánchez",
        role: "Fundador, DataCore",
        image: "https://imxdhdqvbpzxypvwfnbp.supabase.co/storage/v1/object/public/images/ADMIN/9ffd91b4-092e-4c43-9a62-d154cca36c75.webp",
        text: "Excelente experiencia trabajando con ARAF. Su enfoque innovador y soluciones personalizadas marcaron la diferencia."
    },
    {
        name: "Laura González",
        role: "CTO, FutureScale",
        image: "https://imxdhdqvbpzxypvwfnbp.supabase.co/storage/v1/object/public/images/ADMIN/9ffd91b4-092e-4c43-9a62-d154cca36c75.webp",
        text: "La capacidad técnica y visión estratégica de ARAF nos ayudó a alcanzar nuestros objetivos de manera eficiente."
    },
    {
        name: "David Torres",
        role: "Director de Operaciones, CloudTech",
        image: "https://imxdhdqvbpzxypvwfnbp.supabase.co/storage/v1/object/public/images/ADMIN/9ffd91b4-092e-4c43-9a62-d154cca36c75.webp",
        text: "Un equipo verdaderamente comprometido con el éxito de sus clientes. Su expertise técnico es excepcional."
    }
];

export default function Testimonials() {
    return (
        <section className="py-24 bg-gradient-to-b from-white to-gray-50 overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-5xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600">
                        Lo que Dicen Nuestros Clientes
                    </h2>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
                        Descubre por qué las empresas confían en nosotros para su transformación digital
                    </p>
                </motion.div>

                <div className="relative">
                    {/* Gradient overlays */}
                    <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white to-transparent z-10"></div>
                    <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white to-transparent z-10"></div>

                    {/* Marquee container */}
                    <div className="overflow-hidden pb-10">
                        <motion.div
                            animate={{
                                x: [0, -1920],
                            }}
                            transition={{
                                x: {
                                    repeat: Infinity,
                                    repeatType: "loop",
                                    duration: 30,
                                    ease: "linear",
                                },
                            }}
                            className="flex gap-6"
                        >
                            {/* Double the testimonials for seamless loop */}
                            {[...testimonials, ...testimonials].map((testimonial, index) => (
                                <div
                                    key={index}
                                    className="flex-shrink-0 w-[400px] bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300"
                                >
                                    <div className="flex items-center gap-4 mb-6">
                                        <div className="relative w-16 h-16 rounded-full overflow-hidden bg-gray-100">
                                            <img
                                                src={testimonial.image}
                                                alt={testimonial.name}
                                                className="object-cover"
                                            />
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="text-lg font-semibold text-gray-900">{testimonial.name}</h3>
                                            <p className="text-sm text-gray-600">{testimonial.role}</p>
                                        </div>
                                    </div>
                                    <p className="text-gray-700 leading-relaxed">{testimonial.text}</p>
                                </div>
                            ))}
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
}