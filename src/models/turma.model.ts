export enum ClassLevel {
  PRESCHOOL = 'preschool',
  ELEMENTARY = 'elementary',
  HIGH_SCHOOL = 'high_school',
  HIGHER_EDUCATION = 'higher_education',
}

export interface Class {
  id: number;
  name: string;
  section?: string;
  level?: ClassLevel;
  material?: string;
  room?: string;
  active?: boolean;
  updated_at: string;
  created_at: string;
}

export interface CreateClass {
  name: string;
  section?: string;
  level?: ClassLevel;
  material?: string;
  room?: string;
}
