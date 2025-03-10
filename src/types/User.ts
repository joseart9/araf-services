export default interface User {
  id?: string;
  uuid: string;
  email: string;
  password: string;
  role?: string;
  organization_id?: string;

  // User data
  first_name?: string;
  last_name?: string;
  phone_number?: string;
}
