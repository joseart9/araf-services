"use client";

import { MultiStep } from "@/app/components/araf-components/Step";
import { Card, CardContent } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { CreateAccountStep } from "../AccountStep";
import {
  CreateOrganizationStep,
  CreateOrganizationData,
} from "../OrganizationStep";
import { RegisterProjectStep } from "../ProjectStep";
import { useRouter } from "next/navigation";

export function StepComponent({
  projectId,
  token,
}: {
  projectId?: string;
  token: string;
}) {
  const [currentStep, setCurrentStep] = useState(0);
  const router = useRouter();
  const [organizationId, setOrganizationId] = useState<string | null>(null);
  const [completedSteps, setCompletedSteps] = useState<boolean[]>([
    false,
    false,
    false,
  ]);
  const [project, setProject] = useState<Project | null>(null);

  useEffect(() => {
    const fetchProject = async () => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/project?uuid=${projectId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();
      setProject(data.data);
    };
    fetchProject();
  }, [projectId]);

  const handleOrganizationSubmit = async (data: CreateOrganizationData) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/organization`,
        {
          method: "POST",
          body: JSON.stringify(data),
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        console.log("Error creating organization:", response);
        return false;
      }

      const organization = await response.json();
      setOrganizationId(organization.data.id);

      // Mark step as completed
      setCompletedSteps((prev) => {
        const newSteps = [...prev];
        newSteps[0] = true;
        return newSteps;
      });

      // Move to the next step
      setCurrentStep((prev) => prev + 1);

      return true;
    } catch (error) {
      console.error("Error creating organization:", error);
      return false;
    }
  };

  const handleAccountSubmit = async (data: any) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/register`,
        {
          method: "POST",
          body: JSON.stringify(data),
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        console.log("Error creating account:", response);
        return false;
      }

      // Mark step as completed
      setCompletedSteps((prev) => {
        const newSteps = [...prev];
        newSteps[1] = true;
        return newSteps;
      });

      // Move to the next step
      setCurrentStep((prev) => prev + 1);

      return true;
    } catch (error) {
      console.error("Error creating account:", error);
      return false;
    }
  };

  const handleProjectSubmit = async (data: any) => {
    try {
      // Call your API here
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/project`,
        {
          method: "PUT",
          body: JSON.stringify(data),
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        console.log("Error creating project:", response);
        return false;
      }

      // Mark step as completed
      setCompletedSteps((prev) => {
        const newSteps = [...prev];
        newSteps[2] = true;
        return newSteps;
      });

      return true;
    } catch (error) {
      console.error("Error creating project:", error);
      return false;
    }
  };

  const steps = [
    {
      title: "Crear Organización",
      description:
        "Crea tu organización, aquí podrás crear uno o más proyectos y asignar usuarios.",
      content: (
        <CreateOrganizationStep
          setOrganizationId={setOrganizationId}
          onSubmit={handleOrganizationSubmit}
        />
      ),
      isCompleted: completedSteps[0],
      onSubmit: handleOrganizationSubmit,
    },
    {
      title: "Crear Cuenta",
      description:
        "Crea tu cuenta, esta cuenta será la que se utilizará para acceder a la plataforma y la que administrará la organización.",
      content: (
        <CreateAccountStep
          onSubmit={handleAccountSubmit}
          organizationId={organizationId!}
        />
      ),
      isCompleted: completedSteps[1],
      onSubmit: handleAccountSubmit,
    },
    {
      title: "Registrar Proyecto",
      description:
        "Configura tu primer proyecto, si el campo ID se encuentra vacío, ignora este paso.",
      content: (
        <RegisterProjectStep
          token={token}
          project={project}
          organizationId={organizationId!}
        />
      ),
      isCompleted: completedSteps[2],
    },
  ];

  const handleComplete = () => {
    router.push(`/onboarding/success?organizationId=${organizationId}`);
  };

  return (
    <div className="w-full h-full flex items-center justify-center">
      <Card className="w-full max-w-2xl">
        <CardContent className="pt-6">
          <MultiStep
            steps={steps}
            currentStep={currentStep}
            onStepChange={setCurrentStep}
            onComplete={handleComplete}
          />
        </CardContent>
      </Card>
    </div>
  );
}
