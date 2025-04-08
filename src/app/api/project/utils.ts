interface ProjectValidation {
  error?: string;
}

interface ProjectData {
  uuid?: string;
  name: string;
  description?: string;
  img?: string;
  organization_id: string;
  public_url?: string;
  admin_url?: string;
  login_url?: string;
  has_custom_domain?: boolean;
  custom_domain_url?: string;
  isActive?: boolean;
  type?: string;
}

export function validateProject(project: ProjectData): ProjectValidation {
  if (!project.name) {
    return {
      error: "Project name is required",
    };
  }

  if (!project.organization_id) {
    return {
      error: "Organization ID is required",
    };
  }

  // Validate URLs if provided
  const urlFields = [
    "public_url",
    "admin_url",
    "login_url",
    "custom_domain_url",
  ];
  for (const field of urlFields) {
    if (project[field as keyof ProjectData]) {
      try {
        new URL(project[field as keyof ProjectData] as string);
      } catch (error) {
        return {
          error: `Invalid ${field.replace("_", " ")}`,
        };
      }
    }
  }

  return {};
}
