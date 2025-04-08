import { LoginForm } from "./LoginForm";
import { LogoButton } from "./logo-button";

export default async function LoginPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-800 to-blue-900 py-12 px-4 sm:px-6 lg:px-8">
      <LogoButton />
      <LoginForm />
      <h2 className="text-center text-sm text-white pt-6">
        {new Date().getFullYear()} &copy; Powered by{" "}
        <span className="font-bold text-white">Araf Innovations</span>
      </h2>
    </div>
  );
}
