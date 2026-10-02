import Database from 'better-sqlite3';
import { app, BrowserWindow, ipcMain } from 'electron';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import type { Class, CreateClass } from '../app/features/classes/models/class.model';

const db = new Database('google-classroom.sqlite');

initializeDatabase();
registerClassHandlers();

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

export function initializeDatabase(): void {
  db.pragma('foreign_keys = ON');

  db.exec(`
    CREATE TABLE IF NOT EXISTS turmas (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      section TEXT,
      level TEXT,
      material TEXT,
      room TEXT,
      active INTEGER NOT NULL DEFAULT 1,
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL
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
}

export function registerClassHandlers(): void {
  ipcMain.handle('class:listAll', (): Class[] => {
    return db.prepare('SELECT * FROM turmas ORDER BY name').all() as Class[];
  });

  ipcMain.handle('class:find', (_, id: number): Class | undefined => {
    return db.prepare('SELECT * FROM turmas WHERE id = ?').get(id) as Class | undefined;
  });

  ipcMain.handle('class:delete', (_, id: number) => {
    return db.prepare('DELETE FROM turmas WHERE id = ?').run(id);
  });

  ipcMain.handle('class:update', (_, turma: Class) => {
    const updatedAt = new Date().toISOString();

    return db
      .prepare(
        `
        UPDATE turmas
        SET
          name = ?,
          section = ?,
          level = ?,
          material = ?,
          active = ?,
          room = ?,
          updated_at = ?
        WHERE id = ?
      `,
      )
      .run(
        turma.name,
        turma.section ?? null,
        turma.level ?? null,
        turma.material ?? null,
        turma.active ? 1 : 0,
        turma.room ?? null,
        updatedAt,
        turma.id,
      );
  });

  ipcMain.handle('class:archive', (_, id: number) => {
    const updatedAt = new Date().toISOString();

    return db
      .prepare(
        `
        UPDATE turmas
        SET
          active = 0,
          updated_at = ?
        WHERE id = ?
      `,
      )
      .run(updatedAt, id);
  });

  ipcMain.handle('class:create', (_, classData: CreateClass): Class => {
    const now = new Date().toISOString();

    const result = db
      .prepare(
        `
        INSERT INTO turmas (
          name,
          section,
          level,
          material,
          room,
          active,
          created_at,
          updated_at
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
      `,
      )
      .run(
        classData.name,
        classData.section ?? null,
        classData.level ?? null,
        classData.material ?? null,
        classData.room ?? null,
        1,
        now,
        now,
      );

    return {
      id: Number(result.lastInsertRowid),
      name: classData.name,
      section: classData.section,
      level: classData.level,
      material: classData.material,
      room: classData.room,
      active: true,
      created_at: now,
      updated_at: now,
    };
  });
}

export function createWindow() {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);

  const window = new BrowserWindow({
    width: 1200,
    height: 800,

    webPreferences: {
      preload: path.join(__dirname, 'preload.cjs'),
      contextIsolation: true,
      nodeIntegration: false,
    },
  });

  window.loadURL('http://localhost:4200');
}
