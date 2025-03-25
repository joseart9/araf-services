interface UserSession {
  email: string;
  uuid: string;
  role?: string;
  organizationID?: string;

  // JWT timestamps
  iat?: number;
  exp?: number;
}
