import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: '', redirectTo: 'patients', pathMatch: 'full' },
    { path: 'patients', loadComponent: () => import('./features/home/home').then(m => m.Home) },
    { path: 'patients/:id', loadComponent: () => import('./features/patient-detail/patient-detail').then(m => m.PatientDetail) }
];
