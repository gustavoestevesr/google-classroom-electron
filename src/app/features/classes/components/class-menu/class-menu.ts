import { Component, output } from '@angular/core';

@Component({
  selector: 'app-class-menu',
  template: `<button type="button" class="button button-danger" (click)="archive.emit()">Arquivar turma</button>`,
})
export class ClassMenu {
  readonly archive = output<void>();
}
