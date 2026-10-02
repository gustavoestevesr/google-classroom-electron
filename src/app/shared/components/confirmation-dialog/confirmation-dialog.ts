import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-confirmation-dialog',
  template: `
    @if (open()) {
      <div class="dialog-backdrop">
        <section class="dialog" role="alertdialog" aria-modal="true" [attr.aria-label]="title()">
          <h2>{{ title() }}</h2>
          <p>{{ message() }}</p>
          <div class="dialog-actions">
            <button type="button" class="button button-secondary" (click)="cancel.emit()">Cancelar</button>
            <button type="button" class="button button-danger" (click)="confirm.emit()">Confirmar</button>
          </div>
        </section>
      </div>
    }
  `,
})
export class ConfirmationDialog {
  readonly open = input(false);
  readonly title = input('Confirmar ação');
  readonly message = input('');
  readonly confirm = output<void>();
  readonly cancel = output<void>();
}
