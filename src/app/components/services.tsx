"use client";

import { FaGlobe, FaShoppingCart, FaRocket, FaCloud, FaBlog, FaDatabase, FaRobot, FaComments } from 'react-icons/fa';
import { motion } from 'framer-motion';

interface ServiceCardProps {
    title: string;
    description: string;
    icon: React.ReactNode;
    index: number;
}

const ServiceCard = ({ title, description, icon, index }: ServiceCardProps) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="group relative overflow-hidden rounded-2xl bg-white p-8 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
        >
            {/* Gradient background effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-purple-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

            {/* Animated border gradient */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="absolute inset-[1px] rounded-2xl bg-white"></div>

            {/* Icon container with glow effect */}
            <motion.div
                className="relative mb-8"
            >
                <div className="absolute -inset-4 bg-blue-500/10 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <motion.span
                    className="relative inline-block text-5xl text-blue-600 transition-colors duration-300 group-hover:text-blue-700 group-hover:scale-110"
                    animate={{ rotate: 0 }}
                    whileHover={{ rotate: [0, -10, 10, -10, 0] }}
                    transition={{ duration: 0.5 }}
                >
                    {icon}
                </motion.span>
            </motion.div>

            {/* Content */}
            <div className="relative">
                <h3 className="mb-4 text-2xl font-bold text-gray-800 group-hover:text-blue-600 transition-colors duration-300">
                    {title}
                </h3>
                <p className="text-gray-600 leading-relaxed group-hover:text-gray-800 transition-colors duration-300">
                    {description}
                </p>
            </div>
        </motion.div>
    );
};

export default function Services() {
    const services = [
        {
            title: "Aplicaciones Web",
            description: "Desarrollamos aplicaciones web modernas y responsivas que se adaptan a las necesidades específicas de tu negocio.",
            icon: <FaGlobe />,
        },
        {
            title: "E-commerce",
            description: "Creamos tiendas en línea completas con todas las funcionalidades necesarias para vender tus productos de manera efectiva.",
            icon: <FaShoppingCart />,
        },
        {
            title: "Landing Pages",
            description: "Diseñamos páginas de destino atractivas y optimizadas para convertir visitantes en clientes.",
            icon: <FaRocket />,
        },
        {
            title: "SaaS",
            description: "Desarrollamos soluciones de software como servicio escalables y rentables para tu negocio.",
            icon: <FaCloud />,
        },
        {
            title: "Blogs",
            description: "Creamos blogs profesionales con diseño moderno y optimizados para SEO.",
            icon: <FaBlog />,
        },
        {
            title: "Bases de Datos",
            description: "Implementamos y optimizamos bases de datos robustas para manejar la información de tu negocio.",
            icon: <FaDatabase />,
        },
        {
            title: "Soluciones IA",
            description: "Integramos soluciones de inteligencia artificial para automatizar y optimizar procesos empresariales.",
            icon: <FaRobot />,
        },
        {
            title: "Chatbots",
            description: "Desarrollamos chatbots inteligentes para mejorar la atención al cliente y automatizar respuestas.",
            icon: <FaComments />,
        },
    ];

    return (
        <section className="py-24 bg-gradient-to-b from-gray-50 via-white to-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-24"
                >
                    <h2 className="text-5xl font-extrabold text-gray-900 mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600">
                        Nuestros Servicios
                    </h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                        Ofrecemos soluciones tecnológicas integrales para impulsar el crecimiento de tu negocio
                    </p>
                </motion.div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {services.map((service, index) => (
                        <ServiceCard
                            key={index}
                            title={service.title}
                            description={service.description}
                            icon={service.icon}
                            index={index}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}