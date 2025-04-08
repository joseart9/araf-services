interface Project {
  id: string;
  uuid: string;
  name: string;
  description?: string;
  img?: string;
  organization_id: string;
  public_url: string;
  admin_url: string;
  has_custom_domain?: boolean;
  custom_domain_url?: string;
  isActive: boolean;
  type?: string;
  login_url?: string;
  created_at?: string;
  updated_at?: string;
}
