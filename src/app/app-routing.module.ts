import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'about',
    loadChildren: () => import('./about/about.module').then( m => m.AboutPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'register-est',
    loadChildren: () => import('./register-est/register-est.module').then( m => m.RegisterEstPageModule)
  },
  {
    path: 'verify',
    loadChildren: () => import('./verify/verify.module').then( m => m.VerifyPageModule)
  },
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.module').then( m => m.AdminPageModule)
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./AdminPages/dashboard/dashboard.module').then( m => m.DashboardPageModule)
  },
  {
    path: 'registration',
    loadChildren: () => import('./AdminPages/registration/registration.module').then( m => m.RegistrationPageModule)
  },
  {
    path: 'users',
    loadChildren: () => import('./AdminPages/users/users.module').then( m => m.UsersPageModule)
  },  {
    path: 'forgotpass',
    loadChildren: () => import('./forgotpass/forgotpass.module').then( m => m.ForgotpassPageModule)
  },




];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
