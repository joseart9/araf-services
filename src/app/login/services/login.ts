interface LoginResponse {
  message?: string;
  data?: {
    token: string;
  };
}

export async function login(
  email: string,
  password: string
): Promise<LoginResponse> {
  try {
    const response = await fetch(`/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    return data;
  } catch (error) {
    return {
      message: "An error occurred during login",
    };
  }
}
