export function validateProject(project: Partial<Project>): {
  error: string | null;
} {
  // Validate name
  if (!project.name) {
    return { error: "Name is required" };
  }

  // Validate organization_id
  if (!project.organization_id) {
    return { error: "Organization ID is required" };
  }

  // Validate public_url
  if (!project.public_url) {
    return { error: "Public URL is required" };
  }

  return { error: null };
}
