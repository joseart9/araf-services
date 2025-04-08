import { FormField, FormItem, FormControl } from "@/components/ui/form";
import { Input } from "@/app/components/araf-components/Input";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createAccountSchema } from "./schema";
import { User, Mail, Phone, Lock } from "lucide-react";
import * as z from "zod";
import { CustomButton as Button } from "@/app/components/araf-components/Button";
import { useState } from "react";
import { motion } from "framer-motion";

export type CreateAccountData = z.infer<typeof createAccountSchema>;

interface CreateAccountStepProps {
  onSubmit?: (data: {
    email: string;
    password: string;
    first_name: string;
    last_name: string;
    phone_number: string;
    organization_id: string;
  }) => Promise<boolean>;
  organizationId: string;
}

// Step Components
export const CreateAccountStep = ({
  onSubmit,
  organizationId,
}: CreateAccountStepProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const form = useForm<CreateAccountData>({
    resolver: zodResolver(createAccountSchema),
  });

  const handleSubmit = async (data: CreateAccountData) => {
    if (onSubmit) {
      const transformedData = {
        email: data.email,
        password: data.password,
        first_name: data.firstName,
        last_name: data.lastName,
        phone_number: data.phone,
        organization_id: organizationId,
      };
      await onSubmit(transformedData);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="firstName"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  label="Nombre"
                  placeholder="Nombre"
                  icon={User}
                  error={form.formState.errors.firstName?.message}
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="lastName"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  label="Apellido"
                  placeholder="Apellido"
                  icon={User}
                  error={form.formState.errors.lastName?.message}
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  type="email"
                  label="Correo electrónico"
                  placeholder="correo@example.com"
                  icon={Mail}
                  error={form.formState.errors.email?.message}
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  type="tel"
                  label="Teléfono"
                  placeholder="1234567890"
                  icon={Phone}
                  error={form.formState.errors.phone?.message}
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  type="password"
                  label="Contraseña"
                  placeholder="Contraseña"
                  icon={Lock}
                  error={form.formState.errors.password?.message}
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  type="password"
                  label="Confirmar contraseña"
                  placeholder="Confirmar contraseña"
                  icon={Lock}
                  error={form.formState.errors.confirmPassword?.message}
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
                Creando cuenta...
              </span>
            ) : (
              "Crear cuenta"
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
};
