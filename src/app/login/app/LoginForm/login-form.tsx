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

const formSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

export function LoginForm({
  project,
  redirectUrl,
  organization,
}: {
  project: string;
  redirectUrl: string;
  organization: Organization;
}) {
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
    if (!project) {
      setError("Project ID is required");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await login(values.email, values.password, project);

      if (response.data?.token) {
        // Redirect back to login page with token
        router.push(
          `/login/app?project=${project}&redirect=${redirectUrl}&token=${response.data.token}`
        );
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
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">
          {organization.name}
        </CardTitle>
        <CardDescription className="text-center">
          Enter your credentials to access your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="Enter your email"
                      icon={Mail}
                      label="Email"
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
                <FormItem>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Enter your password"
                      icon={Lock}
                      label="Password"
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
      </CardContent>
    </Card>
  );
}
