import { getOrganization } from "./services/getOrganization";
import { LoginForm } from "./LoginForm";
import { redirect } from "next/navigation";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: any;
}) {
  const { project, redirect: redirectUrl, token } = await searchParams;
  const { organization, error } = await getOrganization(project);

  if (error) {
    return <div>Error: {error}</div>;
  }

  // Si tenemos un token en la URL, redirigir al sitio externo
  if (token) {
    redirect(`${redirectUrl}?token=${searchParams.token}`);
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <LoginForm
        project={project}
        redirectUrl={redirectUrl}
        organization={organization as unknown as Organization}
      />
      <h2 className="text-center text-sm text-gray-500 pt-6">
        {new Date().getFullYear()} &copy; Powered by{" "}
        <span className="font-bold">Araf Innovations</span>
      </h2>
    </div>
  );
}
