export interface ClassMember {
  id: number;
  nome: string;
  email: string;
  role: 'student' | 'teacher';
}

export type ClassLevel = 'preschool' | 'elementary' | 'high_school' | 'higher_education';

export const ClassLevelMapping: Record<ClassLevel, string> = {
  preschool: 'Educação Infantil',
  elementary: 'Ensino Fundamental',
  high_school: 'Ensino Médio',
  higher_education: 'Ensino Superior',
};

export const ClassLevels: ClassLevel[] = [
  'preschool',
  'elementary',
  'high_school',
  'higher_education',
];

export interface Class {
  id: number;
  name: string;
  section: string | null;
  level: ClassLevel | null;
  material: string | null;
  room: string | null;
  active: boolean;
  updated_at: string;
  created_at: string;
}

export interface CreateClass {
  name: string;
  section: string;
  level: ClassLevel;
  material: string;
  room: string;
}

export const DefaultCreateClass: CreateClass = {
  name: '',
  section: '',
  level: 'elementary',
  material: '',
  room: '',
};
