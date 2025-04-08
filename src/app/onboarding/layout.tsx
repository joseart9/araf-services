import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Araf Innovations - Onboarding",
  description: "Onboarding page",
};

export default function OnboardingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div>{children}</div>;
}
