"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaBars, FaTimes } from 'react-icons/fa';

export default function Nav() {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    // Handle scroll effect for navbar background
    useEffect(() => {
        const handleScroll = () => {
            const isScrolled = window.scrollY > 50;
            setScrolled(isScrolled);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navItems = [
        { name: 'Inicio', href: '#home' },
        { name: 'Servicios', href: '#services' },
        { name: 'Sobre Nosotros', href: '#about' },
        { name: 'Testimonios', href: '#testimonials' },
        { name: 'Contacto', href: '#contact' },
    ];

    return (
        <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/80 backdrop-blur-md shadow-lg' : 'bg-transparent'
            }`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <a href="#home" className="flex items-center">
                        <span className={`text-2xl font-bold ${scrolled ? 'text-blue-900' : 'text-white'
                            }`}>
                            Araf Innovations
                        </span>
                    </a>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-8">
                        {navItems.map((item) => (
                            <a
                                key={item.name}
                                href={item.href}
                                className={`text-base font-medium transition-colors duration-200 ${scrolled
                                    ? 'text-gray-700 hover:text-blue-600'
                                    : 'text-white hover:text-yellow-400'
                                    }`}
                            >
                                {item.name}
                            </a>
                        ))}
                    </div>

                    {/* Mobile menu button */}
                    <div className="md:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className={`p-2 rounded-md ${scrolled
                                ? 'text-gray-700 hover:text-blue-600'
                                : 'text-white hover:text-yellow-400'
                                }`}
                        >
                            {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Navigation */}
            <motion.div
                initial={false}
                animate={isOpen ? { height: 'auto', opacity: 1 } : { height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className={`md:hidden overflow-hidden ${scrolled ? 'bg-white' : 'bg-blue-900/95'
                    }`}
            >
                <div className="px-4 pt-2 pb-3 space-y-1">
                    {navItems.map((item) => (
                        <a
                            key={item.name}
                            href={item.href}
                            onClick={() => setIsOpen(false)}
                            className={`block px-3 py-2 rounded-md text-base font-medium ${scrolled
                                ? 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                                : 'text-white hover:text-yellow-400 hover:bg-blue-800/50'
                                }`}
                        >
                            {item.name}
                        </a>
                    ))}
                </div>
            </motion.div>
        </nav>
    );
}