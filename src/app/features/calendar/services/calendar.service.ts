import { Injectable } from '@angular/core';
import { CalendarEvent } from '../models/calendar-event.model';

@Injectable({ providedIn: 'root' })
export class CalendarService {
  listar(): Promise<CalendarEvent[]> {
    return Promise.reject(new Error('O calendário ainda não está conectado ao banco de dados.'));
  }
}
