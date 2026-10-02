import { Injectable } from '@angular/core';
import { Assignment } from '../models/assignment.model';

@Injectable({ providedIn: 'root' })
export class ClassworkService {
  listarPorTurma(_turmaId: number): Promise<Assignment[]> {
    return Promise.reject(new Error('A listagem de atividades ainda não está conectada ao banco de dados.'));
  }
}
