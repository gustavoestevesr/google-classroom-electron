const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  listarTurmas: () => ipcRenderer.invoke('turmas:listar'),
  criarTurma: (turma) => ipcRenderer.invoke('turmas:criar', turma),
  buscarTurma: (id) => ipcRenderer.invoke('turmas:buscar', id),
  deletarTurma: (id) => ipcRenderer.invoke('turmas:deletar', id),
  atualizarTurma: (turma) => ipcRenderer.invoke('turmas:atualizar', turma),
  arquivarTurma: (id) => ipcRenderer.invoke('turmas:arquivar', id),
});
