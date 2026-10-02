import { app, BrowserWindow } from 'electron';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { initializeDatabase } from './database';
import { registerTurmaHandlers } from './ipc-handlers/turma-handler';
import { createWindow } from './window';

initializeDatabase();
registerTurmaHandlers();

app.whenReady().then(() => {
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
