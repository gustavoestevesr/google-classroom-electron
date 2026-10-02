import { Injectable, signal } from '@angular/core';
import { StorageService } from './storage.service';

export interface AppNotification {
  id: number;
  message: string;
  type: 'success' | 'error' | 'info';
}

@Injectable({ providedIn: 'root' })
export class NotificationService {
  readonly notifications = signal<AppNotification[]>([]);
  private nextId = 0;

  constructor(private readonly storage: StorageService) {}

  success(message: string): void {
    this.add(message, 'success');
  }

  error(message: string): void {
    this.add(message, 'error');
  }

  info(message: string): void {
    this.add(message, 'info');
  }

  dismiss(id: number): void {
    this.notifications.update((items) => items.filter((item) => item.id !== id));
  }

  private add(message: string, type: AppNotification['type']): void {
    if (this.storage.get<boolean>('classroom:notifications-enabled') === false) return;
    const id = this.nextId++;
    this.notifications.update((items) => [...items, { id, message, type }]);
    setTimeout(() => this.dismiss(id), 5000);
  }
}
