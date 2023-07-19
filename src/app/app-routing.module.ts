import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'admin',
    redirectTo: '/login/adminlogin',
    pathMatch: 'full'
  },
  {
    path: 'owner',
    redirectTo: '/owner-login',
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
  },
  {
    path: 'forgotpass',
    loadChildren: () => import('./forgotpass/forgotpass.module').then( m => m.ForgotpassPageModule)
  },
  {
    path: 'tab1',
    loadChildren: () => import('./owner/tab1/tab1.module').then( m => m.Tab1PageModule)
  },
  {
    path: 'tab2',
    loadChildren: () => import('./owner/tab2/tab2.module').then( m => m.Tab2PageModule)
  },
  {
    path: 'tab3',
    loadChildren: () => import('./owner/tab3/tab3.module').then( m => m.Tab3PageModule)
  },
  {
    path: 'owner-login',
    loadChildren: () => import('./owner-login/owner-login.module').then( m => m.OwnerLoginPageModule)
  },


 





];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
