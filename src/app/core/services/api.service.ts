import { inject, Injectable } from '@angular/core';
import { ElectronService } from '../electron/electron.service';

@Injectable({ providedIn: 'root' })
export class ApiService {
  private readonly electron = inject(ElectronService);

  listAllClasses() {
    return this.electron.listAllClasses();
  }
}
