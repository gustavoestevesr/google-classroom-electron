import { Component, OnInit, inject, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

import { NotificationService } from '../../../../core/services/notification.service';
import { EmptyState } from '../../../../shared/components/empty-state/empty-state';
import { ClassMenu } from '../../components/class-menu/class-menu';
import { ClassesService } from '../../services/classes.service';
import { Class } from '../../models/class.model';

@Component({
  selector: 'app-class-page',
  imports: [RouterLink, ClassMenu, EmptyState],
  templateUrl: './class.html',
})
export class ClassPage implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly classesService = inject(ClassesService);
  private readonly notifications = inject(NotificationService);
  protected readonly turma = signal<Class | null>(null);

  ngOnInit(): void {
    void this.load();
  }

  async remove(): Promise<void> {
    const turma = this.turma();
    if (!turma || !window.confirm(`Excluir a turma "${turma.name}"?`)) return;
    try {
      await this.classesService.deleteClass(turma.id);
      this.notifications.success('Turma excluída.');
      await this.router.navigate(['/turmas']);
    } catch (error) {
      this.notifications.error(
        error instanceof Error ? error.message : 'Não foi possível excluir a turma.',
      );
    }
  }

  private async load(): Promise<void> {
    const id = Number(this.route.snapshot.paramMap.get('classId'));
    if (!Number.isInteger(id) || id <= 0) {
      this.notifications.error('Identificador de turma inválido.');
      await this.router.navigate(['/turmas']);
      return;
    }
    try {
      const turma = await this.classesService.findClass(id);
      if (!turma) {
        this.notifications.error('Turma não encontrada.');
        await this.router.navigate(['/turmas']);
        return;
      }
      this.turma.set(turma);
    } catch (error) {
      this.notifications.error(
        error instanceof Error ? error.message : 'Não foi possível carregar a turma.',
      );
    }
  }
}
