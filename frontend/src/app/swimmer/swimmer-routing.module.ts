import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SwimmerPage } from './swimmer.page';

const routes: Routes = [
  {
    path: '',
    component: SwimmerPage
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SwimmerRoutingModule { }
