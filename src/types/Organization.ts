interface Organization {
  id: string;
  name: string;
  project_id?: string[];

  created_at: Date;
  updated_at: Date;
}
