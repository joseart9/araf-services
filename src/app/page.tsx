import Hero from "./components/hero";
import Services from "./components/services";
import AboutUs from "./components/aboutus";
import Contact from "./components/contact";
import CallToAction from "./components/call-to-action";
import Testimonials from "./components/testimonials";
import Footer from "./components/footer";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Araf Innovations | Soluciones Profesionales de Desarrollo de Software",
  description: "Transforma tu negocio con nuestros servicios expertos de desarrollo de software. Creamos aplicaciones web innovadoras, chatbots y páginas de destino que impulsan la transformación digital.",
  keywords: "desarrollo de software, aplicaciones web, chatbots, páginas de destino, soluciones digitales, tecnología empresarial, desarrollo web, aplicaciones móviles, consultoría IT, transformación digital",
  authors: [{ name: "Araf Innovations" }],
  creator: "Araf Innovations",
  publisher: "Araf Innovations",
  robots: "index, follow",
  alternates: {
    canonical: "https://arafinnovations.com",
  },
  openGraph: {
    title: "Araf Innovations | Soluciones Profesionales de Desarrollo de Software",
    description: "Transforma tu negocio con nuestros servicios expertos de desarrollo de software. Creamos aplicaciones web innovadoras, chatbots y páginas de destino que impulsan la transformación digital.",
    type: "website",
    locale: "es_ES",
    siteName: "Araf Innovations",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Araf Innovations - Desarrollo de Software Profesional",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Araf Innovations | Soluciones Profesionales de Desarrollo de Software",
    description: "Transforma tu negocio con nuestros servicios expertos de desarrollo de software. Creamos aplicaciones web innovadoras, chatbots y páginas de destino que impulsan la transformación digital.",
    images: ["/og-image.jpg"],
  },
  viewport: "width=device-width, initial-scale=1",
  themeColor: "#ffffff",
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-icon.png",
  },
};

export default function Page() {
  return (
    <main>
      <section id="home">
        <Hero />
      </section>
      <section id="services">
        <Services />
      </section>
      <section id="call-to-action">
        <CallToAction />
      </section>
      <section id="about">
        <AboutUs />
      </section>
      <section id="testimonials">
        <Testimonials />
      </section>
      <section id="contact">
        <Contact />
      </section>
      <section id="footer">
        <Footer />
      </section>
    </main>
  );
}
