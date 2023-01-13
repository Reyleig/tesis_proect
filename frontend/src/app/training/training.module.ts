import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TrainingRoutingModule } from './training-routing.module';
import { TrainingPage } from './training.page';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';


@NgModule({
  declarations: [TrainingPage],
  imports: [
    CommonModule,
    TrainingRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
  ]
})
export class TrainingModule { }
