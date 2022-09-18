import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { TimerPage } from './timer/timer.page';
import { SwimmerPage } from './swimmer/swimmer.page';
import { MatExpansionModule } from '@angular/material/expansion';
import { NgxsModule } from '@ngxs/store';
import { StoreModule } from '@ngrx/store';
import { UserState } from './login/store/user.state';
import { environment } from 'src/environments/environment';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { NgxsStoragePluginModule } from '@ngxs/storage-plugin'; 
import { SplashScreen } from '@awesome-cordova-plugins/splash-screen/ngx';




@NgModule({
    declarations: [AppComponent, TimerPage, SwimmerPage],
    imports: [
        BrowserModule,
        IonicModule.forRoot(),
        AppRoutingModule,
        HttpClientModule,
        BrowserAnimationsModule,
        MatExpansionModule,
        NgxsModule.forRoot([UserState], {
            developmentMode: !environment.production
        }),
        NgxsStoragePluginModule.forRoot({ key: 'token' }),

        NgxsReduxDevtoolsPluginModule.forRoot(),
        SplashScreen
    ],
    providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
    bootstrap: [AppComponent]
})
export class AppModule { }
