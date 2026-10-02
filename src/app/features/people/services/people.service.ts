import { Injectable } from '@angular/core';
import { Person } from '../models/person.model';

@Injectable({ providedIn: 'root' })
export class PeopleService {
  listarPorTurma(_classId: number): Promise<Person[]> {
    return Promise.reject(new Error('A listagem de pessoas ainda não está conectada ao banco de dados.'));
  }
}
