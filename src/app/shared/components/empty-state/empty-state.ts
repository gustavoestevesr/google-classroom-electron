import { Component, input } from '@angular/core';

@Component({
  selector: 'app-empty-state',
  template: `
    <section class="empty-state">
      <div class="empty-icon" aria-hidden="true">▧</div>
      <h2>{{ title() }}</h2>
      <p>{{ description() }}</p>
      <ng-content />
    </section>
  `,
})
export class EmptyState {
  readonly title = input('Nada por aqui ainda');
  readonly description = input('');
}
