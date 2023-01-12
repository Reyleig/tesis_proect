import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TimerRoutingModule } from './timer-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TimerPage } from './timer.page';


@NgModule({
  declarations: [TimerPage],
  imports: [
    CommonModule,
    TimerRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    ]
})
export class TimerModule { }
