import { Routes } from '@angular/router';
import { authGuard, publicGuard } from './components/share/guard/auth/auth.guard';
export const routes: Routes = [
    {
        path: "home",
        loadComponent: () => import ('./components/home/home.component').then(m=> m.HomeComponent)
    },
    {
        path: "register",
        loadComponent: () => import ('./components/register/register.component').then(m=> m.RegisterComponent),
        canActivate: [publicGuard]
    },
    {
        path: "profile",
        loadComponent: () => import('./components/profile/profile.component').then(m=> m.ProfileComponent),    
        canActivate: [authGuard]
    },

    {
        path: "login",
        loadComponent: () => import ('./components/login/login.component').then(m=> m.LoginComponent),
        canActivate: [publicGuard]
    },
    {
        path: "job-detail",
        loadComponent: () => import ('./components/job-detail/job-detail.component').then(m=> m.JobDetailComponent),
        canActivate: [authGuard]
    },
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
    },
    
];
