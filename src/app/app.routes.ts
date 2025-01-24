import { Routes } from '@angular/router';
import { ProtectedGuard } from './shared/guards/protected.guard';
import { PublicGuard } from './shared/guards/public.guard';


export const routes: Routes = [
    {
        path: '',
        loadChildren: () => import('./authentication/authentication.module').then(m => m.AuthenticationModule),
         canActivate: [PublicGuard]
        
    },
    {
        path: 'admin',
        loadChildren: () => import('./authentication/authentication.module').then(m => m.AuthenticationModule),
        canActivate: [PublicGuard]
        
    },
    {
        path: 'dashboard',
        loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule),
        data: { breadcrumb: 'Dashboard' },
        canActivate: [ProtectedGuard]
    },

    { path: '**', redirectTo: '/' },
  
];
