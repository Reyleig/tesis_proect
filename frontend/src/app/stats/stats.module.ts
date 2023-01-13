import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StatsRoutingModule } from './stats-routing.module';
import { NgChartsModule } from 'ng2-charts';
import { StatsPage } from './stats.page';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';


@NgModule({
  declarations: [StatsPage],
  imports: [
    CommonModule,
    StatsRoutingModule,
    NgChartsModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    MatButtonModule,
    MatIconModule,
    MatExpansionModule,
  ]
})
export class StatsModule { }
