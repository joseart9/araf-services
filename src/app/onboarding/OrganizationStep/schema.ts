import * as z from "zod";
// Step 2: Create Organization Schema
export const createOrgSchema = z.object({
  name: z.string().min(2, "El nombre de la organización es requerido"),
  description: z.string(),
});
