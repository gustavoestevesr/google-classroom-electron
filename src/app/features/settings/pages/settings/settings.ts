import { Component, inject } from '@angular/core';
import { SettingsService } from '../../services/settings.service';

@Component({
  selector: 'app-settings-page',
  template: `
    <section class="page-heading">
      <div>
        <p class="eyebrow">Preferências</p>
        <h1>Configurações</h1>
        <p class="page-description">Ajuste o comportamento do aplicativo.</p>
      </div>
    </section>
    <section class="settings-card">
      <div>
        <h2>Notificações</h2>
        <p>Exibir avisos de sucesso e erro durante o uso.</p>
      </div>
      <label class="toggle-label">
        <input
          type="checkbox"
          [checked]="settings.notificationsEnabled()"
          (change)="settings.setNotificationsEnabled($any($event.target).checked)"
        />
        Ativadas
      </label>
    </section>
  `,
})
export class SettingsPage {
  protected readonly settings = inject(SettingsService);
}
