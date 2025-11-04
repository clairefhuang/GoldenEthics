
export interface FacultyPublication {
  id: string; // Unique identifier for React keys and state management
  netID: string;
  first_name: string;
  last_name: string;
  email: string | null;
  department_name: string;
  college_or_school: string;
  title: string | null;
  year: number | null;
}
