import { Injectable } from '@angular/core';
import { ElectronApi } from './electron-api';
import { Class, CreateClass } from '../../features/classes/models/class.model';

@Injectable({ providedIn: 'root' })
export class ElectronService {
  private get api(): ElectronApi {
    const api = window.electronAPI;
    if (!api) {
      throw new Error(
        'A API do Electron não está disponível. Inicie o app com "npm run electron:dev"; "npm start" abre somente o navegador.',
      );
    }
    return api;
  }

  listAllClasses() {
    return this.api.listAllClasses();
  }

  findClass(id: number) {
    return this.api.findClass(id);
  }

  createClass(turma: CreateClass) {
    return this.api.createClass(turma);
  }

  updateClass(turma: Class) {
    return this.api.updateClass(turma);
  }

  deleteClass(id: number) {
    return this.api.deleteClass(id);
  }

  archiveClass(id: number) {
    return this.api.archiveClass(id);
  }
}
