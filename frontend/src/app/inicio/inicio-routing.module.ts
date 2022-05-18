import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InicioPage } from './inicio.page';

const routes: Routes = [
  {
    path: '',
    component: InicioPage,
    children: [
      {
        path: 'timer',
        loadChildren: () => import('../timer/timer-routing.module').then(m => m.TimerRoutingModule)
      },
      {
        path: 'training',
        loadChildren: () => import('../training/training-routing.module').then(m => m.TrainingRoutingModule)
      },
      {
        path: 'stats',
        loadChildren: () => import('../stats/stats-routing.module').then(m => m.StatsRoutingModule)
      },
      {
        path: 'swimmer',
        loadChildren: () => import('../swimmer/swimmer-routing.module').then(m => m.SwimmerRoutingModule)
      },
      {
        path: '',
        redirectTo: 'timer',
        pathMatch: 'full'
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InicioPageRoutingModule {}
