import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./layout/app-layout/app-layout').then(({ AppLayout }) => AppLayout),
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', loadChildren: () => import('./features/dashboard/dashboard.routes').then((m) => m.DASHBOARD_ROUTES) },
      { path: 'turmas', loadChildren: () => import('./features/classes/classes.routes').then((m) => m.CLASSES_ROUTES) },
      {
        path: 'calendario',
        loadComponent: () =>
          import('./features/calendar/pages/calendar/calendar').then(({ CalendarPage }) => CalendarPage),
      },
      {
        path: 'configuracoes',
        loadComponent: () =>
          import('./features/settings/pages/settings/settings').then(({ SettingsPage }) => SettingsPage),
      },
      { path: '**', redirectTo: 'dashboard' },
    ],
  },
];
