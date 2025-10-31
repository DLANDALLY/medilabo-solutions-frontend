import { Routes } from '@angular/router';
import { AuthGuard } from './services/auth/auth-guard';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadComponent: () => import('./features/home/home').then(m => m.Home) },
  { path: 'login', loadComponent: () => import('./features/login/login').then(m => m.Login) },
  {
    path: 'patients',
    canActivate: [AuthGuard],
    children: [
      { path: '', loadComponent: () => import('./features/patient-list/patient-list').then(m => m.PatientList) },
      { path: ':id', loadComponent: () => import('./features/patient-detail/patient-detail').then(m => m.PatientDetail) },
      { path: 'reporting', loadComponent: () => import('./features/reporting/reporting').then(m => m.Reporting) }
    ]
  },

  { path: '**', redirectTo: 'home' }
];
