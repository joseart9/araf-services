"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Input } from "@/app/components/araf-components/Input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useState } from "react";
import { login } from "../services/login";
import { useRouter } from "next/navigation";
import { LoginButton } from "../login-button";
import { Mail, Lock } from "lucide-react";
import { motion } from "framer-motion";

const formSchema = z.object({
  email: z.string().email("Correo electrónico inválido"),
  password: z.string().min(1, "Contraseña requerida"),
});

export function LoginForm() {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setError(null);

    try {
      const response = await login(values.email, values.password);

      if (response.data?.token) {
        // Redirect back to login page with token
        router.push(`/user`);
      } else {
        setError(response.message || "Login failed");
      }
    } catch (err) {
      setError("An error occurred during login");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.5,
        ease: "easeOut",
      }}
      className="w-full flex justify-center items-center h-full"
    >
      <Card className="w-full max-w-lg">
        <CardHeader className="mb-4">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
          >
            <CardTitle className="text-2xl font-bold text-center text-blue-800">
              Araf Innovations
            </CardTitle>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
          >
            <CardDescription className="text-center">
              Ingrese sus credenciales para acceder a su cuenta
            </CardDescription>
          </motion.div>
        </CardHeader>
        <CardContent>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
          >
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                {error && (
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Alert variant="destructive" className="mb-6">
                      <AlertDescription className="text-sm font-medium">
                        {error}
                      </AlertDescription>
                    </Alert>
                  </motion.div>
                )}

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem
                      className={form.formState.errors.email ? "mb-6" : "mb-4"}
                    >
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="Correo electrónico"
                          icon={Mail}
                          label="Correo electrónico"
                          error={form.formState.errors.email?.message}
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
                    <FormItem
                      className={
                        form.formState.errors.password ? "mb-6" : "mb-4"
                      }
                    >
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="Contraseña"
                          icon={Lock}
                          label="Contraseña"
                          error={form.formState.errors.password?.message}
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <LoginButton
                  isLoading={isLoading}
                  onClick={form.handleSubmit(onSubmit)}
                  className="w-full"
                />
              </form>
            </Form>
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
