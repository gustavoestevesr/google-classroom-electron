import { Routes } from '@angular/router';
import { unsavedChangesGuard } from '../../shared/guards/unsaved-changes.guard';

export const CLASSES_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/classes/classes').then(({ ClassesPage }) => ClassesPage),
  },
  {
    path: 'nova',
    canDeactivate: [unsavedChangesGuard],
    loadComponent: () =>
      import('./pages/class-form/class-form').then(({ ClassFormPage }) => ClassFormPage),
  },
  {
    path: ':classId',
    loadComponent: () =>
      import('./pages/class/class').then(({ ClassPage }) => ClassPage),
  },
  {
    path: ':classId/mural',
    loadComponent: () =>
      import('../classwork/pages/classwork/classwork').then(({ ClassworkPage }) => ClassworkPage),
  },
  {
    path: ':classId/atividades',
    loadComponent: () =>
      import('../classwork/pages/classwork/classwork').then(({ ClassworkPage }) => ClassworkPage),
  },
  {
    path: ':classId/pessoas',
    loadComponent: () =>
      import('../people/components/student-list/student-list').then(({ StudentList }) => StudentList),
  },
];
