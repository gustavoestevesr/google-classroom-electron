import { app, BrowserWindow } from 'electron';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import Database from 'better-sqlite3';

const db = new Database('google-classroom.sqlite');

db.exec(`
  CREATE TABLE IF NOT EXISTS turmas (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    descricao TEXT NOT NULL
  )
`);

db.exec(`
  CREATE TABLE IF NOT EXISTS alunos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL,
    email TEXT NOT NULL
  )
`);

db.exec(`
  CREATE TABLE IF NOT EXISTS professores (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL,
    email TEXT NOT NULL
  )
`);

db.exec(`
  CREATE TABLE IF NOT EXISTS atividades (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL,
    nota REAL NOT NULL,
    turma_id INTEGER NOT NULL,
    FOREIGN KEY (turma_id) REFERENCES turmas(id)
  )
`);


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function createWindow() {
  const window = new BrowserWindow({
    width: 1200,
    height: 800,

    webPreferences: {
      preload: `${__dirname}/preload.ts`,
      contextIsolation: true,
      nodeIntegration: false,
    },
  });

  window.loadURL('http://localhost:4200');
}

app.whenReady().then(createWindow);

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

import { ipcMain } from 'electron';

interface Turma {
  id: number;
  descricao: string;
}

interface CriarTurma {
  descricao: string;
}

ipcMain.handle('turmas:listar', (): Turma[] => {
  return db.prepare('SELECT * FROM turmas').all() as Turma[];
});

ipcMain.handle('turmas:buscar', (_, id: number): Turma | undefined => {
  return db.prepare('SELECT * FROM turmas WHERE id = ?').get(id) as Turma | undefined;
});

ipcMain.handle('turmas:deletar', (_, id: number) => {
  return db.prepare('DELETE FROM turmas WHERE id = ?').run(id);
});

ipcMain.handle('turmas:atualizar', (_, turma: Turma) => {
  return db
    .prepare(
      `
        UPDATE turmas
        SET descricao = ?
        WHERE id = ?
      `,
    )
    .run(turma.descricao, turma.id);
});

ipcMain.handle('turmas:criar', (_, turma: CriarTurma): Turma => {
  const result = db
    .prepare(
      `
        INSERT INTO turmas (descricao)
        VALUES (?)
      `,
    )
    .run(turma.descricao);

  return {
    id: Number(result.lastInsertRowid),
    ...turma,
  };
});
