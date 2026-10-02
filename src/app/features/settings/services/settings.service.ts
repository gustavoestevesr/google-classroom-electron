import { inject, Injectable, signal } from '@angular/core';
import { StorageService } from '../../../core/services/storage.service';

const NOTIFICATIONS_KEY = 'classroom:notifications-enabled';

@Injectable({ providedIn: 'root' })
export class SettingsService {
  readonly notificationsEnabled = signal(this.loadNotificationsSetting());

  private readonly storage: StorageService = inject(StorageService);

  setNotificationsEnabled(enabled: boolean): void {
    this.storage.set(NOTIFICATIONS_KEY, enabled);
    this.notificationsEnabled.set(enabled);
  }

  private loadNotificationsSetting(): boolean {
    return this.storage?.get<boolean>(NOTIFICATIONS_KEY) ?? true;
  }
}
