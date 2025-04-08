import * as z from "zod";

// Step 1: Create Account Schema
const createAccountSchema = z
  .object({
    firstName: z.string().min(2, "El nombre es requerido"),
    lastName: z.string().min(2, "El apellido es requerido"),
    email: z.string().email("Correo electrónico inválido"),
    phone: z.string().min(10, "El teléfono debe tener al menos 10 caracteres"),
    password: z
      .string()
      .min(6, "La contraseña debe tener al menos 6 caracteres"),
    confirmPassword: z
      .string()
      .min(6, "La contraseña debe tener al menos 6 caracteres"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Las contraseñas no coinciden",
    path: ["confirmPassword"],
  });

export { createAccountSchema };
