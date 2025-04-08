import { FormField, FormItem, FormControl } from "@/components/ui/form";
import { Input } from "@/app/components/araf-components/Input";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerProjectSchema } from "./schema";
import { FolderGit2, Globe, Lock, Link2 } from "lucide-react";
import * as z from "zod";
import { CustomButton as Button } from "@/app/components/araf-components/Button";
import { useRouter } from "next/navigation";
import { updateProjectService } from "@/services/projects";
import { NextRequest } from "next/server";
import { useState } from "react";

export type RegisterProjectData = z.infer<typeof registerProjectSchema>;

interface RegisterProjectStepProps {
  project: Project | null;
  organizationId: string;
  token: string;
}

// Step Components
export const RegisterProjectStep = ({
  project,
  organizationId,
  token,
}: RegisterProjectStepProps) => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const form = useForm<RegisterProjectData>({
    resolver: zodResolver(registerProjectSchema),
    defaultValues: {
      uuid: project?.uuid,
      name: project?.name,
      description: project?.description,
      organization_id: organizationId,
      img: project?.img,
      public_url: project?.public_url,
      admin_url: project?.admin_url,
      login_url: project?.login_url,
      has_custom_domain: project?.has_custom_domain,
      custom_domain_url: project?.custom_domain_url,
      isActive: project?.isActive,
      type: project?.type,
    },
  });

  const handleSubmit = async (data: RegisterProjectData) => {
    if (isSubmitting) return;
    setIsSubmitting(true);

    try {
      // If there's no project ID, just redirect to success
      if (!project?.id) {
        await router.push(
          `/onboarding/success?organizationId=${organizationId}`
        );
        return;
      }

      // If there is a project ID, update it
      const req = new NextRequest(
        new URL("/api", process.env.NEXT_PUBLIC_API_URL).toString(),
        {
          headers: new Headers({
            Authorization: `Bearer ${token}`,
          }),
        }
      );

      const { error } = await updateProjectService({
        req,
        projectId: project.id,
        project: {
          uuid: data.uuid,
          name: data.name,
          description: data.description,
          organization_id: organizationId,
          updated_at: new Date(),
        },
      });

      if (error) {
        console.error("Error updating project:", error);
        setIsSubmitting(false);
        return;
      }

      await router.push(`/onboarding/success?organizationId=${organizationId}`);
    } catch (error) {
      console.error("Error updating project:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((data) => {
          console.log("Form data before submit:", data);
          return handleSubmit(data);
        })}
        className="space-y-4"
      >
        <FormField
          control={form.control}
          name="uuid"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  label="ID del proyecto"
                  placeholder="ID del proyecto"
                  icon={FolderGit2}
                  error={form.formState.errors.uuid?.message}
                  disabled={!project?.id}
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  label="Nombre del proyecto"
                  placeholder="Mi Proyecto"
                  icon={FolderGit2}
                  error={form.formState.errors.name?.message}
                  disabled={!project?.id}
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  label="Descripción del proyecto"
                  placeholder="Describe tu proyecto"
                  icon={FolderGit2}
                  error={form.formState.errors.description?.message}
                  disabled={!project?.id}
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="public_url"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  label="URL Pública"
                  placeholder="https://ejemplo.com"
                  icon={Globe}
                  disabled
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="admin_url"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  label="URL de Administración"
                  placeholder="https://ejemplo.com/admin"
                  icon={Lock}
                  disabled
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="login_url"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  label="URL de Inicio de Sesión"
                  placeholder="https://ejemplo.com/login"
                  icon={Lock}
                  disabled
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        {form.getValues("has_custom_domain") && (
          <FormField
            control={form.control}
            name="custom_domain_url"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    label="Dominio Personalizado"
                    placeholder="https://midominio.com"
                    icon={Link2}
                    disabled
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        )}
        <div className="flex justify-end">
          <Button
            type="submit"
            className="w-full sm:w-auto"
            disabled={isSubmitting}
            onClick={(e) => {
              e.preventDefault();
              const formData = form.getValues();
              console.log("Button clicked, form data:", formData);
              handleSubmit(formData);
            }}
          >
            {isSubmitting ? "Finalizando..." : "Finalizar"}
          </Button>
        </div>
      </form>
    </Form>
  );
};
