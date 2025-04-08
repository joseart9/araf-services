import { validateToken } from "@/utils/jwt/validateToken";
import { ROLES } from "@/const/roles";

export async function validateOnboardingToken(token: string) {
  const { payload, error, status } = await validateToken(token);

  if (error) {
    return { error, status };
  }

  if (payload?.role !== ROLES.ONBOARDING) {
    return { error: "Not an onboarding token", status: 401 };
  }

  return { payload, status };
}
