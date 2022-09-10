import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HttpClientModule} from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { TimerPage } from './timer/timer.page';
import { SwimmerPage } from './swimmer/swimmer.page';
import {MatExpansionModule} from '@angular/material/expansion';
import { NgxsModule } from '@ngxs/store';



@NgModule({
    declarations: [AppComponent, TimerPage, SwimmerPage],
    imports: [
        BrowserModule,
        IonicModule.forRoot(),
        AppRoutingModule,
        HttpClientModule,
        BrowserAnimationsModule,
        MatExpansionModule
    ],
    providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
    bootstrap: [AppComponent]
})
export class AppModule {}
