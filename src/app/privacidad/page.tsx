import Nav from "../components/nav";
import Footer from "../components/footer";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Política de Privacidad | Araf Innovations",
  description:
    "Conoce cómo Araf Innovations protege y maneja tu información personal. Lee nuestra política de privacidad completa.",
  robots: "index, follow",
  alternates: {
    canonical: "https://arafinnovations.com/privacidad",
  },
};

export default function PrivacidadPage() {
  return (
    <>
      <Nav />
      <main className="min-h-screen bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">
            Política de Privacidad
          </h1>

          <div className="prose prose-lg max-w-none">
            <p className="text-gray-600 mb-6">
              <strong>Última actualización:</strong>{" "}
              {new Date().toLocaleDateString("es-ES", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
                1. Información que Recopilamos
              </h2>
              <p className="text-gray-700 mb-4">
                En Araf Innovations, recopilamos información que usted nos
                proporciona directamente, incluyendo:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
                <li>
                  Información de contacto (nombre, correo electrónico, número de
                  teléfono)
                </li>
                <li>Información de cuenta (nombre de usuario, contraseña)</li>
                <li>
                  Información de pago (datos de tarjeta de crédito procesados de
                  forma segura)
                </li>
                <li>Información del proyecto y solicitudes de servicio</li>
              </ul>
              <p className="text-gray-700 mb-4">
                También recopilamos automáticamente información sobre cómo
                utiliza nuestros servicios, incluyendo:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>Dirección IP y tipo de navegador</li>
                <li>Páginas visitadas y tiempo de permanencia</li>
                <li>Dispositivo y sistema operativo utilizado</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
                2. Uso de la Información
              </h2>
              <p className="text-gray-700 mb-4">
                Utilizamos la información recopilada para:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>Proporcionar, mantener y mejorar nuestros servicios</li>
                <li>
                  Procesar transacciones y enviar notificaciones relacionadas
                </li>
                <li>
                  Enviar comunicaciones técnicas y de marketing (con su
                  consentimiento)
                </li>
                <li>Responder a sus consultas y brindar soporte al cliente</li>
                <li>
                  Cumplir con obligaciones legales y proteger nuestros derechos
                </li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
                3. Compartir Información
              </h2>
              <p className="text-gray-700 mb-4">
                No vendemos su información personal. Podemos compartir su
                información solo en las siguientes circunstancias:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>
                  Con proveedores de servicios que nos ayudan a operar nuestro
                  negocio (bajo estrictos acuerdos de confidencialidad)
                </li>
                <li>
                  Cuando sea requerido por ley o para proteger nuestros derechos
                  legales
                </li>
                <li>
                  En caso de una fusión, adquisición o venta de activos (con
                  previo aviso)
                </li>
                <li>Con su consentimiento explícito</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
                4. Seguridad de los Datos
              </h2>
              <p className="text-gray-700 mb-4">
                Implementamos medidas de seguridad técnicas y organizativas
                apropiadas para proteger su información personal contra acceso
                no autorizado, alteración, divulgación o destrucción. Sin
                embargo, ningún método de transmisión por Internet o método de
                almacenamiento electrónico es 100% seguro.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
                5. Cookies y Tecnologías Similares
              </h2>
              <p className="text-gray-700 mb-4">
                Utilizamos cookies y tecnologías similares para mejorar su
                experiencia, analizar el uso de nuestros servicios y
                personalizar contenido. Puede configurar su navegador para
                rechazar cookies, pero esto puede limitar algunas
                funcionalidades de nuestros servicios.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
                6. Sus Derechos
              </h2>
              <p className="text-gray-700 mb-4">Usted tiene derecho a:</p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>Acceder a su información personal</li>
                <li>Corregir información inexacta</li>
                <li>Solicitar la eliminación de su información</li>
                <li>Oponerse al procesamiento de su información</li>
                <li>Solicitar la portabilidad de sus datos</li>
                <li>Retirar su consentimiento en cualquier momento</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
                7. Retención de Datos
              </h2>
              <p className="text-gray-700 mb-4">
                Conservamos su información personal solo durante el tiempo
                necesario para cumplir con los propósitos descritos en esta
                política, a menos que se requiera un período de retención más
                largo por ley o por razones legítimas de negocio.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
                8. Cambios a esta Política
              </h2>
              <p className="text-gray-700 mb-4">
                Podemos actualizar esta Política de Privacidad ocasionalmente.
                Le notificaremos cualquier cambio significativo publicando la
                nueva política en esta página y actualizando la fecha de "Última
                actualización".
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
                9. Contacto
              </h2>
              <p className="text-gray-700 mb-4">
                Si tiene preguntas sobre esta Política de Privacidad o desea
                ejercer sus derechos, puede contactarnos en:
              </p>
              <div className="bg-gray-50 p-6 rounded-lg">
                <p className="text-gray-700 mb-2">
                  <strong>Email:</strong> support@arafinnovations.com
                </p>
                <p className="text-gray-700 mb-2">
                  <strong>Teléfono:</strong> +52 (811) 785-8904
                </p>
                <p className="text-gray-700">
                  <strong>Dirección:</strong> Monterrey, México
                </p>
              </div>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
