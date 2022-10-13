import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SwimmerRoutingModule } from './swimmer-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SwimmerPage } from './swimmer.page';
import { IonicModule } from '@ionic/angular';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';

@NgModule({
  declarations: [SwimmerPage],
  imports: [
    CommonModule,
    SwimmerRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    MatButtonModule,
    MatIconModule,
    MatExpansionModule,
  ],
})
export class SwimmerModule {}
