"use client";

import { motion } from 'framer-motion';
import { FaUsers, FaLightbulb, FaRocket, FaHandshake } from 'react-icons/fa';

const stats = [
    { number: "5+", label: "Años de Experiencia" },
    { number: "100+", label: "Proyectos Completados" },
    { number: "50+", label: "Clientes Satisfechos" },
    { number: "15+", label: "Expertos en el Equipo" },
];

const values = [
    {
        icon: <FaUsers className="text-4xl text-blue-600" />,
        title: "Trabajo en Equipo",
        description: "Creemos en la colaboración y el trabajo en equipo para lograr resultados excepcionales."
    },
    {
        icon: <FaLightbulb className="text-4xl text-blue-600" />,
        title: "Innovación",
        description: "Buscamos constantemente nuevas formas de resolver problemas y mejorar soluciones."
    },
    {
        icon: <FaRocket className="text-4xl text-blue-600" />,
        title: "Excelencia",
        description: "Nos comprometemos con la calidad y la excelencia en cada proyecto que emprendemos."
    },
    {
        icon: <FaHandshake className="text-4xl text-blue-600" />,
        title: "Confianza",
        description: "Construimos relaciones duraderas basadas en la confianza y la transparencia."
    }
];

export default function AboutUs() {
    return (
        <section className="py-24 bg-gradient-to-b from-white to-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header Section */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-24"
                >
                    <motion.span
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="inline-block px-4 py-2 rounded-full bg-blue-100 text-blue-600 text-sm font-semibold mb-6"
                    >
                        Sobre Nosotros
                    </motion.span>
                    <h2 className="text-5xl font-extrabold text-gray-900 mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600">
                        Transformando Ideas en Realidad Digital
                    </h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                        Somos un equipo apasionado de expertos en tecnología comprometidos con crear soluciones innovadoras que impulsan el éxito de nuestros clientes.
                    </p>
                </motion.div>

                {/* Stats Section */}
                {/* <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-24">
                    {stats.map((stat, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="text-center"
                        >
                            <div className="text-4xl font-bold text-blue-600 mb-2">{stat.number}</div>
                            <div className="text-gray-600">{stat.label}</div>
                        </motion.div>
                    ))}
                </div> */}

                {/* Values Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {values.map((value, index) => (
                        <motion.div
                            key={index}
                            initial={{ y: 20 }}
                            whileInView={{ y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="group relative overflow-hidden rounded-2xl bg-white p-8 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
                        >
                            {/* Gradient background effect */}
                            <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-purple-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                            {/* Animated border gradient */}
                            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                            <div className="absolute inset-[1px] rounded-2xl bg-white"></div>

                            {/* Content */}
                            <div className="relative">
                                <div className="mb-6">
                                    {value.icon}
                                </div>
                                <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-blue-600 transition-colors duration-300">
                                    {value.title}
                                </h3>
                                <p className="text-gray-600 leading-relaxed group-hover:text-gray-800 transition-colors duration-300">
                                    {value.description}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Mission Statement */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 }}
                    className="mt-24 relative"
                >
                    {/* Decorative divider */}
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full"></div>

                    <div className="pl-32">
                        <p className="text-2xl text-gray-700 max-w-3xl leading-relaxed font-medium">
                            Nuestra misión es empoderar a las empresas con soluciones tecnológicas innovadoras que les permitan crecer y destacar en el mundo digital.
                        </p>
                        <div className="mt-4 flex items-center gap-2 text-blue-600">
                            <div className="w-8 h-0.5 bg-blue-600"></div>
                            <span className="text-sm font-semibold">Araf Innovations</span>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}