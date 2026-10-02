import { CanDeactivateFn } from '@angular/router';

export interface UnsavedChangesPage {
  hasUnsavedChanges(): boolean;
}

export const unsavedChangesGuard: CanDeactivateFn<UnsavedChangesPage> = (component) =>
  !component.hasUnsavedChanges() ||
  window.confirm('Existem alterações não salvas. Deseja sair mesmo assim?');
