import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegisterEstPage } from './register-est.page';

const routes: Routes = [
  {
    path: '',
    component: RegisterEstPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegisterEstPageRoutingModule {}
