import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { MatExpansionModule } from '@angular/material/expansion';
import { NgxsModule } from '@ngxs/store';
import { UserState } from './login/store/user.state';
import { environment } from 'src/environments/environment';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { NgxsStoragePluginModule } from '@ngxs/storage-plugin';
import { TrainingPage } from './training/training.page';
import { SwimmerState } from './swimmer/store/swimmer.state';
import { TimerState } from './timer/store/timer.state';




@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        IonicModule.forRoot(),
        AppRoutingModule,
        HttpClientModule,
        BrowserAnimationsModule,
        MatExpansionModule,
        NgxsModule.forRoot([UserState,SwimmerState,TimerState], {
            developmentMode: !environment.production
        }),
        NgxsStoragePluginModule.forRoot({ key: ['user','swimmer','timer'] }),

        NgxsReduxDevtoolsPluginModule.forRoot(),
    ],
    providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
    bootstrap: [AppComponent]
})
export class AppModule { }
