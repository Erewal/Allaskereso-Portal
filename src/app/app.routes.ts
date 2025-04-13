import { Routes } from '@angular/router';
export const routes: Routes = [
    {
        path: "home",
        loadComponent: () => import ('./components/home/home.component').then(m=> m.HomeComponent)
    },
    {
        path: "register",
        loadComponent: () => import ('./components/register/register.component').then(m=> m.RegisterComponent)
    },
    {
        path: "profile",
        loadComponent: () => import('./components/profile/profile.component').then(m=> m.ProfileComponent)    
    },

    {
        path: "login",
        loadComponent: () => import ('./components/login/login.component').then(m=> m.LoginComponent)
    },
    {
        path: "job-detail",
        loadComponent: () => import ('./components/job-detail/job-detail.component').then(m=> m.JobDetailComponent)
    },
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
    },
    
];
