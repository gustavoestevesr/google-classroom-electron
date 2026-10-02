import { Component, inject } from '@angular/core';
import { NotificationService } from '../../core/services/notification.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.html',
})
export class Navbar {
  protected readonly notificationService = inject(NotificationService);
}
