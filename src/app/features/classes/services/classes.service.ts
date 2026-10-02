import { Injectable } from '@angular/core';
import { ElectronService } from '../../../core/electron/electron.service';
import { Class, CreateClass } from '../models/class.model';

@Injectable({ providedIn: 'root' })
export class ClassesService {
  constructor(private readonly electron: ElectronService) {}

  listAllClasses(): Promise<Class[]> {
    return this.electron.listAllClasses();
  }

  findClass(id: number): Promise<Class | undefined> {
    return this.electron.findClass(id);
  }

  createClass(turma: CreateClass): Promise<Class> {
    return this.electron.createClass(turma);
  }

  updateClass(turma: Class): Promise<{ changes: number }> {
    return this.electron.updateClass(turma);
  }

  deleteClass(id: number): Promise<{ changes: number }> {
    return this.electron.deleteClass(id);
  }

  archiveClass(id: number): Promise<{ changes: number }> {
    return this.electron.archiveClass(id);
  }
}
