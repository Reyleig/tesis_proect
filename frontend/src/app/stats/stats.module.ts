import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StatsRoutingModule } from './stats-routing.module';
import { NgChartsModule } from 'ng2-charts';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StatsRoutingModule,
    NgChartsModule
  ]
})
export class StatsModule { }
