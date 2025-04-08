import { LogoButton } from "@/app/login/logo-button";
import { validateOnboardingToken } from "./services/validateToken";
import { Presentation } from "./Presentation/presentation";

export default async function Onboarding({
  searchParams,
}: {
  searchParams: any;
}) {
  const { token, projectId } = await searchParams;

  if (!token) {
    return (
      <div className="w-screen h-screen bg-gradient-to-b from-blue-800 to-blue-900 flex items-center justify-center">
        <LogoButton />
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-bold text-red-600 mb-2">
            Error de Acceso
          </h2>
          <p className="text-gray-700">
            No se proporcionó un token de acceso o un ID de proyecto.
          </p>
        </div>
      </div>
    );
  }

  // Ensure token is a string
  const tokenString = Array.isArray(token) ? token[0] : token;
  const projectIdString = Array.isArray(projectId) ? projectId[0] : projectId;

  // Validate the token
  const { error, status } = await validateOnboardingToken(tokenString);

  if (error) {
    return (
      <div className="w-screen h-screen bg-gradient-to-b from-blue-800 to-blue-900 flex items-center justify-center">
        <LogoButton />
        <div className="bg-white p-6 rounded-lg shadow-lg max-w-md mx-auto">
          <h2 className="text-xl font-bold text-red-600 mb-2">
            Error de Validación
          </h2>
          <p className="text-gray-700">
            Por favor contacte al administrador del sistema para obtener un
            token válido.
          </p>
          <h3 className="text-base font-bold text-gray-700 mt-4">
            Detalles del error: {status}
          </h3>
          <p className="text-sm text-gray-500 mt-2">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-screen h-screen bg-gradient-to-b from-blue-800 to-blue-900 flex items-center justify-center">
      <LogoButton />
      <Presentation projectId={projectIdString} token={tokenString} />
    </div>
  );
}
