import { Component, OnInit, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

import { NotificationService } from '../../../../core/services/notification.service';
import { EmptyState } from '../../../../shared/components/empty-state/empty-state';
import { Loading } from '../../../../shared/components/loading/loading';
import { ClassCard } from '../../components/class-card/class-card';
import { ClassesService } from '../../services/classes.service';
import { Class } from '../../models/class.model';

@Component({
  selector: 'app-classes-page',
  imports: [RouterLink, ClassCard, EmptyState, Loading],
  templateUrl: './classes.html',
})
export class ClassesPage implements OnInit {
  private readonly classesService = inject(ClassesService);
  private readonly notifications = inject(NotificationService);
  protected readonly turmas = signal<Class[]>([]);
  protected readonly loading = signal(true);
  protected readonly error = signal(false);

  ngOnInit(): void {
    void this.load();
  }

  private async load(): Promise<void> {
    this.loading.set(true);
    try {
      this.turmas.set(await this.classesService.listAllClasses());
      this.error.set(false);
    } catch (error) {
      this.error.set(true);
      this.notifications.error(
        error instanceof Error ? error.message : 'Não foi possível carregar as turmas.',
      );
    } finally {
      this.loading.set(false);
    }
  }
}
