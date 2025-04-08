import { FormField, FormItem, FormControl } from "@/components/ui/form";
import { Input } from "@/app/components/araf-components/Input";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createOrgSchema } from "./schema";
import { Building2 } from "lucide-react";
import * as z from "zod";
import { CustomButton as Button } from "@/app/components/araf-components/Button";
import { useState } from "react";
import { motion } from "framer-motion";

export type CreateOrganizationData = z.infer<typeof createOrgSchema>;

interface CreateOrganizationStepProps {
  onSubmit?: (data: CreateOrganizationData) => Promise<boolean>;
  setOrganizationId?: (id: string) => void;
}

export const CreateOrganizationStep = ({
  onSubmit,
  setOrganizationId,
}: CreateOrganizationStepProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const form = useForm<CreateOrganizationData>({
    resolver: zodResolver(createOrgSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  const handleSubmit = async (data: CreateOrganizationData) => {
    setIsSubmitting(true);
    try {
      await onSubmit?.(data);
    } catch (error) {
      console.error("Error submitting organization data:", error);
      form.setError("root", {
        type: "manual",
        message: "Error creating organization",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  label="Nombre de la organización"
                  placeholder="Mi Empresa"
                  icon={Building2}
                  error={form.formState.errors.name?.message}
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
                  label="Descripción"
                  placeholder="Describe tu organización"
                  error={form.formState.errors.description?.message}
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <div className="flex justify-end pt-4">
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? (
              <span className="flex items-center">
                <motion.div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                Creando organización...
              </span>
            ) : (
              "Crear organización"
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
};
