import * as z from "zod";

// Step 3: Register Project Schema
export const registerProjectSchema = z.object({
  uuid: z.string().optional(),
  name: z.string().min(2, "El nombre del proyecto es requerido"),
  description: z.string(),
  organization_id: z.string(),
  img: z.string().optional(),
  public_url: z.string().optional(),
  admin_url: z.string().optional(),
  login_url: z.string().optional(),
  has_custom_domain: z.boolean().optional(),
  custom_domain_url: z.string().optional(),
  isActive: z.boolean().optional(),
  type: z.string().optional(),
});
