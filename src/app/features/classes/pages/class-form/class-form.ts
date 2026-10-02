import { Component, inject } from '@angular/core';
import { Location } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

import { ClassForm } from '../../components/class-form/class-form';
import { ClassesService } from '../../services/classes.service';
import { NotificationService } from '../../../../core/services/notification.service';
import { UnsavedChangesPage } from '../../../../shared/guards/unsaved-changes.guard';
import { CreateClass } from '../../models/class.model';

@Component({
  selector: 'app-class-form-page',
  imports: [ClassForm, RouterLink],
  template: `
    <a class="back-link" routerLink="/turmas"> ← Voltar às turmas </a>

    <section class="page-heading">
      <div>
        <p class="eyebrow">Turmas</p>
        <h1>Nova turma</h1>
      </div>
    </section>

    <app-class-form (save)="save($event)" (cancel)="location.back()" />
  `,
})
export class ClassFormPage implements UnsavedChangesPage {
  protected readonly location = inject(Location);
  private readonly router = inject(Router);
  private readonly classes = inject(ClassesService);
  private readonly notifications = inject(NotificationService);

  private hasChanges = false;

  hasUnsavedChanges(): boolean {
    return this.hasChanges;
  }

  async save(classData: CreateClass): Promise<void> {
    this.hasChanges = true;

    try {
      const turma = await this.classes.createClass(classData);

      this.hasChanges = false;

      this.notifications.success('Turma criada com sucesso.');

      await this.router.navigate(['/turmas', turma.id]);
    } catch (error) {
      this.notifications.error(
        error instanceof Error ? error.message : 'Não foi possível criar a turma.',
      );
    }
  }
}
