import { Component, input } from '@angular/core';
import { Person } from '../../models/person.model';

@Component({
  selector: 'app-teacher-list',
  template: `
    <ul class="person-list">
      @for (teacher of teachers(); track teacher.id) {
        <li>{{ teacher.nome }} <span>{{ teacher.email }}</span></li>
      }
    </ul>
  `,
})
export class TeacherList {
  readonly teachers = input<Person[]>([]);
}
