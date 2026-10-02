import { Class, CreateClass } from '../../features/classes/models/class.model';

export interface ElectronApi {
  listAllClasses(): Promise<Class[]>;
  findClass(id: number): Promise<Class | undefined>;
  createClass(turma: CreateClass): Promise<Class>;
  updateClass(turma: Class): Promise<{ changes: number }>;
  deleteClass(id: number): Promise<{ changes: number }>;
  archiveClass(id: number): Promise<{ changes: number }>;
}

declare global {
  interface Window {
    electronAPI?: ElectronApi;
  }
}
