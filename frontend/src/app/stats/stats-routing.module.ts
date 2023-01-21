import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StatsPage } from './stats.page';

const routes: Routes = [
  {
    path: '',
    component: StatsPage,
    children: [
      {
        path: 'graphics',
        loadChildren: () => import('./graphics/graphics-routing.module').then( m => m.GraphicsPageRoutingModule)
      }
    ]
  },  ]
;

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StatsRoutingModule { }
