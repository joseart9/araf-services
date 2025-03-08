import User from "@/types/User";

export default function validateUser(user: User): { error: string | null } {
  // Validate email
  if (!user.email) {
    return { error: "Email is required" };
  }

  // Validate password
  if (!user.password) {
    return { error: "Password is required" };
  }

  // Validate first name
  if (!user.first_name) {
    return { error: "First name is required" };
  }

  // Validate last name
  if (!user.last_name) {
    return { error: "Last name is required" };
  }

  // Validate phone number
  if (!user.phone_number) {
    return { error: "Phone number is required" };
  }

  return { error: null };
}
