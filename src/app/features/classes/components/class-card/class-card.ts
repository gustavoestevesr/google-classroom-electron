import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Class } from '../../models/class.model';

@Component({
  selector: 'app-class-card',
  imports: [RouterLink],
  template: `
    <a class="class-card" [routerLink]="['/turmas', turma().id]">
      <span class="class-card-icon" aria-hidden="true">▦</span>
      <span class="class-card-title">{{ turma().name }}</span>
      <span class="class-card-action">Abrir turma →</span>
    </a>
  `,
})
export class ClassCard {
  readonly turma = input.required<Class>();
}
