"use client";

import Link from "next/link";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

const navigation = {
  solutions: [
    { name: "Desarrollo Web", href: "/servicios/desarrollo-web" },
    { name: "Aplicaciones Móviles", href: "/servicios/apps-moviles" },
    { name: "Consultoría IT", href: "/servicios/consultoria" },
    { name: "Cloud Solutions", href: "/servicios/cloud" },
  ],
  company: [
    { name: "Sobre Nosotros", href: "/about" },
    { name: "Proyectos", href: "/proyectos" },
    { name: "Blog", href: "/blog" },
    { name: "Carreras", href: "/carreras" },
  ],
  legal: [
    { name: "Política de Privacidad", href: "/privacidad" },
    { name: "Términos y Condiciones", href: "/terminos" },
  ],
  social: [
    { name: "Facebook", href: "#", icon: FaFacebook },
    { name: "Twitter", href: "#", icon: FaTwitter },
    { name: "Instagram", href: "#", icon: FaInstagram },
    { name: "LinkedIn", href: "#", icon: FaLinkedin },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-gray-900" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          <div className="space-y-8 xl:col-span-1">
            <Link href="/" className="flex items-center space-x-3">
              <span className="text-2xl font-bold text-white">
                Araf Innovations
              </span>
            </Link>
            <p className="text-gray-400 text-base leading-relaxed">
              Transformando ideas en soluciones digitales innovadoras.
              Impulsamos el crecimiento de tu negocio con tecnología de
              vanguardia.
            </p>
            <div className="flex space-x-6">
              {navigation.social.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-gray-400 hover:text-blue-500 transition-colors duration-300"
                >
                  <span className="sr-only">{item.name}</span>
                  <item.icon className="h-6 w-6" />
                </a>
              ))}
            </div>
          </div>
          <div className="mt-12 grid grid-cols-2 gap-8 xl:mt-0 xl:col-span-2">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold text-white tracking-wider uppercase">
                  Soluciones
                </h3>
                <ul className="mt-4 space-y-4">
                  {navigation.solutions.map((item) => (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        className="text-base text-gray-400 hover:text-blue-500 transition-colors duration-300"
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-12 md:mt-0">
                <h3 className="text-sm font-semibold text-white tracking-wider uppercase">
                  Compañía
                </h3>
                <ul className="mt-4 space-y-4">
                  {navigation.company.map((item) => (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        className="text-base text-gray-400 hover:text-blue-500 transition-colors duration-300"
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="md:grid md:grid-cols-1 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold text-white tracking-wider uppercase">
                  Legal
                </h3>
                <ul className="mt-4 space-y-4">
                  {navigation.legal.map((item) => (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        className="text-base text-gray-400 hover:text-blue-500 transition-colors duration-300"
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-12 md:mt-8">
                <h3 className="text-sm font-semibold text-white tracking-wider uppercase">
                  Contacto
                </h3>
                <div className="mt-4 space-y-4">
                  <p className="text-base text-gray-400">
                    Email: support@arafinnovations.com
                  </p>
                  <p className="text-base text-gray-400">
                    Tel: +52 (811) 785-8904
                  </p>
                  <p className="text-base text-gray-400">Monterrey, México</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-gray-800">
          <p className="text-base text-gray-400 text-center">
            © {new Date().getFullYear()} Araf Innovations. Todos los derechos
            reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
