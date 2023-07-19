import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegisterEstPageRoutingModule } from './register-est-routing.module';

import { RegisterEstPage } from './register-est.page';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegisterEstPageRoutingModule,
    AngularFireStorageModule
  ],
  declarations: [RegisterEstPage]
})
export class RegisterEstPageModule {}
