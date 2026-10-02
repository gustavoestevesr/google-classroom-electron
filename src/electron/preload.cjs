const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  listAllClasses: () => ipcRenderer.invoke('class:listAll'),
  createClass: (turma) => ipcRenderer.invoke('class:create', turma),
  findClass: (id) => ipcRenderer.invoke('class:find', id),
  deleteClass: (id) => ipcRenderer.invoke('class:delete', id),
  archiveClass: (id) => ipcRenderer.invoke('class:archive', id),
  updateClass: (turma) => ipcRenderer.invoke('class:update', turma),
});
