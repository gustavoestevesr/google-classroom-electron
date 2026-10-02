import { contextBridge, ipcRenderer } from 'electron';
import type { CreateClass, Class } from '../app/features/classes/models/class.model';

contextBridge.exposeInMainWorld('electronAPI', {
  listAllClasses: () => ipcRenderer.invoke('class:listAll'),
  createClass: (turma: CreateClass) => ipcRenderer.invoke('class:create', turma),
  findClass: (id: number) => ipcRenderer.invoke('class:find', id),
  deleteClass: (id: number) => ipcRenderer.invoke('class:delete', id),
  archiveClass: (id: number) => ipcRenderer.invoke('class:archive', id),
  updateClass: (turma: Class) => ipcRenderer.invoke('class:update', turma),
});
