import { Routes } from '@angular/router';

import { UnAuthGuard } from './auth/unauth.guard';

export const AppRoutes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: 'signin',
    canActivate: [UnAuthGuard],
    loadChildren: () => import('./page/signin/signin.module').then(m => m.SigninModule),
  },
  {
    path: '**',
    redirectTo: 'dashboard',
  },
];
