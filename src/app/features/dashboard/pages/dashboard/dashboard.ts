import { Component, OnInit, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ClassesService } from '../../../classes/services/classes.service';
import { ClassCard } from '../../../classes/components/class-card/class-card';
import { EmptyState } from '../../../../shared/components/empty-state/empty-state';
import { NotificationService } from '../../../../core/services/notification.service';
import { Class } from '../../../classes/models/class.model';

@Component({
  selector: 'app-dashboard-page',
  imports: [RouterLink, ClassCard, EmptyState],
  templateUrl: './dashboard.html',
})
export class DashboardPage implements OnInit {
  private readonly classes = inject(ClassesService);
  private readonly notifications = inject(NotificationService);
  protected readonly turmas = signal<Class[]>([]);

  ngOnInit(): void {
    void this.load();
  }

  private async load(): Promise<void> {
    try {
      this.turmas.set(await this.classes.listAllClasses());
    } catch (error) {
      this.notifications.error(
        error instanceof Error ? error.message : 'Não foi possível carregar as turmas.',
      );
    }
  }
}
