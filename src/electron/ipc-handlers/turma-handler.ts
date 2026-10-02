import { ipcMain } from 'electron';
import { CreateClass, Class } from '../../models/turma.model';
import { db } from '../database';

export function registerTurmaHandlers() {
  ipcMain.handle('turmas:listar', (): Class[] => {
    return db.prepare('SELECT * FROM turmas').all() as Class[];
  });

  ipcMain.handle('turmas:buscar', (_, id: number): Class | undefined => {
    return db.prepare('SELECT * FROM turmas WHERE id = ?').get(id) as Class | undefined;
  });

  ipcMain.handle('turmas:deletar', (_, id: number) => {
    return db.prepare('DELETE FROM turmas WHERE id = ?').run(id);
  });

  ipcMain.handle('turmas:atualizar', (_, turma: Class) => {
    return db
      .prepare(
        `
        UPDATE turmas
        SET name = ?, section = ?, level = ?, material = ?, active = ?, room = ?
        WHERE id = ?
      `,
      )
      .run(turma.name, turma.section, turma.level, turma.material, turma.active, turma.room, turma.id);
  });

  ipcMain.handle('turmas:arquivar', (_, id: number) => {
    return db
      .prepare(
        `
        UPDATE turmas
        SET active = true
        WHERE id = ?
      `,
      )
      .run(id);
  });

  ipcMain.handle('turmas:criar', (_, turma: CreateClass): Class => {
    const result = db
      .prepare(
        `
        INSERT INTO turmas (name, section, level, material, room)
        VALUES (?, ?, ?, ?, ?)
      `,
      )
      .run(turma.name, turma.section, turma.level, turma.material, turma.room);

    return {
      id: Number(result.lastInsertRowid),
      active: true,
      updated_at: new Date().toISOString(),
      created_at: new Date().toISOString(),
      ...turma,
    };
  });
}
