import { Component } from '@angular/core';
import { EmptyState } from '../../../../shared/components/empty-state/empty-state';

@Component({
  selector: 'app-calendar-page',
  imports: [EmptyState],
  template: `
    <section class="page-heading">
      <div>
        <p class="eyebrow">Organização</p>
        <h1>Calendário</h1>
        <p class="page-description">Acompanhe as datas importantes das suas turmas.</p>
      </div>
    </section>
    <app-empty-state title="Calendário sem eventos" description="Eventos e prazos serão exibidos aqui." />
  `,
})
export class CalendarPage {}
